import { FaHome } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="w-full bg-blue-700 shadow-lg px-10 py-5 flex justify-between items-center">
      <div className="flex items-center gap-3 text-white">
        <FaHome className="text-3xl" />

        <h1 className="text-2xl font-bold tracking-wide">
          House Price Predictor
        </h1>
      </div>

      <button className="bg-white text-blue-700 px-5 py-2 rounded-xl font-semibold hover:bg-blue-100 transition-all duration-300">
        Predict Now
      </button>
    </div>
  );
};

export default Navbar;