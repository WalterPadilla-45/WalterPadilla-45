'use client';

import { Filter, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/componentes/user/ui/Button';

interface DashboardFiltersProps {
  onFilterChange: (type: string, value: string) => void;
  activeFilters: { pais: string; ciudad: string; periodo: string };
}

export function DashboardFilters({ onFilterChange, activeFilters }: DashboardFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-wrap gap-4 items-center justify-between">
      
      <div className="flex items-center gap-2 text-[#004563] font-semibold">
        <Filter size={20} />
        <span>Segmentación:</span>
      </div>

      <div className="flex gap-3">
        {/* Simulación de Segmentadores de Excel */}
        <select 
          className="bg-gray-50 border-none text-sm font-medium p-2 rounded-lg text-gray-600 focus:ring-2 focus:ring-[#eab356]"
          onChange={(e) => onFilterChange('pais', e.target.value)}
          value={activeFilters.pais}
        >
          <option value="all">🌎 Todos los Países</option>
          <option value="EC">Ecuador</option>
          <option value="MX">México</option>
          <option value="ES">España</option>
        </select>

        <select 
          className="bg-gray-50 border-none text-sm font-medium p-2 rounded-lg text-gray-600 focus:ring-2 focus:ring-[#eab356]"
          onChange={(e) => onFilterChange('ciudad', e.target.value)}
          value={activeFilters.ciudad}
        >
          <option value="all">📍 Todas las Ciudades</option>
          <option value="Quito">Quito</option>
          <option value="Guayaquil">Guayaquil</option>
          <option value="Madrid">Madrid</option>
        </select>

        <select 
          className="bg-gray-50 border-none text-sm font-medium p-2 rounded-lg text-gray-600 focus:ring-2 focus:ring-[#eab356]"
          onChange={(e) => onFilterChange('periodo', e.target.value)}
          value={activeFilters.periodo}
        >
          <option value="all">📅 Todo el Periodo</option>
          <option value="2026-Q1">Q1 2026</option>
          <option value="2025-Q4">Q4 2025</option>
        </select>
      </div>

      <div className="text-xs text-gray-400">
        *Filtros dinámicos activos
      </div>
    </div>
  );
}