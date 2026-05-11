from flask import Blueprint, request, jsonify
import joblib
import numpy as np

from database.mongodb import predictions_collection
from babel.numbers import format_decimal

predict_bp = Blueprint("predict", __name__)


model = joblib.load("model/house_model.pkl")
poly = joblib.load("model/poly_transform.pkl")


@predict_bp.route("/predict", methods=["POST"])
def predict():

    data = request.json

    area = int(data["area"])
    bedrooms = int(data["bedrooms"])
    bathrooms = int(data["bathrooms"])
    age = int(data["age"])

    
    features = np.array([[area, bedrooms, bathrooms, age]])

    
    transformed = poly.transform(features)

    
    prediction = int(model.predict(transformed)[0])

    
    formatted_price = "₹" + format_decimal(
        prediction,
        locale='en_IN'
    )

   
    prediction_data = {
        "area": area,
        "bedrooms": bedrooms,
        "bathrooms": bathrooms,
        "age": age,
        "predicted_price": formatted_price
    }

    predictions_collection.insert_one(prediction_data)

    return jsonify({
        "predicted_price": formatted_price
    })