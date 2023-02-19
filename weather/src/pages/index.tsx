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
    setCity(newCity);
  };

  let backgroundClass = "";
  if (weatherData) {
    const condition = weatherData.weather[0].main.toLowerCase();
    switch (condition) {
      case "thunderstorm":
        backgroundClass = "thunderstorm";
        break;
      case "drizzle":
        backgroundClass = "drizzle";
        break;
      case "rain":
        backgroundClass = "rain";
        break;
      case "snow":
        backgroundClass = "snow";
        break;
      case "clear":
        backgroundClass = "clear sunset";
        break;
      case "clouds":
        backgroundClass = "clouds";
        break;
      default:
        backgroundClass = "default";
        break;
    }
  }

  return (
    <div
      className={` bg-center bg-cover h-screen bg-no-repeat w-screen ${backgroundClass}`}
    >
      <div className="flex justify-center mx-auto w-full items-center h-full">
        <div className="w-full p-10 rounded-md lg:w-1/4 backdrop-blur-sm bg-white/30 ">
          <h1 className="font-bold text-center py-4 text-gray-800 text-shadow-md text-4xl ">
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
            <div className="mt-1">
              <input
                type="text"
                name="city"
                id="name"
                className="block w-full py-2 rounded-md border-gray-300 px-4 shadow-sm focus:border-sky-300 focus:ring-sky-300 sm:text-sm"
                placeholder="please Choose City :) "
              />
            </div>
            <button
              className="inline-flex  backdrop-blur-sm bg-white/60 shadow-lg mx-auto mt-8 w-32 items-center rounded-md  bg-white px-4 py-2 text-base font-medium text-gray-700  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2"
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
