const ResultCard = ({ price }) => {
  return (
    <div className="mt-6 bg-blue-700 text-white rounded-2xl p-6 shadow-xl text-center animate-pulse">
      <h2 className="text-xl font-semibold mb-2">
        Predicted House Price
      </h2>

      <h1 className="text-4xl font-bold">
        {price}
      </h1>
    </div>
  );
};

export default ResultCard;