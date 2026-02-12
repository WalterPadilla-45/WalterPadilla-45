'use client';

import { Calendar } from 'lucide-react';
import { useState } from 'react';

export function DateRangePicker() {
  const [dates, setDates] = useState({ start: '', end: '' });

  return (
    <div className="flex items-center gap-2 bg-white p-2 rounded-xl card-shadow border border-gray-100">
      <div className="p-2 bg-gray-50 rounded-lg text-[#0F3D5E]">
        <Calendar size={18} />
      </div>

      <div className="flex items-center gap-2">
        <div className="relative group">
          <span className="text-xs text-gray-400 absolute -top-2 left-1 bg-white px-1">Desde</span>
          <input
            type="date"
            className="text-sm font-semibold text-gray-700 bg-transparent outline-none border-b border-transparent focus:border-[#D4AF37] transition-colors py-1"
            onChange={(e) => setDates({ ...dates, start: e.target.value })}
          />
        </div>
        <span className="text-gray-300">-</span>
        <div className="relative group">
          <span className="text-xs text-gray-400 absolute -top-2 left-1 bg-white px-1">Hasta</span>
          <input
            type="date"
            className="text-sm font-semibold text-gray-700 bg-transparent outline-none border-b border-transparent focus:border-[#D4AF37] transition-colors py-1"
            onChange={(e) => setDates({ ...dates, end: e.target.value })}
          />
        </div>
      </div>

      <button className="ml-2 bg-[#0F3D5E] text-white text-xs px-3 py-2 rounded-lg hover:bg-[#0A2D45] transition-colors">
        Filtrar
      </button>
    </div>
  );
}