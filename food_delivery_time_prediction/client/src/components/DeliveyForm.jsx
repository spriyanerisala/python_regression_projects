import { useState } from "react";
import axios from "axios";

const DeliveryForm = () => {

  const [form, setForm] = useState({
    distance: "",
    traffic: "",
    weather: "",
    rating: "",
    prep_time: ""
  });

  const [result, setResult] = useState(null);


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URI}/predict`,
      form
    );

    setResult(response.data);
  };


  const handleClear = () => {

    setForm({
      distance: "",
      traffic: "",
      weather: "",
      rating: "",
      prep_time: ""
    });

    setResult(null);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">

        <h1 className="text-2xl font-bold mb-6 text-blue-900 text-center">
          Food Delivery Prediction
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="number"
            name="distance"
            placeholder="Distance KM"
            value={form.distance}
            className="w-full border p-3 border-blue-600 rounded"
            onChange={handleChange}
          />

          <input
            type="number"
            name="traffic"
            placeholder="Traffic Level"
            value={form.traffic}
            className="w-full border p-3 border-blue-600 rounded"
            onChange={handleChange}
          />

          <input
            type="number"
            name="weather"
            placeholder="Weather"
            value={form.weather}
            className="w-full border p-3 border-blue-600 rounded"
            onChange={handleChange}
          />

          <input
            type="number"
            step="0.1"
            name="rating"
            placeholder="Partner Rating"
            value={form.rating}
            className="w-full border p-3 border-blue-600 rounded"
            onChange={handleChange}
          />

          <input
            type="number"
            name="prep_time"
            placeholder="Preparation Time"
            value={form.prep_time}
            className="w-full border p-3 border-blue-600 rounded"
            onChange={handleChange}
          />

         
          <div className="flex gap-4">

            <button
              type="submit"
              className="w-full bg-blue-900 cursor-pointer text-white p-3 rounded"
            >
              Predict
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="w-full bg-red-500 cursor-pointer text-white p-3 rounded"
            >
              Clear
            </button>

          </div>

        </form>

        {
          result && (
            <div className="mt-6 text-center">

              <h2 className="text-xl text-blue-900 font-bold">
                Delivery Time:
              </h2>

              <p className="text-blue-900 font-bold text-6xl mt-2">
                {result.predicted_delivery_time} mins
              </p>

            </div>
          )
        }

      </div>

    </div>
  );
};

export default DeliveryForm;