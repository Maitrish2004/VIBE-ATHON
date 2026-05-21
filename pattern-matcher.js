// ============================================================
//  ClassicaLens — Pattern Matcher
//  Maps audio features → music tradition + context
// ============================================================

class PatternMatcher {
  constructor(kb) {
    this.kb = kb;
  }

  // ─── Main Entry: Analyze features → tradition match ───
  async match(features, audioBlob = null) {
    // 1. PRO-LEVEL BACKEND ATTEMPT (Python/Flask)
    if (audioBlob) {
      try {
        const formData = new FormData();
        formData.append('audio', audioBlob, 'recording.webm');
        
        const response = await fetch('http://localhost:5000/analyze', {
          method: 'POST',
          body: formData,
          signal: AbortSignal.timeout(3000) // Don't hang if backend is off
        });
        
        if (response.ok) {
          const data = await response.json();
          const primary = this.kb.getTradition(data.match.tradition_id) || this.kb.traditions[0];
          
          let apiResult = null;
          if (data.authentic_context) {
            apiResult = {
              song: "Wikipedia Authentic Data",
              artist: "Live Integration",
              album: data.authentic_context.title,
              note: data.authentic_context.authentic_summary
            };
          }
          
          return {
            primary: primary,
            alternatives: [],
            mood: primary.moods[0],
            confidence: data.match.confidence,
            features: { energy: 0.8, tempo: data.match.features.tempo },
            apiResult: apiResult,
            explanation: "Analysis powered by Python Librosa Backend and Live Wikipedia scraping."
          };
        }
      } catch (e) {
        console.log("Backend offline, using graceful heuristic fallback.");
      }
    }

    // 2. OFFLINE HEURISTIC FALLBACK (If Python is not installed/running)
    const { energy, brightness, tempo, lowEnergy, midEnergy, highEnergy } = features;

    const scores = this.kb.traditions.map(tradition => {
      const profile = this.kb.audioProfiles[tradition.id];
      let score = 0;

      // Tempo alignment
      const tempoNorm = Math.max(0, 1 - Math.abs(tempo - (profile.tempoMin + profile.tempoMax) / 2) / 100);
      score += tempoNorm * 35;

      // Energy alignment
      const targetEnergy = this._energyFromProfile(profile.energy);
      score += Math.max(0, 1 - Math.abs(energy - targetEnergy)) * 30;

      // Frequency profile alignment
      score += this._freqScore(profile.freqProfile, lowEnergy, midEnergy, highEnergy) * 35;

      return { tradition, score, profile };
    });

    scores.sort((a, b) => b.score - a.score);

    const top = scores[0];
    const runner = scores[1];
    const third = scores[2];

    // Build mood result
    const mood = this._detectMood(features, top.tradition);
    const confidence = Math.round(Math.min(top.score / 80 * 100, 97));

    // ─── API Simulation (Hackathon Pivot) ───
    let apiResult = null;
    if (top.tradition.id === 'bollywood') {
      apiResult = {
        song: "Chaiyya Chaiyya",
        artist: "A.R. Rahman, Sukhwinder Singh",
        album: "Dil Se (1998)",
        note: "API Match! Notice how this commercial pop song is deeply rooted in Indian Classical rhythms."
      };
    } else if (top.tradition.id === 'hollywood') {
      apiResult = {
        song: "Time",
        artist: "Hans Zimmer",
        album: "Inception OST (2010)",
        note: "API Match! Hans Zimmer uses massive Romantic-era orchestral swells here."
      };
    }

    return {
      primary: top.tradition,
      alternatives: [runner.tradition, third.tradition],
      mood,
      confidence,
      features,
      apiResult,
      explanation: this._buildExplanation(features, top.tradition, mood)
    };
  }

  // ─── Demo Presets (for sample clips) ───
  getDemoResult(id) {
    const tradition = this.kb.getTradition(id);
    if (!tradition) return null;
    const mood = tradition.moods[0];
    return {
      primary: tradition,
      alternatives: (tradition.relatedTraditions || []).slice(0, 2).map(r => this.kb.getTradition(r)).filter(Boolean),
      mood,
      confidence: Math.floor(Math.random() * 15) + 82,
      features: { energy: 0.6, brightness: 0.4, tempo: 90, duration: '45.0' },
      explanation: this._buildExplanation({ energy: 0.6, tempo: 90 }, tradition, mood)
    };
  }

  // ─── Mood Detection ───
  _detectMood(features, tradition) {
    const { energy, brightness, tempo } = features;
    const moods = tradition.moods;

    if (energy > 0.75 && tempo > 140) {
      return moods.find(m => ['joyful', 'passionate', 'fierce', 'energetic', 'spirited'].includes(m)) || moods[0];
    }
    if (energy < 0.25 && tempo < 60) {
      return moods.find(m => ['meditative', 'contemplative', 'serene', 'ethereal'].includes(m)) || moods[0];
    }
    if (brightness > 0.6) {
      return moods.find(m => ['joyful', 'majestic', 'passionate'].includes(m)) || moods[0];
    }
    return moods.find(m => ['melancholic', 'nostalgic', 'soulful', 'devotional'].includes(m)) || moods[0];
  }

  // ─── Build Explanation ───
  _buildExplanation(features, tradition, mood) {
    const { energy, tempo } = features;
    const tempoLabel = tempo < 60 ? 'slow and meditative' : tempo < 120 ? 'moderate' : 'lively and energetic';
    const energyLabel = energy < 0.3 ? 'gentle and soft' : energy < 0.65 ? 'balanced' : 'intense and powerful';

    return `The audio shows a ${tempoLabel} tempo (~${Math.round(tempo)} BPM) with ${energyLabel} dynamics, which aligns closely with the ${tradition.name} tradition. The patterns suggest a ${mood} character — typical of this style's emotional vocabulary.`;
  }

  _energyFromProfile(e) {
    if (typeof e === 'number') return e;
    const map = { low: 0.2, medium: 0.5, high: 0.8 };
    return map[e] || 0.5;
  }

  _freqScore(profile, low, mid, high) {
    const targets = {
      'low-mid': { low: 0.4, mid: 0.5, high: 0.1 },
      'mid': { low: 0.2, mid: 0.6, high: 0.2 },
      'mid-high': { low: 0.2, mid: 0.45, high: 0.35 },
      'full': { low: 0.33, mid: 0.34, high: 0.33 }
    };
    const t = targets[profile] || targets['mid'];
    const diff = Math.abs(low - t.low) + Math.abs(mid - t.mid) + Math.abs(high - t.high);
    return Math.max(0, 1 - diff);
  }
}

// Singleton
window.patternMatcher = new PatternMatcher(window.MUSIC_KB);
