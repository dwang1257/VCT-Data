// ========= components/ComparisonPanel.jsx =========
'use client';
import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { colors } from '@/lib/colors';

export default function ComparisonPanel({p1, setP1, p2, setP2 }) {
  return (
    <div className="p-4 shadow-md" style={{ backgroundColor: colors.white }}>
      <div className="flex flex-wrap gap-4">
        {/** Player 1 name filter **/}
        <InputWithLabel
          label="Player 1 Name"
          value={p1.name}
          placeholder="Search by name..."
          onChange={(val) => setP1({name: val })}
        />
        {/** Player 2 Name filter **/}
        <InputWithLabel
          label="Player 2 Name"
          value={p2.name}
          placeholder="Search by name..."
          onChange={(val) => setP2({name: val })}
        />
      </div>
    </div>
  );
}

function InputWithLabel({ label, value, placeholder, onChange}) {
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


