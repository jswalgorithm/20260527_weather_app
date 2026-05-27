'use client';

import { useMemo } from 'react';
import { getGradientStyle } from '@/lib/weatherGradients';

interface Props {
  condition: string;
  isDay: boolean;
}

export default function GradientBackground({ condition, isDay }: Props) {
  const gradient = useMemo(() => getGradientStyle(condition, isDay), [condition, isDay]);

  return (
    <div
      className={`fixed inset-0 -z-10 bg-gradient-to-br ${gradient} transition-all duration-1000`}
    >
      <div className="absolute inset-0 bg-shimmer opacity-20 animate-shimmer" />
    </div>
  );
}
