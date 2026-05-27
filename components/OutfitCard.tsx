import type { OutfitItem } from '@/types/outfit';
import { CATEGORY_LABELS } from '@/lib/outfit';

interface Props {
  items: OutfitItem[];
}

const CATEGORY_ORDER: OutfitItem['category'][] = ['base', 'outer', 'accessory', 'tip'];

export default function OutfitCard({ items }: Props) {
  const grouped = CATEGORY_ORDER.reduce<Record<string, OutfitItem[]>>((acc, cat) => {
    const filtered = items.filter((i) => i.category === cat);
    if (filtered.length) acc[cat] = filtered;
    return acc;
  }, {});

  return (
    <div className="w-full max-w-sm backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <span>👗</span> 오늘의 코디 추천
      </h2>

      <div className="flex flex-col gap-4">
        {CATEGORY_ORDER.map((cat) => {
          const group = grouped[cat];
          if (!group) return null;
          return (
            <div key={cat}>
              <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-2">
                {CATEGORY_LABELS[cat]}
              </p>
              <div className="flex flex-col gap-1">
                {group.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-3 py-2 px-3 rounded-xl ${
                      item.category === 'tip'
                        ? 'bg-yellow-400/20 border border-yellow-400/30'
                        : 'bg-white/5'
                    }`}
                  >
                    <span className="text-xl leading-none">{item.emoji}</span>
                    <span className="text-white/90 text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
