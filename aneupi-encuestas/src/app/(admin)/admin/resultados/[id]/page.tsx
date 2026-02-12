"use client";

import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Download, Calendar, Users, 
  MessageSquare, Star, PieChart as PieIcon, Activity
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';

// --- COLORES CORPORATIVOS ---
const COLORS = ['#004563', '#eab356', '#2a9d8f', '#e76f51', '#264653'];

// --- DATOS MOCK (Simulación) ---
const datosEncuesta = {
  id: 102,
  titulo: "Satisfacción Clientes 2026",
  estado: "ACTIVA",
  totalVotos: 142,
  fechaInicio: "05 Feb 2026",
  fechaFin: "28 Feb 2026",
  
  preguntas: [
    {
      id: "p1",
      texto: "¿Cómo calificaría su experiencia general?",
      tipo: "CALIFICACION", 
      promedio: 4.2,
      datos: [
        { name: '1 Estrella', valor: 5 },
        { name: '2 Estrellas', valor: 10 },
        { name: '3 Estrellas', valor: 20 },
        { name: '4 Estrellas', valor: 45 },
        { name: '5 Estrellas', valor: 62 },
      ]
    },
    {
      id: "p2",
      texto: "¿Qué servicio utiliza con más frecuencia?",
      tipo: "OPCION_MULTIPLE", 
      datos: [
        { name: 'Banca Móvil', valor: 80 },
        { name: 'Cajeros', valor: 30 },
        { name: 'Ventanilla', valor: 15 },
        { name: 'Web', valor: 17 },
      ]
    },
    {
      id: "p3",
      texto: "¿Tiene alguna sugerencia adicional?",
      tipo: "TEXTO_ABIERTO", 
      respuestas: [
        "El servicio es excelente, pero la app a veces es lenta.",
        "Me gustaría que abrieran más temprano los sábados.",
        "La atención de Juan Pérez fue increíble.",
        "Todo bien, sigan así."
      ]
    }
  ]
};

export default function ResultadosPage({ params }: { params: { id: string } }) {
  const { titulo, estado, totalVotos, fechaInicio, fechaFin, preguntas } = datosEncuesta;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      
      {/* --- CABECERA SUPERIOR --- */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                
                {/* Botón Volver y Título */}
                <div className="flex items-center gap-4">
                    <Link href="/admin/dashboard" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-[#004563]">{titulo}</h1>
                        <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                            <span className={`px-2 py-0.5 rounded-md text-xs font-bold border ${
                                estado === 'ACTIVA' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-600'
                            }`}>
                                {estado}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar size={14} /> {fechaInicio} - {fechaFin}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Acciones */}
                <button className="flex items-center gap-2 px-5 py-2.5 bg-[#004563] text-white rounded-lg font-bold hover:bg-[#003550] transition-colors shadow-sm">
                    <Download size={18} />
                    Exportar Reporte
                </button>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8">
        
        {/* --- TARJETAS DE RESUMEN (KPIs) - AHORA SON 2 --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Tarjeta 1: Votos Totales */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between border-l-4 border-l-[#004563]">
                <div>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total Votos</p>
                    <p className="text-4xl font-bold text-[#004563] mt-2">{totalVotos}</p>
                </div>
                <div className="h-14 w-14 bg-blue-50 text-[#004563] rounded-full flex items-center justify-center">
                    <Users size={28} />
                </div>
            </div>
            
            {/* Tarjeta 2: Cantidad de Preguntas */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between border-l-4 border-l-[#eab356]">
                <div>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Preguntas</p>
                    <p className="text-4xl font-bold text-[#eab356] mt-2">{preguntas.length}</p>
                </div>
                <div className="h-14 w-14 bg-yellow-50 text-[#eab356] rounded-full flex items-center justify-center">
                    <PieIcon size={28} />
                </div>
            </div>
        </div>

        {/* --- DETALLE POR PREGUNTA --- */}
        <div className="space-y-8">
            {preguntas.map((pregunta, index) => (
                <div key={pregunta.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    
                    {/* Encabezado de Pregunta */}
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="font-bold text-[#004563] text-lg">
                            <span className="text-gray-400 mr-2">#{index + 1}</span> 
                            {pregunta.texto}
                        </h3>
                        <span className="text-xs font-bold bg-white border px-2 py-1 rounded text-gray-500 uppercase tracking-wide">
                            {pregunta.tipo.replace('_', ' ')}
                        </span>
                    </div>

                    <div className="p-6">
                        {/* CASO 1: GRÁFICO DE BARRAS (Calificación) */}
                        {pregunta.tipo === 'CALIFICACION' && (
                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                <div className="w-full h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={pregunta.datos}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                            <XAxis dataKey="name" tick={{fontSize: 12}} />
                                            <YAxis />
                                            <RechartsTooltip cursor={{fill: '#f0f9ff'}} />
                                            <Bar dataKey="valor" fill="#004563" radius={[4, 4, 0, 0]} barSize={50} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                {/* Resumen Promedio */}
                                <div className="bg-[#004563] text-white p-6 rounded-xl text-center min-w-[200px] shadow-lg">
                                    <p className="text-xs opacity-80 uppercase tracking-widest mb-2 font-bold">Promedio</p>
                                    <div className="flex items-center justify-center gap-2 text-5xl font-bold">
                                        {pregunta.promedio} <Star size={32} fill="#eab356" className="text-[#eab356]" />
                                    </div>
                                    <p className="text-xs mt-3 opacity-80 bg-white/10 px-2 py-1 rounded-full inline-block">Base 5 estrellas</p>
                                </div>
                            </div>
                        )}

                        {/* CASO 2: GRÁFICO DE PASTEL (Opción Múltiple) */}
                        {pregunta.tipo === 'OPCION_MULTIPLE' && (
                             <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                                <div className="w-full h-72 max-w-md">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={pregunta.datos}
                                                innerRadius={60}
                                                outerRadius={100}
                                                paddingAngle={5}
                                                dataKey="valor"
                                            >
                                                {pregunta.datos?.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <RechartsTooltip />
                                            <Legend verticalAlign="bottom" height={36}/>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                {/* Tabla de Datos al lado */}
                                <div className="w-full max-w-sm border border-gray-100 rounded-lg overflow-hidden">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-xs">
                                            <tr>
                                                <th className="px-4 py-3">Opción</th>
                                                <th className="px-4 py-3 text-right">Votos</th>
                                                <th className="px-4 py-3 text-right">%</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {pregunta.datos?.map((dato, i) => (
                                                <tr key={i} className="hover:bg-gray-50">
                                                    <td className="px-4 py-3 font-medium flex items-center gap-2 text-gray-700">
                                                        <span className="w-3 h-3 rounded-full shrink-0" style={{backgroundColor: COLORS[i % COLORS.length]}}></span>
                                                        {dato.name}
                                                    </td>
                                                    <td className="px-4 py-3 text-right font-bold text-gray-800">{dato.valor}</td>
                                                    <td className="px-4 py-3 text-right text-gray-500">
                                                        {(dato.valor / totalVotos * 100).toFixed(1)}%
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                             </div>
                        )}

                        {/* CASO 3: TEXTO ABIERTO (Lista) */}
                        {pregunta.tipo === 'TEXTO_ABIERTO' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {pregunta.respuestas?.map((respuesta, i) => (
                                    <div key={i} className="bg-blue-50/50 p-5 rounded-lg border border-blue-100 flex gap-4 hover:shadow-sm transition-shadow">
                                        <div className="bg-white p-2 rounded-full h-fit border border-blue-100">
                                            <MessageSquare size={18} className="text-[#eab356]" />
                                        </div>
                                        <div>
                                            <p className="text-gray-800 text-sm font-medium italic">"{respuesta}"</p>
                                            <p className="text-xs text-gray-400 mt-2 font-bold uppercase">Respuesta #{i + 1}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>

      </div>
    </div>
  );
}