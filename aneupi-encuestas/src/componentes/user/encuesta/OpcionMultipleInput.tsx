'use client';

import React from 'react';
import { Opcion } from '@/app/user/lib/types';
import { cn } from '@/app/user/lib/utils';
import { Check } from 'lucide-react';

interface OpcionMultipleInputProps {
  preguntaId: string;
  opciones: Opcion[];
  value: string | string[];              // <-- ahora acepta string o string[]
  onChange: (value: any) => void;        // <-- soporta radio o checkbox
  error?: string;
}

export function OpcionMultipleInput({
  preguntaId,
  opciones,
  value,
  onChange,
  error
}: OpcionMultipleInputProps) {
  const isCheckbox = Array.isArray(value);

  const isChecked = (id: string) => {
    return isCheckbox ? (value as string[]).includes(id) : value === id;
  };

  const toggle = (id: string) => {
    if (!isCheckbox) return onChange(id);

    const arr = value as string[];
    if (arr.includes(id)) onChange(arr.filter((x) => x !== id));
    else onChange([...arr, id]);
  };

  return (
    <div className="space-y-3">
      {opciones.map((opcion) => {
        const checked = isChecked(opcion.id);

        return (
          <label
            key={opcion.id}
            className={cn(
              'flex items-center gap-3 px-3 py-3 rounded-md border cursor-pointer transition',
              checked
                ? 'bg-[var(--color-gray-100)] border-[var(--color-gray-900)]'
                : 'bg-white border-[var(--border-color)] hover:bg-[var(--color-gray-50)]'
            )}
          >
            {/* input real oculto (accesibilidad) */}
            <input
              type={isCheckbox ? 'checkbox' : 'radio'}
              name={`pregunta-${preguntaId}`}
              value={opcion.id}
              checked={checked}
              onChange={() => toggle(opcion.id)}
              className="sr-only"
            />

            {/* círculo/cuadro visual con check (como imagen) */}
            <span
              className={cn(
                isCheckbox ? 'w-5 h-5 rounded-sm' : 'w-5 h-5 rounded-full',
                'border flex items-center justify-center shrink-0',
                checked
                  ? 'bg-[var(--color-gray-900)] border-[var(--color-gray-900)]'
                  : 'bg-white border-[var(--color-gray-500)]'
              )}
              aria-hidden="true"
            >
              {checked && <Check size={14} className="text-white" strokeWidth={3} />}
            </span>

            <span className="text-[var(--color-gray-800)] flex-1">
              {opcion.texto}
            </span>
          </label>
        );
      })}

      {error && <p className="mt-2 text-sm text-[var(--color-error)]">{error}</p>}
    </div>
  );
}

