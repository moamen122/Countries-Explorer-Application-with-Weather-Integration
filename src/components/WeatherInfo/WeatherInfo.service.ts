import { useState, useEffect } from 'react';
import axios from 'axios';
import { WeatherData } from '../../types/Weather.type';

export const useWeatherInfo = (city: string) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
        if (!apiKey) {
          throw new Error('API key for weather service is not set.');
        }

        const response = await axios.get<WeatherData>(
          `https://api.openweathermap.org/data/2.5/weather`,
          {
            params: {
              q: city,
              units: 'metric',
              appid: apiKey,
            },
          }
        );
        setWeather(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch weather data.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return { weather, loading, error };
};