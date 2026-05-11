from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

from db import collection

app = Flask(__name__)
CORS(app)

model = pickle.load(open("weather_model.pkl","rb"))

@app.route("/")
def home():
    return "Weather Prediction API is running"

@app.route('/predict',methods=["POST"])
def predict():
    data=request.json
    humidity=float(data["humidity"])
    wind_speed=float(data["wind_speed"])
    pressure=float(data["pressure"])
    rainfall=float(data["rainfall"])
    cloud_cover = float(data["cloud_cover"])
    
    features = np.array([[humidity,wind_speed,pressure,rainfall,cloud_cover]])
    prediction = model.predict(features)[0]
    result =round(prediction,2)
    collection.insert_one({
        "humidity":humidity,
        "wind_speed":wind_speed,
        
        "pressure":pressure,
        "rainfall":rainfall,
        "cloud_cover":cloud_cover,
        "predicted_temperature":result
    })
    return jsonify({"predicted_temperature" : result}),200

if __name__ == "__main__":
    try:
        print("Server is running on https://127.0.0.1:5000")
        app.run(debug=True,port=5000)
    except Exception as e :
        print("Server Error",e)    