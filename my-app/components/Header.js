'use client';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { colors } from '@/lib/colors';

export default function Header({ showFilters, toggleFilters, showComparison, toggleComparison }) {
  return (
    <header className="flex justify-between items-center p-4 shadow-md" style={{ backgroundColor: '#fff' }}>
      <h1 className="text-2xl font-bold" style={{ color: colors.secondary }}>VCT 2025 Data</h1>
      <div className="flex gap-4">
        <button
          className="text-white px-4 py-2 rounded"
          style={{ backgroundColor: colors.primary }}
          onClick={toggleFilters}
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
        <button
          className="text-white px-4 py-2 rounded"
          onClick={toggleComparison}
          style={{ backgroundColor: colors.secondary }}
        >
          {showComparison ? 'Hide Comparison' : 'Show Comparison'}
        </button>
      </div>
    </header>
  );
}
