const ICON_MAP: Record<string, string> = {
  '01d': '☀️',
  '01n': '🌙',
  '02d': '⛅',
  '02n': '🌤️',
  '03d': '☁️',
  '03n': '☁️',
  '04d': '☁️',
  '04n': '☁️',
  '09d': '🌧️',
  '09n': '🌧️',
  '10d': '🌦️',
  '10n': '🌧️',
  '11d': '⛈️',
  '11n': '⛈️',
  '13d': '❄️',
  '13n': '❄️',
  '50d': '🌫️',
  '50n': '🌫️',
};

export default function WeatherIcon({ icon, size = 'md' }: { icon: string; size?: 'sm' | 'md' | 'lg' }) {
  const emoji = ICON_MAP[icon] ?? '🌡️';
  const sizeClass = size === 'lg' ? 'text-7xl' : size === 'md' ? 'text-5xl' : 'text-3xl';
  return <span className={`${sizeClass} leading-none select-none`}>{emoji}</span>;
}
