'use client';

import { useEffect, useReducer, useCallback } from 'react';
import type { WeatherData } from '@/types/weather';
import type { OutfitItem } from '@/types/outfit';
import { fetchWeatherByCoords, fetchWeatherByCity } from '@/lib/weather';
import { getOutfitRecommendations } from '@/lib/outfit';
import { getTextColor } from '@/lib/weatherGradients';
import GradientBackground from '@/components/GradientBackground';
import WeatherCard from '@/components/WeatherCard';
import OutfitCard from '@/components/OutfitCard';
import SearchBar from '@/components/SearchBar';
import LocationButton from '@/components/LocationButton';
import LoadingSpinner from '@/components/LoadingSpinner';

type LocationStatus = 'idle' | 'locating' | 'success' | 'error';

interface State {
  weather: WeatherData | null;
  outfit: OutfitItem[];
  locationStatus: LocationStatus;
  isLoading: boolean;
  error: string | null;
}

type Action =
  | { type: 'LOCATING' }
  | { type: 'LOADING' }
  | { type: 'SUCCESS'; weather: WeatherData; outfit: OutfitItem[] }
  | { type: 'ERROR'; error: string }
  | { type: 'CLEAR_ERROR' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'LOCATING':
      return { ...state, locationStatus: 'locating', error: null };
    case 'LOADING':
      return { ...state, isLoading: true, error: null };
    case 'SUCCESS':
      return {
        ...state,
        weather: action.weather,
        outfit: action.outfit,
        locationStatus: 'success',
        isLoading: false,
        error: null,
      };
    case 'ERROR':
      return {
        ...state,
        isLoading: false,
        locationStatus: state.locationStatus === 'locating' ? 'error' : state.locationStatus,
        error: action.error,
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
}

const INITIAL_STATE: State = {
  weather: null,
  outfit: [],
  locationStatus: 'idle',
  isLoading: false,
  error: null,
};

export default function Home() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { weather, outfit, locationStatus, isLoading, error } = state;

  const now = Date.now() / 1000;
  const isDay = weather ? now >= weather.sunrise && now <= weather.sunset : true;
  const condition = weather?.condition ?? 'Clouds';
  const textColor = getTextColor(condition, isDay);

  const loadWeather = useCallback(async (fetchFn: () => Promise<WeatherData>) => {
    dispatch({ type: 'LOADING' });
    try {
      const data = await fetchFn();
      dispatch({ type: 'SUCCESS', weather: data, outfit: getOutfitRecommendations(data) });
    } catch (err) {
      dispatch({
        type: 'ERROR',
        error: err instanceof Error ? err.message : '알 수 없는 오류가 발생했어요',
      });
    }
  }, []);

  const handleLocate = useCallback(() => {
    if (!navigator.geolocation) {
      dispatch({ type: 'ERROR', error: '이 브라우저는 위치 서비스를 지원하지 않아요' });
      return;
    }
    dispatch({ type: 'LOCATING' });
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        loadWeather(() => fetchWeatherByCoords(coords.latitude, coords.longitude));
      },
      () => {
        dispatch({ type: 'ERROR', error: '위치 접근이 거부됐어요. 도시명으로 검색해 주세요.' });
      },
      { timeout: 10000 }
    );
  }, [loadWeather]);

  const handleSearch = useCallback(
    (city: string) => {
      loadWeather(() => fetchWeatherByCity(city));
    },
    [loadWeather]
  );

  useEffect(() => {
    handleLocate();
  }, [handleLocate]);

  return (
    <>
      <GradientBackground condition={condition} isDay={isDay} />

      <main className={`min-h-screen flex flex-col items-center px-4 pt-12 pb-10 gap-5 ${textColor}`}>
        <header className="w-full max-w-sm flex flex-col gap-3">
          <h1 className="text-xl font-bold text-white/90 text-center tracking-tight">
            🌤️ 오늘 뭐 입지?
          </h1>

          <div className="flex flex-col gap-2 items-center">
            <SearchBar onSearch={handleSearch} disabled={isLoading} />
            <LocationButton onLocate={handleLocate} status={locationStatus} disabled={isLoading} />
          </div>
        </header>

        {error && (
          <div className="w-full max-w-sm bg-red-500/20 border border-red-400/30 rounded-2xl px-4 py-3 text-white text-sm flex items-start gap-2">
            <span>⚠️</span>
            <p className="flex-1">{error}</p>
            <button
              onClick={() => dispatch({ type: 'CLEAR_ERROR' })}
              className="text-white/60 hover:text-white text-lg leading-none ml-1"
              aria-label="닫기"
            >
              ×
            </button>
          </div>
        )}

        {isLoading && (
          <div className="flex-1 flex items-center justify-center">
            <LoadingSpinner message="날씨 정보를 불러오는 중..." />
          </div>
        )}

        {!isLoading && !weather && !error && (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center">
            <span className="text-6xl">🌍</span>
            <p className="text-white/70 text-sm">
              현재 위치를 감지하거나
              <br />
              도시명을 검색해 주세요
            </p>
          </div>
        )}

        {!isLoading && weather && (
          <>
            <WeatherCard data={weather} isDay={isDay} />
            <OutfitCard items={outfit} />
          </>
        )}
      </main>
    </>
  );
}
