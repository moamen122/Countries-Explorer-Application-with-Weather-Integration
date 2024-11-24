export interface WeatherInfoProps {
  city: string;
}

export interface WeatherData {
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}
