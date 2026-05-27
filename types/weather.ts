export interface WeatherData {
  city: string;
  country: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  condition: string;
  description: string;
  icon: string;
  sunrise: number;
  sunset: number;
  lat: number;
  lon: number;
}

export interface GeoResult {
  name: string;
  lat: number;
  lon: number;
  country: string;
}
