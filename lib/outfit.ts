import type { OutfitItem } from '@/types/outfit';
import type { WeatherData } from '@/types/weather';

const FREEZING: OutfitItem[] = [
  { id: 'thermal', label: '기모 이너', emoji: '👕', category: 'base' },
  { id: 'heavy-knit', label: '두꺼운 니트', emoji: '🧶', category: 'base' },
  { id: 'padding', label: '두꺼운 패딩', emoji: '🧥', category: 'outer' },
  { id: 'winter-boots', label: '방한 부츠', emoji: '👢', category: 'accessory' },
  { id: 'gloves', label: '장갑', emoji: '🧤', category: 'accessory' },
  { id: 'scarf', label: '머플러', emoji: '🧣', category: 'accessory' },
  { id: 'beanie', label: '털모자', emoji: '🎩', category: 'accessory' },
];

const VERY_COLD: OutfitItem[] = [
  { id: 'thermal', label: '기모 이너', emoji: '👕', category: 'base' },
  { id: 'knit', label: '니트', emoji: '🧶', category: 'base' },
  { id: 'winter-coat', label: '겨울 코트', emoji: '🧥', category: 'outer' },
  { id: 'gloves', label: '장갑', emoji: '🧤', category: 'accessory' },
  { id: 'scarf', label: '머플러', emoji: '🧣', category: 'accessory' },
];

const COLD: OutfitItem[] = [
  { id: 'longsleeve', label: '긴팔 티셔츠', emoji: '👕', category: 'base' },
  { id: 'hoodie', label: '가디건 / 후드', emoji: '🧥', category: 'base' },
  { id: 'mid-jacket', label: '미들 재킷', emoji: '🥼', category: 'outer' },
  { id: 'jeans', label: '청바지', emoji: '👖', category: 'base' },
];

const COOL: OutfitItem[] = [
  { id: 'longsleeve', label: '긴팔 티셔츠', emoji: '👕', category: 'base' },
  { id: 'light-jacket', label: '가벼운 자켓', emoji: '🧥', category: 'outer' },
  { id: 'trousers', label: '긴 바지', emoji: '👖', category: 'base' },
];

const MILD: OutfitItem[] = [
  { id: 'tshirt', label: '티셔츠', emoji: '👕', category: 'base' },
  { id: 'cardigan-opt', label: '얇은 가디건 (선택)', emoji: '🧥', category: 'outer' },
  { id: 'jeans', label: '청바지', emoji: '👖', category: 'base' },
];

const WARM: OutfitItem[] = [
  { id: 'tshirt', label: '반팔 티셔츠', emoji: '👕', category: 'base' },
  { id: 'light-pants', label: '얇은 면바지 / 청바지', emoji: '👖', category: 'base' },
  { id: 'sneakers', label: '운동화', emoji: '👟', category: 'accessory' },
];

const HOT: OutfitItem[] = [
  { id: 'tshirt', label: '반팔 티셔츠', emoji: '👕', category: 'base' },
  { id: 'shorts', label: '반바지', emoji: '🩳', category: 'base' },
  { id: 'sandals', label: '샌들', emoji: '🩴', category: 'accessory' },
];

const VERY_HOT: OutfitItem[] = [
  { id: 'tanktop', label: '민소매 / 반팔', emoji: '👕', category: 'base' },
  { id: 'shorts', label: '반바지', emoji: '🩳', category: 'base' },
  { id: 'sandals', label: '샌들', emoji: '🩴', category: 'accessory' },
];

const RAIN_MOD: OutfitItem[] = [
  { id: 'umbrella', label: '우산', emoji: '☂️', category: 'accessory' },
  { id: 'raincoat', label: '방수 외투', emoji: '🧥', category: 'outer' },
  { id: 'waterproof-shoes', label: '방수 신발', emoji: '👟', category: 'accessory' },
];

const STORM_MOD: OutfitItem[] = [
  { id: 'heavy-raincoat', label: '무거운 우비', emoji: '🧥', category: 'outer' },
  { id: 'waterproof-boots', label: '방수 부츠', emoji: '👢', category: 'accessory' },
  { id: 'storm-tip', label: '가능하면 외출을 자제하세요', emoji: '⚠️', category: 'tip' },
];

const SNOW_MOD: OutfitItem[] = [
  { id: 'waterproof-boots', label: '방수 부츠', emoji: '👢', category: 'accessory' },
  { id: 'waterproof-gloves', label: '방수 장갑', emoji: '🧤', category: 'accessory' },
  { id: 'extra-layer', label: '추가 보온 레이어', emoji: '🧣', category: 'outer' },
];

const WIND_MOD: OutfitItem[] = [
  { id: 'windbreaker', label: '바람막이', emoji: '🌬️', category: 'outer' },
];

const SUNNY_HOT_MOD: OutfitItem[] = [
  { id: 'cap', label: '모자', emoji: '🧢', category: 'accessory' },
  { id: 'sunglasses', label: '선글라스', emoji: '🕶️', category: 'accessory' },
  { id: 'sunscreen', label: '선크림 필수', emoji: '🧴', category: 'tip' },
];

const SUNGLASSES: OutfitItem = {
  id: 'sunglasses',
  label: '선글라스',
  emoji: '🕶️',
  category: 'accessory',
};

function dedupe(items: OutfitItem[]): OutfitItem[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

export function getOutfitRecommendations(weather: WeatherData): OutfitItem[] {
  const { temp, condition, windSpeed } = weather;
  const windKmh = windSpeed * 3.6;
  const items: OutfitItem[] = [];

  if (temp < 0) items.push(...FREEZING);
  else if (temp < 5) items.push(...VERY_COLD);
  else if (temp < 10) items.push(...COLD);
  else if (temp < 15) items.push(...COOL);
  else if (temp < 20) items.push(...MILD);
  else if (temp < 25) items.push(...WARM);
  else if (temp < 30) items.push(...HOT);
  else items.push(...VERY_HOT);

  if (condition === 'Rain' || condition === 'Drizzle') items.push(...RAIN_MOD);
  if (condition === 'Thunderstorm') items.push(...STORM_MOD);
  if (condition === 'Snow') items.push(...SNOW_MOD);
  if (windKmh > 30) items.push(...WIND_MOD);
  if (condition === 'Clear' && temp > 25) items.push(...SUNNY_HOT_MOD);
  else if (condition === 'Clear') items.push(SUNGLASSES);

  return dedupe(items);
}

export const CATEGORY_LABELS: Record<OutfitItem['category'], string> = {
  base: '베이스 레이어',
  outer: '아우터',
  accessory: '액세서리',
  tip: '주의사항',
};
