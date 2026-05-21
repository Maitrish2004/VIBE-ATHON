import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

MONGO_URI = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority"

# Initialize MongoDB
db = None
collection = None
try:
    if "<username>" not in MONGO_URI:
        client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=2000)
        client.server_info() 
        db = client['classicalens']
        collection = db['history']
        print(" Connected to MongoDB Atlas Cloud Database")
    else:
        print(" MongoDB URI not configured. Using temporary in-memory storage.")
except Exception as e:
    print(f" MongoDB connection failed: {e}. Using temporary in-memory storage.")


fallback_db = []

@app.route('/analyze', methods=['POST'])
def analyze_route():
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file provided"}), 400
        
    file = request.files['audio']
    temp_path = "temp_upload.webm"
    file.save(temp_path)
    
    # 1. Advanced Audio Analysis (Librosa + Scikit-Learn ML)
    analysis_result = analyze_audio(temp_path)
    tradition_id = analysis_result['tradition_id']
    
    # 2. Fetch Authentic Data (Wikipedia)
    wiki_context = fetch_authentic_data(tradition_id)
    
    # 3. Save to Cloud Database
    record = {
        "tradition_id": tradition_id,
        "timestamp": datetime.now().isoformat(),
        "confidence": analysis_result['confidence'],
        "ml_used": analysis_result.get('ml_used', False)
    }
    
    if collection is not None:
        try:
            collection.insert_one(record)
        except Exception as e:
            print(f"MongoDB Insert Error: {e}")
            fallback_db.append(record)
    else:
        fallback_db.append(record)
    
    if os.path.exists(temp_path):
        os.remove(temp_path)
        
    return jsonify({
        "success": True,
        "match": analysis_result,
        "authentic_context": wiki_context
    })

@app.route('/feed', methods=['GET'])
def community_feed():
    feed = []
    if collection is not None:
        try:
            # Fetch last 5 records from MongoDB
            cursor = collection.find({}, {"_id": 0}).sort("timestamp", -1).limit(5)
            feed = list(cursor)
        except Exception as e:
            print(f"MongoDB Fetch Error: {e}")
            feed = fallback_db[-5:]
    else:
        feed = fallback_db[-5:]
        
    # Reverse to show newest first if pulling from fallback
    if collection is None:
        feed.reverse()
        
    return jsonify({"feed": feed})

if __name__ == '__main__':
    print(" ClassicaLens Pro Backend starting on port 5000...")
    app.run(debug=True, port=5000)
