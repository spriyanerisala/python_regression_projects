import pandas as pd
from sklearn.tree import DecisionTreeRegressor

data = pd.read_csv('../server/delivery_data.csv')

X = data[[
    "Distance_km",
    "Traffic_Level",
    "Weather",
    "Partner_Rating",
    "Prep_Time"
]]
y = data["Delivery_Time"]

model = DecisionTreeRegressor(max_depth=5,random_state=42)

model.fit(X,y)
