'use client';

import { MapPin, Loader2 } from 'lucide-react';

interface Props {
  onLocate: () => void;
  status: 'idle' | 'locating' | 'success' | 'error';
  disabled?: boolean;
}

export default function LocationButton({ onLocate, status, disabled }: Props) {
  const isLocating = status === 'locating';

  return (
    <button
      onClick={onLocate}
      disabled={disabled || isLocating}
      className="flex items-center gap-2 px-4 py-3 rounded-2xl backdrop-blur-md bg-white/15 border border-white/25 text-white hover:bg-white/25 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      aria-label="현재 위치 가져오기"
    >
      {isLocating ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <MapPin size={18} />
      )}
      <span>{isLocating ? '위치 감지 중...' : '현재 위치'}</span>
    </button>
  );
}
