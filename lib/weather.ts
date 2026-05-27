import type { WeatherData } from '@/types/weather';

async function fetchWeather(params: Record<string, string>): Promise<WeatherData> {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`/api/weather?${query}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error ?? '날씨 정보를 가져오지 못했어요');
  }
  return data as WeatherData;
}

export function fetchWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
  return fetchWeather({ lat: String(lat), lon: String(lon) });
}

export function fetchWeatherByCity(city: string): Promise<WeatherData> {
  return fetchWeather({ city });
}
