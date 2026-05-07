from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

try:
    
    mongo_uri = os.getenv("MONGODB_URI")

   
    client = MongoClient(
        mongo_uri,
        serverSelectionTimeoutMS=5000
    )

    
    client.server_info()

    print("MongoDB Connected Successfully")

    
    db = client["house_prediction_db"]

    
    predictions_collection = db["predictions"]

except Exception as e:
    print("MongoDB Connection Failed")
    print("Error:", e)