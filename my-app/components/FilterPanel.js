// ========= components/FilterPanel.jsx =========
'use client';
import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { colors } from '@/lib/colors';

export default function FilterPanel({ visible, filter, setFilter, playerToDelete, setPlayerToDelete, onDelete }) {
  if (!visible) return null;
  return (
    <div className="p-4 shadow-md" style={{ backgroundColor: colors.white }}>
      <div className="flex flex-wrap gap-4">
        {/** Player name filter **/}
        <InputWithLabel
          label="Player Name"
          value={filter.name}
          placeholder="Search by name..."
          onChange={(val) => setFilter({ ...filter, name: val })}
          icon={<Search size={16} className="absolute left-2 top-3" style={{ color: colors.secondary }} />}
        />
        {/** Team filter **/}
        <InputWithLabel
          label="Team"
          value={filter.team}
          placeholder="Filter by team..."
          onChange={(val) => setFilter({ ...filter, team: val })}
        />
        {/** Delete player **/}
        <div className="flex-1 min-w-64">
          <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>Delete Player</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={playerToDelete}
              onChange={(e) => setPlayerToDelete(e.target.value)}
              className="flex-1 p-2 border rounded text-black"
              placeholder="Enter player name..."
              style={{ borderColor: colors.secondary }}
            />
            <button
              onClick={onDelete}
              className="px-3 py-2 rounded disabled:opacity-50"
              style={{ backgroundColor: colors.primary, color: colors.white }}
              disabled={!playerToDelete}
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputWithLabel({ label, value, placeholder, onChange, icon }) {
  return (
    <div className="flex-1 min-w-64 relative">
      <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 pl-8 border rounded text-black"
        placeholder={placeholder}
        style={{ borderColor: colors.secondary }}
      />
    </div>
  );
}
