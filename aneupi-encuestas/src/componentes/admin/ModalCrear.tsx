"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Calendar, Clock } from 'lucide-react'; // Agregamos icono de reloj

interface Props {
  cerrar: () => void;
}

export const ModalCrear = ({ cerrar }: Props) => {
  const router = useRouter();
  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  const continuarAlConstructor = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
        titulo: nuevoTitulo,
        inicio: fechaInicio,
        fin: fechaFin
    });
    
    cerrar();
    router.push(`/admin/crear?${params.toString()}`);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            
            {/* Cabecera Modal */}
            <div className="bg-[#004563] p-6 flex justify-between items-center">
                <h2 className="text-xl font-bold !text-white">Nueva Encuesta</h2>
                <button onClick={cerrar} className="text-white/70 hover:text-white transition-colors">
                    <X size={24} />
                </button>
            </div>

            {/* Formulario */}
            <form onSubmit={continuarAlConstructor} className="p-6 space-y-6">
                
                {/* CAMPO 1: TÍTULO */}
                <div>
                    <label className="block text-sm font-bold text-[#004563] mb-2">Nombre de la Encuesta</label>
                    <input 
                        type="text" 
                        required
                        placeholder="Ej: Encuesta de Clima Laboral 2026"
                        value={nuevoTitulo}
                        onChange={(e) => setNuevoTitulo(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#eab356] focus:border-transparent outline-none text-[#004563] font-medium placeholder-gray-500 bg-white"
                    />
                </div>

                {/* CAMPO 2: FECHAS Y HORAS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-[#004563] mb-2">Inicio (Fecha y Hora)</label>
                        <div className="relative">
                            <Clock size={18} className="absolute left-3 top-3.5 text-gray-500 pointer-events-none" />
                            <input 
                                type="datetime-local"  // <--- CAMBIO AQUÍ
                                required
                                value={fechaInicio}
                                onChange={(e) => setFechaInicio(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#eab356] outline-none text-[#004563] font-medium bg-white text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-[#004563] mb-2">Fin (Fecha y Hora)</label>
                        <div className="relative">
                            <Clock size={18} className="absolute left-3 top-3.5 text-gray-500 pointer-events-none" />
                            <input 
                                type="datetime-local" // <--- CAMBIO AQUÍ
                                required
                                value={fechaFin}
                                onChange={(e) => setFechaFin(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#eab356] outline-none text-[#004563] font-medium bg-white text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* BOTONES */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <button 
                        type="button"
                        onClick={cerrar}
                        className="px-5 py-2.5 text-gray-600 font-bold hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Cancelar
                    </button>
                    <button 
                        type="submit"
                        className="px-6 py-2.5 bg-[#eab356] text-[#004563] font-bold rounded-lg hover:bg-[#d9a54a] shadow-md transition-colors"
                    >
                        Continuar
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
};