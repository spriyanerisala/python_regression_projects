import { useState } from "react";
import axios from "axios";

const WeatherForm = () => {

  const [form, setForm] = useState({
    humidity: "",
    wind_speed: "",
    pressure: "",
    rainfall: "",
    cloud_cover: ""
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);
    setError("");

    try {

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/predict`,
        {
          humidity: Number(form.humidity),
          wind_speed: Number(form.wind_speed),
          pressure: Number(form.pressure),
          rainfall: Number(form.rainfall),
          cloud_cover: Number(form.cloud_cover)
        }
      );

      setResult(res.data.predicted_temperature);

    } catch (err) {

      console.log(err);
      setError("Something went wrong");

    } finally {

      setLoading(false);
    }
  };

  const clearFields = () => {

    setForm({
      humidity: "",
      wind_speed: "",
      pressure: "",
      rainfall: "",
      cloud_cover: ""
    });

    setResult(null);
    setError("");
  };

  return (

    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center p-4">

      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Weather Temperature Prediction
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="number"
            name="humidity"
            placeholder="Humidity"
            value={form.humidity}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="number"
            name="wind_speed"
            placeholder="Wind Speed"
            value={form.wind_speed}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="number"
            name="pressure"
            placeholder="Pressure"
            value={form.pressure}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="number"
            name="rainfall"
            placeholder="Rainfall"
            value={form.rainfall}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="number"
            name="cloud_cover"
            placeholder="Cloud Cover"
            value={form.cloud_cover}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition duration-300"
          >
            {
              loading
                ? "Predicting..."
                : "Predict Temperature"
            }
          </button>

          <button
            type="button"
            onClick={clearFields}
            className="w-full bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg font-semibold transition duration-300"
          >
            Clear
          </button>

        </form>

        {
          error && (
            <p className="text-red-500 text-center mt-4">
              {error}
            </p>
          )
        }

        {
          result !== null && (
            <div className="mt-6 bg-blue-50 p-5 rounded-xl text-center">

              <h2 className="text-2xl font-bold text-gray-700">
                Predicted Temperature
              </h2>

              <p className="text-5xl font-bold text-blue-600 mt-3">
                {Number(result).toFixed(2)} °C
              </p>

            </div>
          )
        }

      </div>

    </div>
  );
};

export default WeatherForm;