// ============================================================
//  ClassicaLens — Audio Engine
//  Web Audio API: Recording, Visualization, Analysis
// ============================================================

class AudioEngine {
  constructor() {
    this.audioContext = null;
    this.analyser = null;
    this.mediaRecorder = null;
    this.stream = null;
    this.chunks = [];
    this.isRecording = false;
    this.animationId = null;
    this.audioBuffer = null;
  }

  // ─── Initialize AudioContext ───
  async init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  // ─── Start Microphone Recording ───
  async startRecording() {
    await this.init();
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const source = this.audioContext.createMediaStreamSource(this.stream);
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 2048;
    source.connect(this.analyser);
    this.mediaRecorder = new MediaRecorder(this.stream);
    this.chunks = [];
    this.mediaRecorder.ondataavailable = e => { if (e.data.size > 0) this.chunks.push(e.data); };
    this.mediaRecorder.start();
    this.isRecording = true;
  }

  // ─── Stop Recording ───
  stopRecording() {
    return new Promise(resolve => {
      if (!this.mediaRecorder) { resolve(null); return; }
      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.chunks, { type: 'audio/webm' });
        this.cleanupStream();
        resolve(blob);
      };
      this.mediaRecorder.stop();
      this.isRecording = false;
    });
  }

  // ─── Load Audio File ───
  async loadFile(file) {
    await this.init();
    const arrayBuffer = await file.arrayBuffer();
    this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 2048;
    return this.audioBuffer;
  }

  // ─── Analyze Audio Buffer ───
  analyzeBuffer(buffer) {
    const sampleRate = buffer.sampleRate;
    const channelData = buffer.getChannelData(0);
    const duration = buffer.duration;

    // ── RMS Energy (loudness) ──
    let rmsSum = 0;
    for (let i = 0; i < channelData.length; i++) rmsSum += channelData[i] ** 2;
    const rms = Math.sqrt(rmsSum / channelData.length);

    // ── Zero Crossing Rate (brightness indicator) ──
    let zeroCrossings = 0;
    for (let i = 1; i < channelData.length; i++) {
      if ((channelData[i - 1] > 0) !== (channelData[i] > 0)) zeroCrossings++;
    }
    const zcr = zeroCrossings / channelData.length;

    // ── Beat / Tempo Estimation ──
    const tempo = this._estimateTempo(channelData, sampleRate);

    // ── Frequency band energy ──
    const { lowEnergy, midEnergy, highEnergy } = this._frequencyBands(channelData, sampleRate);

    // ── Spectral Centroid (brightness) ──
    const spectralBrightness = highEnergy / (lowEnergy + midEnergy + highEnergy + 0.001);

    return {
      duration: duration.toFixed(1),
      energy: Math.min(rms * 20, 1),
      brightness: Math.min(zcr * 100, 1),
      tempo: tempo,
      lowEnergy, midEnergy, highEnergy,
      spectralBrightness
    };
  }

  _estimateTempo(channelData, sampleRate) {
    const windowSize = Math.floor(sampleRate * 0.01);
    const energies = [];
    for (let i = 0; i < channelData.length - windowSize; i += windowSize) {
      let e = 0;
      for (let j = i; j < i + windowSize; j++) e += channelData[j] ** 2;
      energies.push(e / windowSize);
    }
    const avg = energies.reduce((a, b) => a + b, 0) / energies.length;
    let beats = 0;
    let inBeat = false;
    for (let e of energies) {
      if (e > avg * 1.5 && !inBeat) { beats++; inBeat = true; }
      else if (e < avg) inBeat = false;
    }
    const durationSec = channelData.length / sampleRate;
    const bpm = Math.round((beats / durationSec) * 60);
    return Math.max(20, Math.min(bpm, 250));
  }

  _frequencyBands(channelData, sampleRate) {
    const n = Math.min(channelData.length, 4096);
    let low = 0, mid = 0, high = 0;
    for (let i = 0; i < n; i++) {
      const freq = (i / n) * (sampleRate / 2);
      const power = channelData[i] ** 2;
      if (freq < 300) low += power;
      else if (freq < 3000) mid += power;
      else high += power;
    }
    const total = low + mid + high + 0.001;
    return { lowEnergy: low / total, midEnergy: mid / total, highEnergy: high / total };
  }

  // ─── Waveform Visualization ───
  drawWaveform(canvas, channelData, color = '#7c6fff') {
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    const step = Math.ceil(channelData.length / width);
    ctx.beginPath();
    for (let i = 0; i < width; i++) {
      const idx = i * step;
      const val = channelData[idx] || 0;
      const y = (val * 0.5 + 0.5) * height;
      i === 0 ? ctx.moveTo(i, y) : ctx.lineTo(i, y);
    }
    ctx.stroke();
  }

  // ─── Live Frequency Visualization ───
  startLiveViz(canvas, color = '#7c6fff') {
    if (!this.analyser) return;
    const ctx = canvas.getContext('2d');
    const bufferLength = this.analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      this.animationId = requestAnimationFrame(draw);
      this.analyser.getByteTimeDomainData(dataArray);
      const { width, height } = canvas;
      ctx.fillStyle = 'rgba(8,12,24,0.3)';
      ctx.fillRect(0, 0, width, height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = color;
      ctx.beginPath();
      const sliceWidth = width / bufferLength;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * height) / 2;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        x += sliceWidth;
      }
      ctx.lineTo(width, height / 2);
      ctx.stroke();
    };
    draw();
  }

  // ─── Bar Spectrum Visualization ───
  drawSpectrum(canvas, color = '#7c6fff') {
    if (!this.analyser) return;
    const ctx = canvas.getContext('2d');
    this.analyser.fftSize = 256;
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      this.animationId = requestAnimationFrame(draw);
      this.analyser.getByteFrequencyData(dataArray);
      const { width, height } = canvas;
      ctx.fillStyle = 'rgba(8,12,24,0.5)';
      ctx.fillRect(0, 0, width, height);
      const barWidth = (width / bufferLength) * 2;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * height;
        const hue = (i / bufferLength) * 60 + 220;
        ctx.fillStyle = `hsl(${hue}, 80%, 60%)`;
        ctx.fillRect(x, height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }
    };
    draw();
  }

  // ─── Stop Visualization ───
  stopViz() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
  }

  // ─── Cleanup ───
  cleanupStream() {
    if (this.stream) {
      this.stream.getTracks().forEach(t => t.stop());
      this.stream = null;
    }
    this.stopViz();
  }

  destroy() {
    this.cleanupStream();
    if (this.audioContext) this.audioContext.close();
  }
}

// Singleton
window.audioEngine = new AudioEngine();
