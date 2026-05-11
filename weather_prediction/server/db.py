from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))

try:
    db=client["weather_prediction_db"]
    collection = db["predictions"]
    print("Connected to MongoDB")
except Exception as e:
    print("Error in connection of mongodb",e)
