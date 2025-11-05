import { useState, useEffect } from "react";
import axios from "axios";

function CurrencyConverter() {

  const baseURL = import.meta.env.VITE_API_BASE_URL || "";
  // ===========================
  // State Variables
  // ===========================
  const [amount, setAmount] = useState(100);
  const [data, setData] = useState({ usd: 0, eur: 0 });
  const [rate, setRate] = useState({ USD: 0, EUR: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [convertTrigger, setConvertTrigger] = useState(false); // Triggers useEffect manually

  // ===========================
  // useEffect for API Fetching
  // Runs only when convertTrigger changes
  // ===========================
  useEffect(() => {
    const fetchConversion = async () => {
      if (!convertTrigger) return; // Skip initial render
      try {
        setIsLoading(true);
        setError("");

        const response = await axios.get(
          `${baseURL}/api/currency?amount=${amount}`
        );

        setData({
          usd: response.data.usd,
          eur: response.data.eur,
        });
        setRate(response.data.rate);
      } catch (err) {
        console.error("Error fetching currency data:", err.message);
        setError("Failed to fetch conversion rates. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversion();
  }, [convertTrigger]);

  // ===========================
  // Convert Button Click Handler
  // Toggles convertTrigger to re-run useEffect
  // ===========================
  const handleConvert = () => {
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    setConvertTrigger((prev) => !prev);
  };

  // ===========================
  // Error State UI
  // ===========================
  if (error)
    return (
      <div className="bg-white flex flex-col items-center justify-center text-center min-h-screen">
        <img
          src="/Error.jpg"
          alt="error"
          className="h-[150px] sm:h-[200px]"
        />
        <p className="text-gray-800 font-semibold sm:text-lg text-md mt-5">
          {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-1 mt-3 font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );

  // ===========================
  // Loading Spinner UI
  // ===========================
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="relative w-12 h-12">
          <div className="absolute w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );

  // ===========================
  // Main UI Layout
  // ===========================
  return (
    <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-blue-100 via-indigo-100 to-purple-100 p-4 md:p-0 pt-30 md:pt-22">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-4 text-center">
        {/* =======================
            Title Section
        ======================= */}
        <h1 className="text-xl font-bold text-gray-800 mb-1">
          Currency Converter
        </h1>
        <p className="text-gray-500 text-xs mb-4">
          Convert INR to USD and EUR using live exchange rates.
        </p>

        {/* =======================
            Input & Conversion Section
        ======================= */}
        <div className="bg-gray-50 rounded-xl shadow-inner p-4">
          {/* Input: INR */}
          <div className="mb-3 text-left">
            <p className="text-sm text-gray-500 mb-1">Amount (INR)</p>
            <div className="flex items-center justify-between bg-white rounded-xl p-3 border">
              <div className="flex items-center gap-2">
                <img
                  src="https://flagcdn.com/w20/in.png"
                  alt="INR"
                  className="w-6 h-4 rounded-sm"
                />
                <h2 className="font-semibold text-gray-700">INR</h2>
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-right font-semibold text-gray-700 outline-none w-24 bg-transparent"
              />
            </div>
          </div>

          {/* Convert Button */}
          <div className="flex flex-col items-center my-3">
            <button
              onClick={handleConvert}
              className="bg-blue-600 text-white rounded-[50%] p-2 shadow-md hover:bg-blue-700 transition"
              title="Click to convert"
            >
              <i className="fa-solid fa-arrow-down"></i>
            </button>
            <p className="text-xs text-gray-500 mt-1">Click to convert</p>
          </div>

          {/* Output: USD */}
          <div className="text-left mb-3">
            <p className="text-sm text-gray-500 mb-1">Converted to USD</p>
            <div className="flex items-center justify-between bg-white rounded-xl p-3 border">
              <div className="flex items-center gap-2">
                <img
                  src="https://flagcdn.com/w20/us.png"
                  alt="USD"
                  className="w-6 h-4 rounded-sm"
                />
                <h2 className="font-semibold text-gray-700">USD</h2>
              </div>
              <input
                type="text"
                value={data.usd}
                readOnly
                placeholder="—"
                className="text-right font-semibold text-gray-700 outline-none w-24 bg-transparent"
              />
            </div>
          </div>

          {/* Output: EUR */}
          <div className="text-left">
            <p className="text-sm text-gray-500 mb-1">Converted to EUR</p>
            <div className="flex items-center justify-between bg-white rounded-xl p-3 border">
              <div className="flex items-center gap-2">
                <img
                  src="https://flagcdn.com/w20/eu.png"
                  alt="EUR"
                  className="w-6 h-4 rounded-sm"
                />
                <h2 className="font-semibold text-gray-700">EUR</h2>
              </div>
              <input
                type="text"
                value={data.eur}
                readOnly
                placeholder="—"
                className="text-right font-semibold text-gray-700 outline-none w-24 bg-transparent"
              />
            </div>
          </div>
        </div>

        {/* =======================
            Exchange Rate Info Section
        ======================= */}
        <div className="mt-2 text-gray-600">
          <p className="text-sm font-medium mb-1">Indicative Exchange Rates</p>
          <h2 className="font-semibold text-sm sm:text-base">
            1 INR = {rate.USD} USD | 1 INR = {rate.EUR} EUR
          </h2>
          <p className="text-xs mt-2 text-gray-500">
            ₹{amount} = ${data.usd} / €{data.eur}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CurrencyConverter;
