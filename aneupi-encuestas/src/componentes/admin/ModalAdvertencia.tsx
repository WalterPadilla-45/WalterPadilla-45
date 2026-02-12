"use client";

import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  abierto: boolean;
  alCancelar: () => void;      // Quedarse en la página
  alConfirmarSalir: () => void; // Salir y perder cambios
}

export const ModalAdvertencia = ({ abierto, alCancelar, alConfirmarSalir }: Props) => {
  if (!abierto) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border-t-8 border-[#eab356]">
        
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-yellow-50 text-[#eab356] rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={32} />
          </div>
          
          <h2 className="text-xl font-bold text-[#004563] mb-2">¿Estás seguro de salir?</h2>
          <p className="text-gray-500 mb-6">
            Tienes cambios sin guardar en tu encuesta. Si sales ahora, 
            <span className="font-bold text-red-500"> perderás todo el progreso.</span>
          </p>

          <div className="flex gap-3 justify-center">
            <button 
              onClick={alCancelar}
              className="px-5 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors"
            >
              Quedarse
            </button>
            <button 
              onClick={alConfirmarSalir}
              className="px-5 py-2.5 bg-red-50 text-red-600 font-bold rounded-lg hover:bg-red-100 border border-red-200 transition-colors"
            >
              Salir sin guardar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};