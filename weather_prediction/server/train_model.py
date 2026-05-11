import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import pickle

data= pd.read_csv("weather_data.csv")

X = data.drop("temperature",axis=1)

Y = data["temperature"]

model = RandomForestRegressor(n_estimators=100,random_state=42)

model.fit(X,Y)

pickle.dump(model,open("weather_model.pkl","wb"))

print("Model trained")