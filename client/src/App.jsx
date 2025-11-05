import { useState } from "react";
import Weather from "./components/WeatherModule";
import QuoteGenerator from "./components/QuoteGenerator";
import CurrencyConverter from "./components/CurrencyConverter";

function App() {
  const [activeTab, setActiveTab] = useState("Weather");
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Helper for switching tab + closing mobile menu
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setMenuOpen(false);
  };

  return (
    <div>
      <header className="fixed w-full flex [box-shadow:0px_4px_16px_rgba(17,17,26,0.1),0px_8px_32px_rgba(17,17,26,0.05)] py-4 px-4 sm:px-6 bg-white min-h-[75px] tracking-wide  z-50">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <img
              src="../public/icon1.png"
              alt="logo"
              className="w-10 h-10 rounded-[50%] "
            />
          </a>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-4 mx-auto">
            <button
              onClick={() => handleTabChange("Weather")}
              className={`px-4 py-2 text-[15px] rounded-sm font-medium text-white ${
                activeTab === "Weather" ? "bg-blue-700" : "bg-blue-600"
              } hover:bg-blue-700 cursor-pointer`}
            >
              Weather
            </button>
            <button
              onClick={() => handleTabChange("Currency Converter")}
              className={`px-4 py-2 text-[15px] rounded-sm font-medium text-white ${
                activeTab === "Currency Converter" ? "bg-blue-700" : "bg-blue-600"
              } hover:bg-blue-700 cursor-pointer`}
            >
              Currency Converter
            </button>
            <button
              onClick={() => handleTabChange("Quote Generator")}
              className={`px-4 py-2 text-[15px] rounded-sm font-medium text-white ${
                activeTab === "Quote Generator" ? "bg-blue-700" : "bg-blue-600"
              } hover:bg-blue-700 cursor-pointer`}
            >
              Quote Generator
            </button>
          </nav>

          {/* Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden cursor-pointer p-2 rounded-md border border-gray-300"
          >
            {menuOpen ? (
              <i className="fa-solid fa-xmark text-gray-900"></i>
            ) : (
              <i className="fa-solid fa-bars text-gray-900"></i>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-[75px] left-0 w-full bg-white shadow-md border-t border-gray-200">
            <nav className="flex flex-col items-start p-4 space-y-3 w-[70%] ">
              <button
                onClick={() => handleTabChange("Weather")}
                className="w-full text-left px-4 py-2 rounded-md font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Weather
              </button>
              <button
                onClick={() => handleTabChange("Currency Converter")}
                className="w-full text-left px-4 py-2 rounded-md font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Currency Converter
              </button>
              <button
                onClick={() => handleTabChange("Quote Generator")}
                className="w-full text-left px-4 py-2 rounded-md font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Quote Generator
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Conditional Rendering of Tabs */}
      {activeTab === "Weather" && <Weather />}
      {activeTab === "Currency Converter" && <CurrencyConverter />}
      {activeTab === "Quote Generator" && <QuoteGenerator />}
    </div>
  );
}

export default App;
