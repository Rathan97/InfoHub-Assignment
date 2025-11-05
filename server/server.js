import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import axios from "axios";

// ===========================
// App Configuration
// ===========================
configDotenv(); // Load environment variables from .env file
const PORT = 3001; // Server Port
const app = express();

// ===========================
// Middleware Setup
// ===========================
app.use(cors()); // Enable CORS for frontend access
app.use(express.json()); // Parse incoming JSON requests

// ===================================================
// Route 1: Quote API
// Endpoint: /api/quote
// Description: Fetches a random quote from an external API (DummyJSON)
// ===================================================
app.get("/api/quote", async (req, res) => {
  try {
    // Fetch a random quote from DummyJSON public API
    const response = await axios.get("https://dummyjson.com/quotes/random");

    if (response.data) {
      // Respond with only the relevant data
      return res.status(200).json(response.data);
    } else {
      // Handle missing data
      return res.status(404).json({ message: "No quote found." });
    }
  } catch (err) {
    console.error("Error fetching quote:", err.message);
    return res
      .status(500)
      .json({ message: "Error fetching quote from external API." });
  }
});

// ===================================================
// Route 2: Weather API
// Endpoint: /api/weather?city=CityName
// Description: Fetches current weather + 5-day forecast using OpenWeatherMap API
// ===================================================
app.get("/api/weather", async (req, res) => {
  try {
    // Default city if not provided in query
    const city = req.query.city || "Hyderabad";
    const apiKey = process.env.WEATHER_API_KEY;

    // Get latitude & longitude for the given city
    const geoResponse = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
    );

    // Validate city existence
    if (!geoResponse.data.length) {
      return res.status(404).json({ error: "City not found." });
    }

    const { lat, lon, name } = geoResponse.data[0];

    //  Fetch current weather data
    const currentWeatherRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );

    const currentData = currentWeatherRes.data;

    // Prepare simplified current weather data
    const currentWeather = {
      city: name,
      temperature: currentData.main.temp,
      humidity: currentData.main.humidity,
      wind_speed: currentData.wind.speed,
      description: currentData.weather[0].description,
      icon: currentData.weather[0].icon,
    };

    //  Fetch 5-day forecast data
    const forecastRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );

    // Extract one reading per day (around 12:00 PM)
    const forecastList = forecastRes.data.list.filter((item) =>
      item.dt_txt.includes("12:00:00")
    );

    // Map required fields from forecast response
    const forecast = forecastList.map((day) => ({
      date: day.dt_txt,
      temperature: day.main.temp,
      humidity: day.main.humidity,
      wind_speed: day.wind.speed,
      description: day.weather[0].description,
      icon: day.weather[0].icon,
    }));

    // Send Combined Response (Current + Forecast)
    return res.status(200).json({
      location: name,
      current: currentWeather,
      forecast: forecast,
    });
  } catch (err) {
    console.error("Weather API Error:", err.message);
    return res
      .status(500)
      .json({ error: "Error fetching weather data. Please try again later." });
  }
});

// ===================================================
// Route 3: Currency API
// Endpoint: /api/currency?amount=100
// Description: Converts INR amount to USD and EUR using ExchangeRate API
// ===================================================
app.get("/api/currency", async (req, res) => {
  try {
    const amount = parseFloat(req.query.amount);

    // Validate amount input
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount provided." });
    }

    // Fetch latest INR conversion rates
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_API_KEY}/latest/INR`
    );

    const rates = response.data.conversion_rates;

    // Validate required currencies
    if (!rates || !rates.USD || !rates.EUR) {
      return res
        .status(500)
        .json({ error: "Could not fetch exchange rates from API." });
    }

    // Perform conversions
    const usd = (amount * rates.USD).toFixed(2);
    const eur = (amount * rates.EUR).toFixed(2);

    // Send cleaned response
    return res.status(200).json({
      amount_in_inr: amount,
      usd: parseFloat(usd),
      eur: parseFloat(eur),
      rate: {
        USD: rates.USD.toFixed(4),
        EUR: rates.EUR.toFixed(4),
      },
    });
  } catch (err) {
    console.error("Currency API Error:", err.message);
    return res
      .status(500)
      .json({ error: "Error fetching currency data. Please try again later." });
  }
});

// ===================================================
// Server Startup
// ===================================================
app.listen(PORT, () => {
  console.log(` Server is listening on port ${PORT}`);
});
