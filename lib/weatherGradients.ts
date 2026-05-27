export function getGradientStyle(condition: string, isDay: boolean): string {
  const gradients: Record<string, { day: string; night: string }> = {
    Clear: {
      day: 'from-amber-400 via-orange-300 to-yellow-200',
      night: 'from-indigo-900 via-blue-900 to-slate-800',
    },
    Clouds: {
      day: 'from-slate-400 via-blue-300 to-gray-200',
      night: 'from-slate-700 via-gray-700 to-slate-600',
    },
    Rain: {
      day: 'from-blue-700 via-blue-500 to-indigo-400',
      night: 'from-slate-900 via-blue-900 to-indigo-900',
    },
    Drizzle: {
      day: 'from-blue-600 via-cyan-400 to-indigo-300',
      night: 'from-slate-800 via-blue-900 to-indigo-800',
    },
    Thunderstorm: {
      day: 'from-gray-900 via-purple-900 to-slate-800',
      night: 'from-gray-950 via-purple-950 to-black',
    },
    Snow: {
      day: 'from-blue-100 via-white to-slate-200',
      night: 'from-slate-600 via-blue-900 to-slate-800',
    },
    Mist: {
      day: 'from-gray-400 via-gray-300 to-stone-200',
      night: 'from-gray-700 via-slate-700 to-gray-600',
    },
    Fog: {
      day: 'from-gray-400 via-gray-300 to-stone-200',
      night: 'from-gray-700 via-slate-700 to-gray-600',
    },
    Haze: {
      day: 'from-yellow-200 via-amber-100 to-orange-100',
      night: 'from-gray-700 via-slate-600 to-gray-500',
    },
    Dust: {
      day: 'from-yellow-400 via-amber-300 to-orange-200',
      night: 'from-amber-900 via-yellow-900 to-gray-800',
    },
  };

  const entry = gradients[condition] ?? gradients['Clouds'];
  return isDay ? entry.day : entry.night;
}

export function getTextColor(condition: string, isDay: boolean): string {
  if (!isDay) return 'text-white';
  if (condition === 'Snow') return 'text-slate-700';
  if (['Mist', 'Fog', 'Haze'].includes(condition)) return 'text-slate-800';
  return 'text-white';
}
