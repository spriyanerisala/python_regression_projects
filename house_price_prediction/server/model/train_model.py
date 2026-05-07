import pandas as pd
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
from sklearn.pipeline import make_pipeline
import joblib

df = pd.read_csv('../data/house_data.csv')

X= df[["area","bedrooms","bathrooms","age"]]
Y=df["price"]

poly = PolynomialFeatures(degree=2)
X_poly = poly.fit_transform(X)

model = LinearRegression()
model.fit(X_poly,Y)

joblib.dump(model,"house_model.pkl")
joblib.dump(poly,"poly_transform.pkl")

print("Model trained successfully")
