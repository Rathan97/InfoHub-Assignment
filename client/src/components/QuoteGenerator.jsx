import { useState, useEffect } from "react";
import axios from "axios";

function QuoteGenerator() {
  const baseURL = import.meta.env.VITE_API_BASE_URL || "";
  // ===========================
  // State Variables
  // ===========================
  const [data, setData] = useState(""); // Holds fetched quote and author
  const [loading, setLoading] = useState(false); // Loading flag for spinner
  const [error, setError] = useState(""); // Error message state
  const [refresh, setRefresh] = useState(false); // Trigger flag for re-fetching quotes

  // ===========================
  // useEffect - Fetch Quote from Backend
  // Runs when component mounts or when refresh toggles
  // ===========================
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        setLoading(true);
        setError("");

        // Fetch quote from backend API
        const response = await axios.get(`${baseURL}/api/quote`);

        if (response.data && response.data.quote) {
          setData(response.data); // Set quote + author data
        } else {
          setError("No quote found from the server.");
        }
      } catch (err) {
        console.error("Error fetching quote:", err.message);
        setError("Could not fetch quote. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, [refresh]); // Re-run effect when refresh changes

  // ===========================
  // New Quote Button Handler
  // Toggles refresh state to trigger useEffect
  // ===========================
  const handleNewQuote = () => {
    setRefresh((prev) => !prev);
  };

  // ===========================
  // Error State UI
  // Displays an error message if fetching fails
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
  // Displays while fetching quote
  // ===========================
  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="relative w-12 h-12">
          <div className="absolute w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );

  // ===========================
  // Main UI
  // Displays the quote, author, and new quote button
  // ===========================
  return (
    <div className="min-h-screen flex justify-center items-center bg-[#5B2E91] p-4 pt-20">
      <div className="bg-white rounded-2xl shadow-lg text-center p-6 sm:p-8 w-full max-w-md md:max-w-lg lg:max-w-xl transition-all">
        {/* =======================
            Title Section
        ======================= */}
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-10">
          Quote of the Day
        </h1>

        {/* =======================
            Quote Display Section
        ======================= */}
        <div className="relative mb-6 px-3 sm:px-6">
          <p className="text-gray-700 text-base sm:text-lg md:text-xl italic leading-relaxed relative">
            <span className="text-3xl sm:text-4xl text-gray-400 absolute -left-6 -top-10">
              <i className="fa-solid fa-quote-left text-2xl text-gray-900"></i>
            </span>
            {data.quote || "Fetching quote..."}
            <span className="text-3xl sm:text-4xl text-gray-400 absolute -right-3 -bottom-6">
              <i className="fa-solid fa-quote-right text-2xl text-gray-900"></i>
            </span>
          </p>
        </div>

        {/* =======================
            Author Section
        ======================= */}
        <p className="text-gray-600 font-medium text-sm sm:text-base pt-4 text-right pr-4 sm:pr-6">
          — {data.author}
        </p>

        <hr className="my-6 border-gray-300" />

        {/* =======================
            New Quote Button
        ======================= */}
        <div className="flex justify-center sm:justify-end">
          <button
            onClick={handleNewQuote}
            className="bg-[#5B2E91] text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium hover:bg-[#4A247A] transition-all shadow-md text-sm sm:text-base"
          >
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuoteGenerator;
