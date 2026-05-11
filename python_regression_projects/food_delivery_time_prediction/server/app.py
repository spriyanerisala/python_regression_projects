from flask import Flask,request,jsonify
from flask_cors import CORS
from pymongo import MongoClient
from  dotenv import load_dotenv
import os

from model import model

load_dotenv()

app = Flask(__name__)
CORS(app)

try:
    client = MongoClient(os.getenv("MONGO_URI"))
    db = client["food_delivery_db"]
    collection = db["predictions"]
    print("Connected to MongoDB successfully")
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")

@app.route('/')
def home():
    try:
        return jsonify({"message": "Food Delivery Time Prediction API is running!"})
    except Exception as e:
        return jsonify({"error":str(e)}),500


@app.route('/predict',methods=["POST"])
def predict():
    data =request.json
    features = [[float(data["distance"]),int(data["traffic"]),int(data["weather"]),float(data["rating"]),int(data["prep_time"])]]
    prediction = model.predict(features)[0]
    result = {
        "distance": data["distance"],
        "traffic": data["traffic"],
        "weather": data["weather"],
        "rating": data["rating"],
        "prep_time": data["prep_time"],
        "predicted_delivery_time": round(prediction, 2)
    }
    
    inserted = collection.insert_one(result)

    result["_id"] = str(inserted.inserted_id)

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True,port=5000)


    
