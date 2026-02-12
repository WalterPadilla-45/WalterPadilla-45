'use client';

import React from 'react';
import { cn } from '@/app/user/lib/utils';
import { Check } from 'lucide-react';

interface CalificacionInputProps {
  preguntaId: string;
  value: number | null;
  onChange: (value: number) => void;
  minValor: number;
  maxValor: number;
  error?: string;
}

export function CalificacionInput({
  value,
  onChange,
  minValor,
  maxValor,
  error
}: CalificacionInputProps) {
  const numbers = Array.from({ length: maxValor - minValor + 1 }, (_, i) => i + minValor);

  // Estilo imagen: banda gris, números arriba, círculos en una fila,
  // y "columna" seleccionada resaltada.
  return (
    <div>
      {/* Números arriba */}
      <div className="flex items-end justify-between gap-2 px-2">
        <div className="text-xs font-medium text-[var(--color-gray-700)] w-[120px]">
          {minValor} (Nada Probable)
        </div>

        <div className="flex-1 flex justify-between">
          {numbers.map((n) => (
            <div
              key={n}
              className="w-10 text-center text-sm font-medium text-[var(--color-gray-700)]"
            >
              {n}
            </div>
          ))}
        </div>

        <div className="text-xs font-medium text-[var(--color-gray-700)] w-[120px] text-right">
          {maxValor} (Muy Probable)
        </div>
      </div>

      {/* Banda gris con radios */}
      <div className="mt-2 bg-[var(--color-gray-100)] rounded-md px-2 py-3">
        <div className="flex items-center gap-2">
          {/* Espacio para alinear con labels de arriba */}
          <div className="w-[120px]" />

          <div className="flex-1 flex justify-between">
            {numbers.map((n) => {
              const selected = value === n;

              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => onChange(n)}
                  className={cn(
                    'w-10 h-14 rounded-md flex items-center justify-center transition',
                    selected
                      ? 'border border-[var(--color-gray-900)] bg-[var(--color-gray-200)]'
                      : 'border border-transparent hover:border-[var(--color-gray-300)]'
                  )}
                  aria-label={`Seleccionar ${n}`}
                >
                  <span
                    className={cn(
                      'w-6 h-6 rounded-full border flex items-center justify-center',
                      selected
                        ? 'bg-[var(--color-gray-900)] border-[var(--color-gray-900)]'
                        : 'bg-white border-[var(--color-gray-500)]'
                    )}
                  >
                    {selected && <Check size={16} className="text-white" strokeWidth={3} />}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="w-[120px]" />
        </div>
      </div>

      {error && <p className="mt-2 text-sm text-[var(--color-error)]">{error}</p>}
    </div>
  );
}
