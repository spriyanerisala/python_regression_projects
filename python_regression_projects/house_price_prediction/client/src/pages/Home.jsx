import Navbar from "../components/Navbar";
import PredictionForm from "../components/PredictionForm";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200">

      <Navbar />

      <div className="flex justify-center items-center py-20 px-5">

        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl w-full">

          <div>
            <h1 className="text-6xl font-extrabold text-blue-800 leading-tight">
              Smart House
              <span className="text-blue-500"> Price Prediction</span>
            </h1>

            <p className="mt-8 text-gray-600 text-xl leading-9">
              Predict house prices instantly using Machine Learning and Polynomial Regression.
              Get accurate AI-powered predictions based on area, bedrooms,
              bathrooms, and age of the house.
            </p>

            <button className="mt-10 bg-blue-700 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-xl hover:bg-blue-800 transition-all duration-300">
              Explore Predictions
            </button>
          </div>


          <div className="flex justify-center">
            <PredictionForm />
          </div>

        </div>

      </div>

    </div>
  );
};

export default Home;