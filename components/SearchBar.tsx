'use client';

import { useState, FormEvent } from 'react';
import { Search } from 'lucide-react';

interface Props {
  onSearch: (city: string) => void;
  disabled?: boolean;
}

export default function SearchBar({ onSearch, disabled }: Props) {
  const [value, setValue] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) {
      onSearch(trimmed);
      setValue('');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-sm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="도시명 검색 (예: Seoul)"
        disabled={disabled}
        className="flex-1 px-4 py-3 rounded-2xl backdrop-blur-md bg-white/15 border border-white/25 text-white placeholder-white/50 outline-none focus:border-white/50 transition-colors text-sm disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="p-3 rounded-2xl backdrop-blur-md bg-white/15 border border-white/25 text-white hover:bg-white/25 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="검색"
      >
        <Search size={20} />
      </button>
    </form>
  );
}
