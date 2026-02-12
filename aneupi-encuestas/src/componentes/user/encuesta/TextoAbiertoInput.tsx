'use client';

import React from 'react';
import { Textarea } from '@/componentes/user/ui/Input';

interface TextoAbiertoInputProps {
  preguntaId: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

export function TextoAbiertoInput({
  preguntaId,
  value,
  onChange,
  placeholder = 'Escribe tu respuesta aquí...',
  error
}: TextoAbiertoInputProps) {
  return (
    <Textarea
      id={`pregunta-${preguntaId}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      error={error}
      rows={4}
    />
  );
}
