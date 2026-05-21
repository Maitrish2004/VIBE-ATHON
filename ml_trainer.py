import numpy as np
import pickle
import os
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import tensorflow as tf
from tensorflow.keras.models import Sequential 
from tensorflow.keras.layers import Dense, Dropout 
PROFILES = {
    'carnatic': [120, 0.7, -10],
    'hindustani': [70, 0.5, -15],
    'baroque': [100, 0.6, -12],
    'romantic': [90, 0.8, -5],
    'flamenco': [140, 0.9, -8],
    'guqin': [40, 0.3, -25],
    'gagaku': [30, 0.2, -30],
    'maqam': [80, 0.6, -14],
    'tango': [110, 0.75, -10],
    'celtic': [130, 0.8, -8],
    'bollywood': [125, 0.95, -3],
    'hollywood': [85, 0.85, -6]
}


TRADITIONS = list(PROFILES.keys())
LABEL_MAP = {trad: idx for idx, trad in enumerate(TRADITIONS)}

def generate_synthetic_data(samples_per_class=500):
    """
    Since we don't have thousands of real audio files, we synthesize 
    training data by adding Gaussian noise to our base profiles.
    """
    print(" Generating synthetic audio feature dataset...")
    X = []
    y = []
    
    for trad, features in PROFILES.items():
        label = LABEL_MAP[trad]
        for _ in range(samples_per_class):
            # Add random noise to simulate real-world audio variance
            noisy_tempo = features[0] + np.random.normal(0, 10)
            noisy_chroma = np.clip(features[1] + np.random.normal(0, 0.1), 0, 1)
            noisy_mfcc = features[2] + np.random.normal(0, 2)
            
            X.append([noisy_tempo, noisy_chroma, noisy_mfcc])
            y.append(label)
            
    return np.array(X), np.array(y)

def train_scikit_model(X_train, X_test, y_train, y_test):
    print(" Training Scikit-Learn Random Forest Model...")
    clf = RandomForestClassifier(n_estimators=100, random_state=42)
    clf.fit(X_train, y_train)
    
    y_pred = clf.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    print(f" Scikit-Learn Model Accuracy: {acc * 100:.2f}%")
    
    with open('rf_model.pkl', 'wb') as f:
        pickle.dump(clf, f)
    print(" Saved 'rf_model.pkl'")

def train_tensorflow_model(X_train, X_test, y_train, y_test):
    print(" Training TensorFlow Deep Neural Network...")
    
    # Normalize X
    X_train_norm = (X_train - np.mean(X_train, axis=0)) / np.std(X_train, axis=0)
    X_test_norm = (X_test - np.mean(X_train, axis=0)) / np.std(X_train, axis=0)
    
    model = Sequential([
        Dense(64, activation='relu', input_shape=(3,)),
        Dropout(0.2),
        Dense(32, activation='relu'),
        Dense(len(TRADITIONS), activation='softmax')
    ])
    
    model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
    
    
    model.fit(X_train_norm, y_train, epochs=20, batch_size=32, validation_data=(X_test_norm, y_test), verbose=0)
    
    loss, acc = model.evaluate(X_test_norm, y_test, verbose=0)
    print(f" TensorFlow Model Accuracy: {acc * 100:.2f}%")
    
    model.save('tf_model.h5')
    print(" Saved 'tf_model.h5'")

if __name__ == "__main__":
    X, y = generate_synthetic_data(1000)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    train_scikit_model(X_train, X_test, y_train, y_test)
    train_tensorflow_model(X_train, X_test, y_train, y_test)
    
   
    with open('label_map.pkl', 'wb') as f:
        pickle.dump(TRADITIONS, f)
        
    print("\n🎉 ML Training Complete! You can now run app.py")
