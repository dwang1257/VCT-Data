'use client';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { colors } from '@/lib/colors';

export default function Header({ showFilters, toggleFilters }) {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center" style={{ backgroundColor: colors.secondary }}>
      <h1 className="text-3xl font-bold text-white">
        VALORANT<span style={{ color: colors.primary }}> PLAYER STATS</span>
      </h1>
      <button
        onClick={toggleFilters}
        className="flex items-center px-4 py-2 rounded"
        style={{ backgroundColor: colors.primary, color: colors.white }}
      >
        Filters {showFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
    </header>
  );
 }