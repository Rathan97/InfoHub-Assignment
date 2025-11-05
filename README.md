# 🌐 InfoHub 

InfoHub application is a **full-stack web application** built with **React (frontend)** and **Node.js + Express (backend)**.  
It provides users with **real-time weather updates**, **currency conversion**, and **daily motivational quotes** — all in one elegant interface.

---

## 🧭 Project Overview

### 🎯 Purpose
The goal of this project is to demonstrate how to integrate multiple public APIs into a unified, responsive, and user-friendly dashboard — featuring dynamic data fetching, modular components, and a clean UI.

### 🧩 Architecture
The project follows a **client-server architecture**:

```
InfoHub-Challenge/
├── client/                      # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── WeatherModule.jsx      # Weather data & UI
│   │   │   ├── CurrencyConverter.jsx  # Currency exchange module
│   │   │   └── QuoteGenerator.jsx     # Random quotes module
│   │   ├── App.jsx                    # Handles navigation & active tabs
│   │   ├── index.css
│   │   └── main.jsx                   # React entry point
│   └── package.json
│
└── server/                      # Node.js + Express Backend
    ├── server.js                # API routes and backend logic
    ├── .env                     # Environment variables (API keys)
    └── package.json
```

---

## ✨ Features

### 🏙️ Weather Dashboard
- Fetches **current weather** and **5-day forecast** for any city.  
- Displays temperature, humidity, wind speed, and condition icons.  
- Uses **OpenWeatherMap API**.

### 💱 Currency Converter
- Converts **INR** to **USD** and **EUR** in real time.  
- Fetches live rates from **ExchangeRate API**.  
- Includes input validation and clean formatted output.

### 💬 Quote Generator
- Fetches **random motivational quotes** from an external API.  
- Includes a “New Quote” button for instant refresh.  
- Gracefully handles API loading and errors.

### 💻 Tech Stack
| Layer | Technology |
|-------|-------------|
| Frontend | React, Vite, TailwindCSS |
| Backend | Node.js, Express.js |
| APIs | OpenWeatherMap, ExchangeRate, DummyJSON |
| Styling | TailwindCSS |
| HTTP Requests | Axios, Fetch |
| State Management | React Hooks (useState, useEffect) |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Rathan97/InfoHub-Assignment.git
cd InfoHub-Challenge
```

---

### 2️⃣ Setup the Backend
Navigate to the `server` folder and install dependencies:
```bash
cd server
npm install
```

#### Create a `.env` file
Inside `server/`, create a `.env` file and add your API keys:

```env
PORT=3001
WEATHER_API_KEY=your_openweathermap_api_key
EXCHANGE_API_KEY=your_exchangerate_api_key
```

You can get your keys here:
- 🌤️ OpenWeatherMap → https://openweathermap.org/api  
- 💱 ExchangeRate API → https://www.exchangerate-api.com/

Then start the backend:
```bash
npm start
```
Server will run at **http://localhost:3001**

---

### 3️⃣ Setup the Frontend
Open a new terminal and navigate to the `client` folder:
```bash
cd client
npm install
```

Then start the React app:
```bash
npm run dev
```
Frontend will run at **http://localhost:5173**

---

## 🔗 API Endpoints (Backend)

| Endpoint | Method | Description |
|-----------|---------|-------------|
| `/api/weather?city=London` | GET | Get current weather + 5-day forecast |
| `/api/currency?amount=100` | GET | Convert 100 INR to USD & EUR |
| `/api/quote` | GET | Fetch a random motivational quote |

---

## 🧠 How It Works

- **Frontend (React)** sends requests to **backend endpoints** (`/api/...`).
- **Backend (Express)** securely calls external APIs (OpenWeatherMap, ExchangeRate, DummyJSON).
- **Data** is simplified and returned to the frontend for rendering.
- Each module (`Weather`, `Currency`, `Quote`) manages its own UI state (loading, error, data).

---

## 🧾 Example `.env.example`

```env
# Rename this file to .env and add your API keys
PORT=3001
WEATHER_API_KEY=your_openweathermap_api_key
EXCHANGE_API_KEY=your_exchangerate_api_key
```

---

## 🧑‍💻 Developer Notes

- All API keys are stored securely in `.env`.
- Each module (Weather, Currency, Quote) handles **its own state** (`data`, `isLoading`, `error`).
- The app is fully **responsive** and optimized for both desktop and mobile.
- Ideal for beginners learning **API integration, React hooks, and Node backend routing**.

---

## 🏁 Run Summary

| Service | Command | URL |
|----------|----------|-----|
| Backend | `npm start` | http://localhost:3001 |
| Frontend | `npm run dev` | http://localhost:5173 |

---

## 🧑‍🚀 Author

**Developed by:** Rathnakar Sidramyna
**Stack:** MERN (React + Node + Express)  
**Project:** InfoHub Application🌎  


---

## 🪪 License
This project is open-source under the **MIT License**.
