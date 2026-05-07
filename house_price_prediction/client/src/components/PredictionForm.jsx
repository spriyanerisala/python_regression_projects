import { useState } from "react";
import axios from "axios";
import ResultCard from "./ResultCard";

const PredictionForm = () => {

  const [formData, setFormData] = useState({
    area: "",
    bedrooms: "",
    bathrooms: "",
    age: ""
  });

  const [price, setPrice] = useState("");

  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
       });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData
      );

      setPrice(response.data.predicted_price);

    } catch (error) {
      console.log(error);
       alert("Prediction Failed");

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="bg-white shadow-2xl rounded-3xl p-10 w-[450px] border border-blue-100">

      <h1 className="text-4xl font-bold text-blue-700 text-center mb-2">
        Predict Your Dream Home
      </h1>

      <p className="text-center text-gray-500 mb-8">
        AI Powered Polynomial Regression Model
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
         <div>
          <label className="font-semibold text-blue-700">
            Area (sq.ft)
          </label>

          <input
            type="number"
            name="area"
            placeholder="Enter area"
            value={formData.area}
            onChange={handleChange}
            required
            className="w-full mt-2 p-4 rounded-xl border border-blue-200 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="font-semibold text-blue-700">
            Bedrooms
          </label>

          <input
            type="number"
            name="bedrooms"
            placeholder="Enter bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            required
            className="w-full mt-2 p-4 rounded-xl border border-blue-200 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
<div>
          <label className="font-semibold text-blue-700">
            Bathrooms
          </label>

          <input
            type="number"
            name="bathrooms"
            placeholder="Enter bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            required
            className="w-full mt-2 p-4 rounded-xl border border-blue-200 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
 <div>
          <label className="font-semibold text-blue-700">
            House Age
          </label>

          <input
            type="number"
            name="age"
            placeholder="Enter house age"
            value={formData.age}
            onChange={handleChange}
            required
            className="w-full mt-2 p-4 rounded-xl border border-blue-200 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-xl text-lg font-bold transition-all duration-300 shadow-lg"
        >
          {
            loading ? "Predicting..." : "Predict House Price"
          }
        </button>

      </form>


      {
        price && <ResultCard price={price} />
      }

    </div>
  );
};

export default PredictionForm;