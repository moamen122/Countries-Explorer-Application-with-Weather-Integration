import React from "react";
import { WeatherInfoProps } from "../../types/Weather.type";
import { useWeatherInfo } from "./WeatherInfo.service";

const WeatherInfo: React.FC<WeatherInfoProps> = ({ city }) => {
  const { weather, loading, error } = useWeatherInfo(city);

  if (loading) return <p>Loading weather...</p>;
  if (error) return <p>Error loading weather: {error}</p>;
  if (!weather) return null;

  return (
    <div style={{ marginTop: "5px" }}>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Condition: {weather.weather[0].description}</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
        alt={weather.weather[0].description}
      />
    </div>
  );
};

export default WeatherInfo;
