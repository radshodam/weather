import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaCloudSun,
  FaTemperatureLow,
  FaTemperatureHigh,
} from "react-icons/fa";
import Loader from "react-loader-spinner";

const Weather: React.FC = () => {
  const [city, setCity] = useState<string>("chalus");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const apiKey = "d9c695d49c139c88287625627f678c8d";
  // Replace with your actual API key

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`
      );

      setWeatherData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [city]);
  console.log("weatherData", weatherData);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newCity = e.currentTarget.city.value;
    navigator.vibrate([100, 50, 100]);
    setCity(newCity);
  };

  let backgroundClass = "";
  if (weatherData) {
    const condition = weatherData.weather[0].main.toLowerCase();
    const description = weatherData.weather[0].description.toLowerCase();
    const sunrise = new Date(weatherData.sys.sunrise * 1000);
    const sunset = new Date(weatherData.sys.sunset * 1000);
    const now = new Date();

    if (now > sunset || now < sunrise) {
      // night time
      backgroundClass = "night";
    } else {
      // day time
      backgroundClass = "day";
    }

    switch (condition) {
      case "thunderstorm":
        backgroundClass += " thunderstorm";
        break;
      case "drizzle":
        backgroundClass += " drizzle";
        break;
      case "rain":
        backgroundClass += " rain";
        break;
      case "snow":
        backgroundClass += " snow";
        break;
      case "clear":
        backgroundClass += " clear";
        break;
      case "clouds":
        if (description.includes("few") || description.includes("scattered")) {
          backgroundClass += " clouds-sun";
        } else if (
          description.includes("broken") ||
          description.includes("overcast")
        ) {
          backgroundClass += " clouds";
        }
        break;
      default:
        backgroundClass += " default";
        break;
    }
  }

  return (
    <div
      className={` ${backgroundClass} bg-center bg-cover h-screen bg-no-repeat w-screen `}
    >
      <div className="flex justify-center mx-auto w-full items-center h-full">
        <div
          className={`w-11/12 mx-2 p-10 rounded-md lg:w-1/4 backdrop-blur-sm  ${
            backgroundClass.includes("night")
              ? "bg-black/40 text-white "
              : "bg-white/40 text-gray-800 "
          }`}
        >
          <h1 className="font-bold text-center py-4 text-shadow-md text-4xl ">
            Weather App
          </h1>
          <div>
            {isLoading ? (
              <div className="animate-pulse">
                <div className="flex justify-around">
                  <div className="p-2 text-xl">Loading...</div>
                </div>
                <div className="flex justify-around">
                  <div className="p-2 text-xl">
                    <div className="bg-gray-200 h-24 w-24 rounded-full"></div>
                  </div>
                </div>
              </div>
            ) : (
              weatherData && (
                <div>
                  <div className="flex justify-around">
                    <h2 className="p-2 text-xl">{weatherData.name}</h2>
                    <div className="p-2 text-xl">
                      <span>{weatherData.weather[0].description}</span>
                    </div>
                  </div>
                  <div className="flex justify-around">
                    <div className="pt-4 text-2xl">
                      <FaTemperatureHigh />
                      <span>{Math.round(weatherData.main.temp_max)}&deg;C</span>
                    </div>
                    <div>
                      <img
                        src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                        alt={weatherData.weather[0].description}
                        className="rounded-2xl w-20 h-20"
                      />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
          <form
            onSubmit={handleSearch}
            className="flex justify-center flex-col"
          >
            {/* bg-gradient-to-r from-cyan-500 to-blue-500 */}
            <div className="mt-1">
              <input
                type="text"
                name="city"
                id="name"
                className={`block  w-full py-2 rounded-md border-gray-300 px-4 shadow-sm sm:text-sm"`}
                placeholder="please Choose City :) "
              />
            </div>
            <button
              className={`inline-flex  backdrop-blur-sm ${
                backgroundClass.includes("night")
                  ? "bg-black/40 text-gray-200  hover:bg-gray-700 "
                  : "bg-white/80 text-gray-800 hover:bg-gray-50 "
              } shadow-lg mx-auto mt-8 w-32 items-center rounded-md px-4 py-2 text-base font-medium  focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2`}
              type="submit"
            >
              search City!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Weather;
