import { NextRequest, NextResponse } from 'next/server';
import type { WeatherData } from '@/types/weather';

const OWM_BASE = 'https://api.openweathermap.org';

export async function GET(request: NextRequest) {
  const key = process.env.OPENWEATHERMAP_API_KEY;
  if (!key) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  const { searchParams } = request.nextUrl;
  const city = searchParams.get('city');
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  let resolvedLat: number;
  let resolvedLon: number;
  let resolvedCity: string;
  let resolvedCountry: string;

  try {
    if (city) {
      const geoRes = await fetch(
        `${OWM_BASE}/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${key}`
      );
      if (!geoRes.ok) {
        return NextResponse.json({ error: '도시를 찾을 수 없어요' }, { status: 502 });
      }
      const geoData = await geoRes.json();
      if (!geoData.length) {
        return NextResponse.json({ error: `"${city}" 도시를 찾을 수 없어요` }, { status: 404 });
      }
      resolvedLat = geoData[0].lat;
      resolvedLon = geoData[0].lon;
      resolvedCity = geoData[0].local_names?.ko ?? geoData[0].name;
      resolvedCountry = geoData[0].country;
    } else if (lat && lon) {
      resolvedLat = parseFloat(lat);
      resolvedLon = parseFloat(lon);
      if (isNaN(resolvedLat) || isNaN(resolvedLon)) {
        return NextResponse.json({ error: '잘못된 좌표값이에요' }, { status: 400 });
      }
      const [geoRes, _] = await Promise.all([
        fetch(`${OWM_BASE}/geo/1.0/reverse?lat=${resolvedLat}&lon=${resolvedLon}&limit=1&appid=${key}`),
        Promise.resolve(null),
      ]);
      if (!geoRes.ok) {
        return NextResponse.json({ error: '위치 정보를 가져올 수 없어요' }, { status: 502 });
      }
      const geoData = await geoRes.json();
      resolvedCity = geoData[0]?.local_names?.ko ?? geoData[0]?.name ?? '알 수 없는 위치';
      resolvedCountry = geoData[0]?.country ?? '';
    } else {
      return NextResponse.json(
        { error: 'city 또는 lat/lon 파라미터가 필요해요' },
        { status: 400 }
      );
    }

    const weatherRes = await fetch(
      `${OWM_BASE}/data/2.5/weather?lat=${resolvedLat}&lon=${resolvedLon}&units=metric&appid=${key}`
    );
    if (!weatherRes.ok) {
      return NextResponse.json({ error: '날씨 정보를 가져올 수 없어요' }, { status: 502 });
    }
    const raw = await weatherRes.json();

    const data: WeatherData = {
      city: resolvedCity,
      country: resolvedCountry,
      temp: raw.main.temp,
      feelsLike: raw.main.feels_like,
      humidity: raw.main.humidity,
      windSpeed: raw.wind.speed,
      pressure: raw.main.pressure,
      condition: raw.weather[0].main,
      description: raw.weather[0].description,
      icon: raw.weather[0].icon,
      sunrise: raw.sys.sunrise,
      sunset: raw.sys.sunset,
      lat: raw.coord.lat,
      lon: raw.coord.lon,
    };

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: '서버 오류가 발생했어요' }, { status: 500 });
  }
}
