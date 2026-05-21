import os
import json
import math

try:
    import librosa
    import numpy as np
    LIBROSA_AVAILABLE = True
except ImportError:
    LIBROSA_AVAILABLE = False
    print("WARNING: librosa not fully installed. Using graceful backend fallback for audio analysis.")


AUTHENTIC_PROFILES = {
    'carnatic': {'tempo': 120, 'chroma_energy': 0.7, 'mfcc_mean': -10},
    'hindustani': {'tempo': 70, 'chroma_energy': 0.5, 'mfcc_mean': -15},
    'baroque': {'tempo': 100, 'chroma_energy': 0.6, 'mfcc_mean': -12},
    'romantic': {'tempo': 90, 'chroma_energy': 0.8, 'mfcc_mean': -5},
    'flamenco': {'tempo': 140, 'chroma_energy': 0.9, 'mfcc_mean': -8},
    'guqin': {'tempo': 40, 'chroma_energy': 0.3, 'mfcc_mean': -25},
    'gagaku': {'tempo': 30, 'chroma_energy': 0.2, 'mfcc_mean': -30},
    'maqam': {'tempo': 80, 'chroma_energy': 0.6, 'mfcc_mean': -14},
    'tango': {'tempo': 110, 'chroma_energy': 0.75, 'mfcc_mean': -10},
    'celtic': {'tempo': 130, 'chroma_energy': 0.8, 'mfcc_mean': -8},
    'bollywood': {'tempo': 125, 'chroma_energy': 0.95, 'mfcc_mean': -3},
    'hollywood': {'tempo': 85, 'chroma_energy': 0.85, 'mfcc_mean': -6}
}

import pickle
import os

# Load ML Model and Label Map
ML_MODEL_AVAILABLE = False
try:
    if os.path.exists('rf_model.pkl') and os.path.exists('label_map.pkl'):
        with open('rf_model.pkl', 'rb') as f:
            ml_model = pickle.load(f)
        with open('label_map.pkl', 'rb') as f:
            label_map = pickle.load(f)
        ML_MODEL_AVAILABLE = True
except Exception as e:
    print(f"ML Model not loaded: {e}")

def analyze_audio(file_path):
    """
    Advanced audio processing using Librosa and Scikit-learn ML Inference.
    """
    if LIBROSA_AVAILABLE:
        try:
            y, sr = librosa.load(file_path, sr=22050, duration=30)
            tempo, _ = librosa.beat.beat_track(y=y, sr=sr)
            chroma = librosa.feature.chroma_stft(y=y, sr=sr)
            mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
            
            tempo_val = float(tempo[0]) if isinstance(tempo, np.ndarray) else float(tempo)
            chroma_energy = float(np.mean(chroma))
            mfcc_mean = float(np.mean(mfcc))
            
            features = {
                'tempo': tempo_val,
                'chroma_energy': chroma_energy,
                'mfcc_mean': mfcc_mean,
                'is_authentic_librosa': True
            }
        except Exception as e:
            print(f"Librosa extraction failed: {e}")
            features = _mock_features()
    else:
        features = _mock_features()

    best_match = None
    confidence = 0

    
    if ML_MODEL_AVAILABLE:
        print("Using Scikit-Learn Machine Learning Inference...")
        X_input = np.array([[features['tempo'], features['chroma_energy'], features['mfcc_mean']]])
        prediction = ml_model.predict(X_input)[0]
        probabilities = ml_model.predict_proba(X_input)[0]
        
        best_match = label_map[prediction]
        confidence = int(max(probabilities) * 100)
    else:
        print("Falling back to mathematical distance heuristics...")
        min_dist = float('inf')
        for tradition, profile in AUTHENTIC_PROFILES.items():
            t_dist = ((features['tempo'] - profile['tempo']) / 100) ** 2
            c_dist = ((features['chroma_energy'] - profile['chroma_energy']) * 2) ** 2
            m_dist = ((features['mfcc_mean'] - profile['mfcc_mean']) / 20) ** 2
            dist = math.sqrt(t_dist + c_dist + m_dist)
            if dist < min_dist:
                min_dist = dist
                best_match = tradition
        confidence = max(30, int(100 - (min_dist * 20)))
            
    return {
        "tradition_id": best_match,
        "features": features,
        "confidence": confidence,
        "ml_used": ML_MODEL_AVAILABLE
    }

def _mock_features():
   
    return {
        'tempo': 110,
        'chroma_energy': 0.7,
        'mfcc_mean': -10,
        'is_authentic_librosa': False
    }
