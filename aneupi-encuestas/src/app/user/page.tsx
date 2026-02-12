'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Lock } from 'lucide-react';
import { mockEncuestas } from './lib/mocks';
import { CategoriaEncuesta, EstadoEncuesta } from './lib/types';

// Helper to get background image based on category
const getBackgroundImage = (categoria: CategoriaEncuesta) => {
  switch (categoria) {
    case CategoriaEncuesta.RRHH:
      return 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdSAkxBqbBCZTWHfGo8SAydLx_aLLqZWdzkoFD0TZJyTMKen5rGvdU7gVdRVoD44JQMdNDVrXaZML_by_MPIqGdkAFN4X4O7vV8wUzn1ukwLXy6tAIOJBYoe4kIrgKQMs1uINAHfGprQLRwpuEIciJNZvNO_RxJJBi2cv3wFN53XyJaR-LTGGsqOaM6ojiVdSBZgAMP3Sq1X1oAp3XgO4UoMueGtBgY9hV7jKh-zCUvikrHI_o6j5KyuVOUNMD9Jg1zF609LeQCqI';
    case CategoriaEncuesta.FINANCIERA:
      return 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCH-AH7k8tkcSBhJDS78MY0afpzd8Z9j2T_exo789Y6teSl1bBuYp0pdBxyFoAAN8-HRWMF1nTdug_tgo4MSZ6lmNVd6HJ9Y0NJuRbsyxTkylebWsU_WoKgA1w6P3nnGbgDLa3IiyXt4GXB3B_WawMv5b7Nk4kfAq-hDKrlbK188d0Xjgn6AlJ9XwWdEOCF4rc7prkUJL_8sCe-ZvvPDIHohnLg6Dj4jqmY1bkuxTNnY_5O5vIZIDIKEpDHJTYmKAtYxP6Cl0LiNU';
    case CategoriaEncuesta.GOBIERNO_CORPORATIVO:
      return 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc4Npz9SSdA9CWNzS33idQRPefLdZLc__aLXjhOIJ_PRV9yH6CosKXZfYmK38LhE2UGcUEBH9oL2bvBCqw1Q8QGnRBEoo6sRN33totr76ooXH894Plz0hRGCTGrzTD_LT9ynSIx-iynRyd05d24uZylZPvz7F5F2oagCuNp0N-97qgngyJ0K7zTCDu2eKcZ_duWMXlMjlfqiyjjcWcCScBb5cZ9GXZyo9hh5wvsef__IJ-EEBU0SGcsu_rDrqqBZ1iBCYiEoPhDYY';
    case CategoriaEncuesta.OPERACIONES:
      return 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDvp4_28bU7i6hjRWSeIWJNRKiQ0OjM5AVSKvJftksxPKQ6_tVJR6hLfYLsk91LO5m9lGWIFS384x2tlbnpWP4Cs-rOr_BRYfuL5oo6iK864tGVVkid0s__8m2aWZwmJrAlTaDugZCR5WizujlmyHCDTn_hzui3ZqU-Xjry1xYDcKwc9klH9_YxfmREsPDENXoOrelMVJekDYCNd5y1rf33g2lhn8ShO7bXaM8CvonzF4XsfAezeyZMh2qi2TiYjIv2VuHvGMGkqg';
    case CategoriaEncuesta.ESTRATEGIA:
      return 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPofZvzFOfLsjSqt_VU_WvxdQowQOE3OZmCtAAYYmO05axvWPRcJeIQXh5NQb0aDAscsVtlLsyLBIABE1w2Gh8oC7WHtjGpSBJeotdTDsnuyE4VF2Sdihyvh041fc3O1XubHR0c2yx-z70zdCU1pIM4yDU-Kaie38Je7FrKJimR9PDU0RbIO9Ie6HkLxMhSkXb7PhJnACzXQTXTZWl9QCoF3Rrx5SmIpTG04Q80hMxwr4IkDhQHT5I_--sStLlq43SPY3Y-kKgE74';
    default:
      return 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdSAkxBqbBCZTWHfGo8SAydLx_aLLqZWdzkoFD0TZJyTMKen5rGvdU7gVdRVoD44JQMdNDVrXaZML_by_MPIqGdkAFN4X4O7vV8wUzn1ukwLXy6tAIOJBYoe4kIrgKQMs1uINAHfGprQLRwpuEIciJNZvNO_RxJJBi2cv3wFN53XyJaR-LTGGsqOaM6ojiVdSBZgAMP3Sq1X1oAp3XgO4UoMueGtBgY9hV7jKh-zCUvikrHI_o6j5KyuVOUNMD9Jg1zF609LeQCqI';
  }
};

const getDaysRemaining = (fechaFin: Date | null) => {
  if (!fechaFin) return 'Sin fecha límite';
  const now = new Date();
  const diffTime = Math.abs(fechaFin.getTime() - now.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return `Expira en ${diffDays} días`;
};

export default function UserHomePage() {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedState, setSelectedState] = useState('');

  const [filters, setFilters] = useState({
    search: '',
    category: '',
    state: ''
  });

  const handleFilter = () => {
    setFilters({
      search: searchText,
      category: selectedCategory,
      state: selectedState
    });
  };

  const encuestasFiltradas = useMemo(() => {
    return mockEncuestas.filter((encuesta) => {
      if (filters.search && !encuesta.titulo.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      if (filters.category && encuesta.categoria !== filters.category) {
        return false;
      }
      if (filters.state && encuesta.estado !== filters.state) {
        return false;
      }
      return true;
    });
  }, [filters]);

  return (
    <main className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col px-6 py-12">
      {/* Hero Title Section */}
      <div className="mb-12 flex flex-col gap-4 border-l-4 border-[#eab356] pl-6">
        <h2 className="text-4xl font-black tracking-tight text-[#004563]">Encuestas Disponibles</h2>
        <p className="max-w-2xl text-lg text-slate-600">
          Su opinión es fundamental para fortalecer nuestros procesos financieros y mejorar la calidad de atención.
          Participe en nuestras consultas institucionales activas.
        </p>
      </div>

      {/* Filter Section */}
      <div className="mb-10 flex flex-col items-center gap-4 rounded-2xl bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:flex-row border border-slate-100/50">
        <div className="relative w-full lg:flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
          <input
            className="w-full rounded-xl border-slate-200 bg-slate-50/50 py-3 pl-12 text-sm font-medium transition-all focus:border-[#004563] focus:bg-white focus:ring-1 focus:ring-[#004563] placeholder:text-slate-400"
            placeholder="Buscar encuesta por título..."
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <select
            className="w-full rounded-xl border-slate-200 bg-slate-50/50 py-3 text-sm font-medium focus:border-[#004563] focus:bg-white focus:ring-1 focus:ring-[#004563] sm:w-40"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Todas las Categorías</option>
            {Object.values(CategoriaEncuesta).map((cat) => (
              <option key={cat} value={cat}>
                {cat.replace('_', ' ')}
              </option>
            ))}
          </select>

          <select
            className="w-full rounded-xl border-slate-200 bg-slate-50/50 py-3 text-sm font-medium focus:border-[#004563] focus:bg-white focus:ring-1 focus:ring-[#004563] sm:w-40"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="">Todos los Estados</option>
            {Object.values(EstadoEncuesta).map((est) => (
              <option key={est} value={est}>
                {est}
              </option>
            ))}
          </select>

          <button
            onClick={handleFilter}
            className="rounded-xl bg-[#004563] px-8 py-3 text-sm font-bold text-white shadow-lg shadow-[#004563]/20 transition-all hover:shadow-[#004563]/40 hover:-translate-y-0.5"
          >
            Filtrar
          </button>
        </div>
      </div>

      {/* Surveys Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {encuestasFiltradas.map((encuesta) => {
          const vencida = encuesta.fechaFin && new Date(encuesta.fechaFin) < new Date();

          return (
            <div
              key={encuesta.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-[#eab356]/50 hover:shadow-md"
            >
              <div className="h-28 w-full bg-slate-100">
                <div
                  className="h-full w-full bg-cover bg-center opacity-80"
                  style={{ backgroundImage: `url('${getBackgroundImage(encuesta.categoria)}')` }}
                />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-[#eab356]">
                    {encuesta.categoria.replace('_', ' ')}
                  </span>
                  <span
                    className={`text-[10px] font-medium ${
                      vencida ? 'text-red-500' : 'text-slate-400'
                    }`}
                  >
                    {getDaysRemaining(encuesta.fechaFin)}
                  </span>
                </div>

                <h3 className="mb-2 text-base font-bold text-[#004563] line-clamp-1">{encuesta.titulo}</h3>

                <p className="mb-5 flex-1 text-xs leading-relaxed text-slate-500 line-clamp-3">
                  {encuesta.descripcion || 'Sin descripción disponible.'}
                </p>

                {/* ✅ Botón con navegación */}
                {vencida ? (
                  <button
                    type="button"
                    disabled
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-300 py-2.5 text-xs font-bold text-white cursor-not-allowed"
                  >
                    Encuesta vencida
                  </button>
                ) : (
                  <Link href={`/user/encuesta/${encuesta.slug}`} className="w-full">
                    <button
                      type="button"
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#004563] py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#00364d]"
                    >
                      Responder Encuesta
                    </button>
                  </Link>
                )}
              </div>
            </div>
          );
        })}

        {/* Empty State / Coming Soon Card */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-6 text-center min-h-[300px]">
          <Lock className="mb-3 h-8 w-8 text-slate-300" />
          <h3 className="mb-1 text-sm font-bold text-slate-400">Próximamente</h3>
          <p className="text-[11px] text-slate-400">Estamos preparando nuevas consultas institucionales.</p>
        </div>
      </div>
    </main>
  );
}
