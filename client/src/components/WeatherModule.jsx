import { useState, useEffect } from "react";
import axios from "axios";

function Weather() {
  const baseURL = import.meta.env.VITE_API_BASE_URL || "";
  // ===========================
  // State Variables
  // ===========================
  const [city, setCity] = useState("Hyderabad"); // Default city
  const [triggerSearch, setTriggerSearch] = useState(false); // Trigger for fetching data on search click
  const [recent, setRecent] = useState([]); // List of recent searches
  const [dropdownVisible, setDropdownVisible] = useState(false); // Toggle for showing recent searches dropdown

  // Unified weather data object containing both current and forecast data
  const [data, setData] = useState({
    current: null,
    forecast: [],
  });

  const [isLoading, setIsLoading] = useState(false); // Loading flag
  const [error, setError] = useState(""); // Error message state

  // ===========================
  // Load Recent Searches from localStorage (on mount)
  // ===========================
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecent(stored);
  }, []);

  // ===========================
  // Save City to Recent Searches
  // Keeps maximum of 5 recent entries
  // ===========================
  const saveRecentSearch = (cityName) => {
    let updated = [cityName, ...recent.filter((c) => c !== cityName)];
    if (updated.length > 5) updated = updated.slice(0, 5);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
    setRecent(updated);
  };

  // ===========================
  // Fetch Weather Data from Backend API
  // Fetches current + 5-day forecast
  // ===========================
  const fetchWeather = async (cityName) => {
    try {
      if (!cityName) return;
      setIsLoading(true);
      setError("");

      const res = await axios.get(
        `${baseURL}/api/weather?city=${encodeURIComponent(cityName)}`
      );

  

      if (!res.statusText ) throw new Error("City not found");
      const weatherData = res.data

      setData({
        current: weatherData.current,
        forecast: weatherData.forecast,
      });

      saveRecentSearch(cityName);
    } catch (err) {
      console.error("Weather fetch error:", err.message);
      setError("Unable to fetch weather data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // ===========================
  // Fetch Default City on Mount
  // ===========================
  useEffect(() => {
    fetchWeather("Hyderabad");
  }, []);

  // ===========================
  // useEffect - Triggered when Search Button is Pressed
  // ===========================
  useEffect(() => {
    if (!triggerSearch) return;
    fetchWeather(city);
  }, [triggerSearch]);

  // ===========================
  // Handle Search Button Click
  // ===========================
  const handleSearch = () => {
    if (city.trim() === "") return alert("Enter a City Name");
    setTriggerSearch((prev) => !prev); // Toggle to re-run useEffect
    setDropdownVisible(false);
  };

  // ===========================
  // Handle Selecting Recent Search
  // ===========================
  const handleSelectRecent = (selected) => {
    setCity(selected);
    setTriggerSearch((prev) => !prev);
    setDropdownVisible(false);
  };

  // ===========================
  // Loading Spinner UI
  // ===========================
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="relative w-12 h-12">
          <div className="absolute w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );

  // ===========================
  // Error State UI
  // ===========================
  if (error)
    return (
      <div className="bg-white flex flex-col items-center justify-center text-center min-h-screen">
        <img
          src="../src/assets/Error.jpg"
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
  // Main UI - Weather Display
  // ===========================
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-100 via-pink-200 to-orange-200 text-[#1E293B] overflow-x-hidden pt-20">
      {/* =======================
          Search Section
      ======================= */}
      <section className="flex flex-col items-center my-7 md:flex-row md:gap-10 md:px-14 lg:gap-12 lg:px-12 w-full">
        <section className="md:w-[45%] lg:w-[35%]">
          <div className="flex flex-row justify-center gap-2 relative">
            {/* Search Input */}
            <div className="relative w-full border-2 text-gray-400 rounded-[25px] p-1.5 bg-white lg:pl-2.5 shadow-lg">
              <i className="fa-solid fa-magnifying-glass absolute top-2.5 left-3 text-gray-500"></i>

              <input
                type="search"
                placeholder="Enter Your City..."
                className="text-center border-none outline-none w-[90%] ml-6 text-gray-700"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setDropdownVisible(true);
                }}
                onFocus={() => setDropdownVisible(true)}
                autoComplete="off"
              />

              {/* Dropdown - Recent Searches */}
              {dropdownVisible && recent.length > 0 && (
                <ul className="bg-white rounded-b-xl absolute font-bold text-[14px] w-[90%] overflow-y-auto max-h-[115px] text-center top-10 left-3 z-10 shadow">
                  <li className="text-gray-700 py-0.5">Recent Searches</li>
                  <hr className="my-1" />
                  {recent.map((c) => (
                    <li
                      key={c}
                      className="hover:bg-blue-100 cursor-pointer py-1"
                      onClick={() => handleSelectRecent(c)}
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold px-4 m-0.5 rounded-lg shadow-lg"
            >
              Search
            </button>
          </div>
        </section>

        {/* =======================
            Current Weather Card
        ======================= */}
        <section className="backdrop-blur-md bg-white/40 border border-white/30 rounded-xl hover:shadow-lg transition-all p-3 w-[80%] mt-8 shadow-lg md:w-[55%] lg:w-[65%] lg:px-7 lg:mt-6">
          {data.current ? (
            <>
              <h2 className="text-center font-bold text-[18px] p-2.5 text-[#0284C7] lg:text-start">
                {data.current.city} ({new Date().toLocaleDateString("en-GB")})
              </h2>
              <section className="text-center flex flex-row justify-start items-center gap-5 text-[13px] md:gap-7 lg:justify-between lg:text-[15px]">
                {/* Temperature / Wind / Humidity */}
                <section className="lg:w-[50%] text-left">
                  <p className="py-2">
                    🌡 Temperature: {data.current.temperature}°C
                  </p>
                  <p className="py-2">💨 Wind: {data.current.wind_speed} m/s</p>
                  <p className="py-2">💧 Humidity: {data.current.humidity}%</p>
                </section>

                {/* Weather Icon + Description */}
                <figure className="flex flex-col justify-center items-center lg:w-[50%] lg:pb-5">
                  <img
                    className="h-24 brightness-110"
                    src={`https://openweathermap.org/img/wn/${data.current.icon}@2x.png`}
                    alt={data.current.description}
                  />
                  <figcaption className="py-1.5 font-medium text-center lg:text-[16px]">
                    {data.current.description}
                  </figcaption>
                </figure>
              </section>
            </>
          ) : (
            <p className="text-center text-gray-600">Fetching weather...</p>
          )}
        </section>
      </section>

      {/* =======================
          5-Day Forecast Section
      ======================= */}
      <div className="flex justify-center items-center my-8 w-[80%] md:w-[85%] lg:w-[92%] text-center">
        <hr className="w-20 border-gray-700 grow" />
        <span className="px-1 text-gray-700 font-medium">5-Day Forecast</span>
        <hr className="w-20 border-gray-700 grow" />
      </div>

      <section className="flex flex-col md:flex-row md:flex-wrap md:gap-10 md:justify-center md:items-center lg:gap-7.5">
        {data.forecast.length > 0 ? (
          data.forecast.map((day, idx) => (
            <section
              key={idx}
              className="backdrop-blur-lg bg-white/40 border border-white/30 rounded-xl shadow-lg hover:shadow-xl transition-all p-3 w-[50%] mb-6 m-auto md:w-[25%] lg:w-[16.8%]"
            >
              <h2 className="text-center font-bold text-[16px] m-2.5 text-[#0284C7]">
                {new Date(day.date).toDateString()}
              </h2>
              <figure className="flex flex-col justify-center items-center">
                <img
                  src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                  alt={day.description}
                  className="h-16 brightness-110"
                />
                <figcaption className="py-1.5 font-medium">
                  {day.description}
                </figcaption>
              </figure>
              <section className="text-[14px] text-center mt-2">
                <p className="mb-2">🌡 Temp: {day.temperature}°C</p>
                <p className="mb-2">💨 Wind: {day.wind_speed} m/s</p>
                <p className="mb-2">💧 Humidity: {day.humidity}%</p>
              </section>
            </section>
          ))
        ) : (
          <h1 className="text-center text-gray-700">
            {error || "Fetching forecast..."}
          </h1>
        )}
      </section>
    </div>
  );
}

export default Weather;
