'use client';

import React from 'react';
import { Pregunta, TipoPregunta } from '@/app/user/lib/types';
import { OpcionMultipleInput } from './OpcionMultipleInput';
import { TextoAbiertoInput } from './TextoAbiertoInput';
import { CalificacionInput } from './CalificacionInput';

interface PreguntaRendererProps {
  pregunta: Pregunta;
  value: any; // string | string[] | number | null
  onChange: (value: any) => void;
  error?: string;
}

export function PreguntaRenderer({ pregunta, value, onChange, error }: PreguntaRendererProps) {
  // Ayuda: si value es array => checkbox (selección múltiple)
  // si value es string => radio (selección única)
  const valueForOpciones = Array.isArray(value) ? (value as string[]) : (value ?? '');

  // Defaults para escala tipo imagen: 0–10
  const min = pregunta.minValor ?? 0;
  const max = pregunta.maxValor ?? 10;

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-2">
        <span className="text-lg font-medium text-[var(--color-bankBlue)]">
          {pregunta.texto}
        </span>
        {pregunta.obligatoria && (
          <span className="text-[var(--color-error)]" title="Campo obligatorio">
            *
          </span>
        )}
      </div>

      {pregunta.tipo === TipoPregunta.OPCION_MULTIPLE && (
        <OpcionMultipleInput
          preguntaId={pregunta.id}
          opciones={pregunta.opciones || []}
          // ✅ puede ser string (radio) o string[] (checkbox)
          value={valueForOpciones}
          onChange={onChange}
          error={error}
        />
      )}

      {pregunta.tipo === TipoPregunta.TEXTO_ABIERTO && (
        <TextoAbiertoInput
          preguntaId={pregunta.id}
          value={typeof value === 'string' ? value : ''}
          onChange={onChange}
          error={error}
        />
      )}

      {pregunta.tipo === TipoPregunta.CALIFICACION && (
        <CalificacionInput
          preguntaId={pregunta.id}
          value={typeof value === 'number' ? value : value ?? null}
          // ✅ Asegura que CalificacionInput reciba number
          onChange={(v: number) => onChange(v)}
          minValor={min}
          maxValor={max}
          error={error}
        />
      )}
    </div>
  );
}
