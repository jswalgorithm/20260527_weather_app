import type { WeatherData } from '@/types/weather';
import WeatherIcon from './WeatherIcon';
import { Droplets, Wind, Gauge } from 'lucide-react';

interface Props {
  data: WeatherData;
  isDay: boolean;
}

export default function WeatherCard({ data, isDay }: Props) {
  const windKmh = Math.round(data.windSpeed * 3.6);
  const tempLabel = isDay ? '🌡️' : '🌙';

  return (
    <div className="w-full max-w-sm backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-white leading-tight">
            {data.city}
          </h1>
          <p className="text-white/60 text-sm">{data.country}</p>
        </div>
        <WeatherIcon icon={data.icon} size="lg" />
      </div>

      <div className="mb-2">
        <span className="text-7xl font-thin text-white leading-none">
          {Math.round(data.temp)}°
        </span>
      </div>

      <p className="text-white/80 text-base capitalize mb-1">{data.description}</p>
      <p className="text-white/55 text-sm mb-5">
        {tempLabel} 체감 {Math.round(data.feelsLike)}°C
      </p>

      <div className="grid grid-cols-3 gap-3">
        <Stat icon={<Droplets size={16} />} label="습도" value={`${data.humidity}%`} />
        <Stat icon={<Wind size={16} />} label="바람" value={`${windKmh}km/h`} />
        <Stat icon={<Gauge size={16} />} label="기압" value={`${data.pressure}hPa`} />
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1 bg-white/10 rounded-2xl p-3">
      <span className="text-white/60">{icon}</span>
      <span className="text-white text-sm font-medium">{value}</span>
      <span className="text-white/50 text-xs">{label}</span>
    </div>
  );
}
