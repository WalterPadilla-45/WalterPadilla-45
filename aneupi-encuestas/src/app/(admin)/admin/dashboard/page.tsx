"use client";

import React, { useState, useMemo } from 'react';
import { Eye, Edit, Trash2, Activity, LogOut, Plus, FileEdit, ChevronLeft, ChevronRight, Search, Filter, Calendar } from 'lucide-react'; // Agregamos Calendar
import { ModalCrear } from '@/componentes/admin/ModalCrear';
import Link from 'next/link';

// --- DATOS FALSOS ---
const encuestasEjemplo = [
  { id: 112, titulo: 'Encuesta de Clima Laboral', estado: 'BORRADOR', respuestas: 0, inicio: '01 Abr 2026', fin: '15 Abr 2026' },
  { id: 111, titulo: 'Votación Directiva 2026', estado: 'ACTIVA', respuestas: 45, inicio: '01 Mar 2026', fin: '05 Mar 2026' },
  { id: 110, titulo: 'Feedback Cafetería', estado: 'CERRADA', respuestas: 120, inicio: '20 Feb 2026', fin: '25 Feb 2026' },
  { id: 109, titulo: 'Uso de Banca Móvil', estado: 'BORRADOR', respuestas: 0, inicio: '15 Mar 2026', fin: '30 Mar 2026' },
  { id: 108, titulo: 'Satisfacción Clientes', estado: 'ACTIVA', respuestas: 142, inicio: '05 Feb 2026', fin: '28 Feb 2026' },
  { id: 107, titulo: 'Evaluación de Créditos', estado: 'CERRADA', respuestas: 89, inicio: '10 Ene 2026', fin: '20 Ene 2026' },
  { id: 106, titulo: 'Test de Nuevos Productos', estado: 'CERRADA', respuestas: 200, inicio: '01 Ene 2026', fin: '15 Ene 2026' },
  { id: 105, titulo: 'Encuesta Anual Socios', estado: 'BORRADOR', respuestas: 0, inicio: '10 Abr 2026', fin: '20 Abr 2026' },
  { id: 104, titulo: 'Calidad de Servicio', estado: 'CERRADA', respuestas: 56, inicio: '15 Dic 2025', fin: '30 Dic 2025' },
  { id: 103, titulo: 'Preferencia de Horarios', estado: 'CERRADA', respuestas: 33, inicio: '01 Dic 2025', fin: '05 Dic 2025' },
  { id: 102, titulo: 'Evento de Fin de Año', estado: 'CERRADA', respuestas: 150, inicio: '20 Nov 2025', fin: '30 Nov 2025' },
  { id: 101, titulo: 'Actualización de Datos', estado: 'CERRADA', respuestas: 10, inicio: '01 Nov 2025', fin: '15 Nov 2025' },
];

export default function DashboardPage() {
  const [mostrarModal, setMostrarModal] = useState(false);
  
  // --- FILTROS ---
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('TODOS');
  
  // NUEVOS FILTROS
  const [filtroAnio, setFiltroAnio] = useState('TODOS');
  const [filtroMes, setFiltroMes] = useState('TODOS');

  // --- LÓGICA DE PAGINACIÓN ---
  const [paginaActual, setPaginaActual] = useState(1);
  const ITEMS_POR_PAGINA = 5;

  // 1. Filtramos
  const encuestasFiltradas = useMemo(() => {
    return encuestasEjemplo.filter(encuesta => {
      // Coincidencia Texto
      const coincideBusqueda = 
        encuesta.titulo.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
        encuesta.id.toString().includes(terminoBusqueda);
      
      // Coincidencia Estado
      const coincideEstado = filtroEstado === 'TODOS' || encuesta.estado === filtroEstado;

      // Coincidencia Año
      const coincideAnio = filtroAnio === 'TODOS' || encuesta.inicio.includes(filtroAnio);

      // Coincidencia Mes
      const coincideMes = filtroMes === 'TODOS' || encuesta.inicio.includes(filtroMes);

      return coincideBusqueda && coincideEstado && coincideAnio && coincideMes;
    });
  }, [terminoBusqueda, filtroEstado, filtroAnio, filtroMes]);

  // 2. Ordenamos y paginamos
  const encuestasOrdenadas = [...encuestasFiltradas].sort((a, b) => b.id - a.id);

  const indiceUltimoItem = paginaActual * ITEMS_POR_PAGINA;
  const indicePrimerItem = indiceUltimoItem - ITEMS_POR_PAGINA;
  const encuestasVisibles = encuestasOrdenadas.slice(indicePrimerItem, indiceUltimoItem);
  const totalPaginas = Math.ceil(encuestasOrdenadas.length / ITEMS_POR_PAGINA) || 1;

  const irPaginaSiguiente = () => { if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1); };
  const irPaginaAnterior = () => { if (paginaActual > 1) setPaginaActual(paginaActual - 1); };

  const activas = encuestasEjemplo.filter(e => e.estado === 'ACTIVA').length;
  const borradores = encuestasEjemplo.filter(e => e.estado === 'BORRADOR').length;

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* --- HEADER --- */}
      <header className="bg-[#004563] w-full shadow-md relative z-50">
        <div className="w-full px-6 py-3 flex justify-between items-center h-16">
            
            <div className="flex-1 min-w-0">
                <h1 className="text-xl md:text-2xl font-bold tracking-tight !text-white drop-shadow-md whitespace-nowrap">
                    Encuestas
                </h1>
            </div>

            <div className="flex items-center gap-3 shrink-0">
                <button 
                    onClick={() => setMostrarModal(true)}
                    className="bg-white text-[#004563] hover:bg-gray-100 px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-sm shadow-sm transition-all"
                >
                    <Plus size={18} />
                    <span className="hidden sm:inline">Crear Nueva</span>
                </button>

                <button className="flex items-center justify-center p-2 bg-[#003550] text-red-200 hover:text-red-100 hover:bg-[#002a40] rounded-lg transition-colors border border-[#003550]">
                    <LogOut size={18} />
                </button>
            </div>
        </div>
      </header>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* --- TARJETAS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-b-4 border-b-[#004563] flex items-center justify-between">
                <div>
                    <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-1">En curso</p>
                    <h3 className="text-4xl font-bold text-[#004563]">{activas}</h3>
                    <p className="text-sm text-gray-500 mt-1 font-medium">Encuestas activas ahora</p>
                </div>
                <div className="h-14 w-14 bg-blue-50 rounded-full flex items-center justify-center text-[#004563]">
                    <Activity size={28} />
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-b-4 border-b-[#eab356] flex items-center justify-between">
                <div>
                    <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-1">Pendientes</p>
                    <h3 className="text-4xl font-bold text-[#eab356]">{borradores}</h3>
                    <p className="text-sm text-gray-500 mt-1 font-medium">Borradores sin publicar</p>
                </div>
                <div className="h-14 w-14 bg-yellow-50 rounded-full flex items-center justify-center text-[#eab356]">
                    <FileEdit size={28} />
                </div>
            </div>
        </div>

        {/* --- BARRA DE FILTROS --- */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 mb-6 flex flex-col xl:flex-row gap-4 justify-between items-center">
            
            {/* Buscador */}
            <div className="relative w-full xl:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                    type="text" 
                    placeholder="Buscar por título o ID..." 
                    value={terminoBusqueda}
                    onChange={(e) => { setTerminoBusqueda(e.target.value); setPaginaActual(1); }}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004563] text-gray-700 bg-gray-50"
                />
            </div>

            {/* Contenedor de Filtros */}
            <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto justify-end">
                
                {/* 1. Filtro AÑO */}
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                    <span className="text-xs font-bold text-gray-400 uppercase">Año:</span>
                    <select 
                        value={filtroAnio}
                        onChange={(e) => { setFiltroAnio(e.target.value); setPaginaActual(1); }}
                        className="bg-transparent border-none outline-none text-gray-700 text-sm font-medium cursor-pointer"
                    >
                        <option value="TODOS">Todos</option>
                        <option value="2026">2026</option>
                        <option value="2025">2025</option>
                    </select>
                </div>

                {/* 2. Filtro MES */}
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                    <span className="text-xs font-bold text-gray-400 uppercase">Mes:</span>
                    <select 
                        value={filtroMes}
                        onChange={(e) => { setFiltroMes(e.target.value); setPaginaActual(1); }}
                        className="bg-transparent border-none outline-none text-gray-700 text-sm font-medium cursor-pointer"
                    >
                        <option value="TODOS">Todos</option>
                        <option value="Ene">Enero</option>
                        <option value="Feb">Febrero</option>
                        <option value="Mar">Marzo</option>
                        <option value="Abr">Abril</option>
                        <option value="May">Mayo</option>
                        <option value="Jun">Junio</option>
                        <option value="Jul">Julio</option>
                        <option value="Ago">Agosto</option>
                        <option value="Sep">Septiembre</option>
                        <option value="Oct">Octubre</option>
                        <option value="Nov">Noviembre</option>
                        <option value="Dic">Diciembre</option>
                    </select>
                </div>

                {/* 3. Filtro ESTADO */}
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                    <Filter size={16} className="text-gray-500" />
                    <select 
                        value={filtroEstado}
                        onChange={(e) => { setFiltroEstado(e.target.value); setPaginaActual(1); }}
                        className="bg-transparent border-none outline-none text-gray-700 text-sm font-medium cursor-pointer"
                    >
                        <option value="TODOS">Estado: Todos</option>
                        <option value="ACTIVA">Activas</option>
                        <option value="BORRADOR">Borradores</option>
                        <option value="CERRADA">Cerradas</option>
                    </select>
                </div>

            </div>
        </div>

        {/* --- TABLA --- */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
            <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-[#004563] text-white">
                <tr>
                <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider w-20 text-center border-r border-[#00557a]"># ID</th>
                <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider border-r border-[#00557a]">Título de Encuesta</th>
                <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider border-r border-[#00557a]">Estado</th>
                <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider text-center border-r border-[#00557a]">Resp.</th>
                <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider border-r border-[#00557a]">Fechas</th>
                <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider text-right">Acciones</th>
                </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
                {encuestasVisibles.length > 0 ? (
                    encuestasVisibles.map((encuesta) => (
                    <tr key={encuesta.id} className="hover:bg-blue-50/30 transition-colors">
                        <td className="px-6 py-4 text-center font-mono text-xs font-bold text-gray-400">{encuesta.id}</td>
                        <td className="px-6 py-4"><p className="font-bold text-[#004563] text-base">{encuesta.titulo}</p></td>
                        <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                                encuesta.estado === 'ACTIVA' ? 'bg-green-100 text-green-700 border-green-200' :
                                encuesta.estado === 'CERRADA' ? 'bg-red-100 text-red-700 border-red-200' :
                                'bg-gray-100 text-gray-600 border-gray-200'
                            }`}>{encuesta.estado}</span>
                        </td>
                        <td className="px-6 py-4 font-bold text-center text-[#004563]">{encuesta.respuestas}</td>
                        <td className="px-6 py-4 text-xs text-gray-500">
                            <div className="flex flex-col gap-1">
                                <span><span className="font-bold text-[#004563]">Inicio:</span> {encuesta.inicio}</span>
                                <span><span className="font-bold text-[#004563]">Fin:</span> {encuesta.fin}</span>
                            </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                                <Link href={`/admin/resultados/${encuesta.id}`}>
                                    <button className="p-2 text-[#004563] bg-blue-50 hover:bg-[#004563] hover:text-white rounded transition-colors" title="Ver Resultados"><Eye size={18} /></button>
                                </Link>
                                <button className="p-2 text-gray-400 hover:text-[#eab356] hover:bg-yellow-50 rounded transition-colors"><Edit size={18} /></button>
                                <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"><Trash2 size={18} /></button>
                            </div>
                        </td>
                    </tr>
                    ))
                ) : (
                    <tr><td colSpan={6} className="px-6 py-10 text-center text-gray-500">No se encontraron resultados.</td></tr>
                )}
            </tbody>
            </table>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-gray-500">Mostrando <span className="font-bold text-[#004563]">{indicePrimerItem + 1}</span> a <span className="font-bold text-[#004563]">{Math.min(indiceUltimoItem, encuestasOrdenadas.length)}</span> de <span className="font-bold text-[#004563]">{encuestasOrdenadas.length}</span> resultados</p>
                <div className="flex items-center gap-2">
                    <button onClick={irPaginaAnterior} disabled={paginaActual === 1} className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-white hover:text-[#004563] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><ChevronLeft size={20} /></button>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: totalPaginas }).map((_, i) => (
                            <button key={i} onClick={() => setPaginaActual(i + 1)} className={`w-8 h-8 rounded-lg text-sm font-bold transition-colors ${paginaActual === i + 1 ? 'bg-[#004563] text-white shadow-md' : 'text-gray-500 hover:bg-white hover:text-[#004563]'}`}>{i + 1}</button>
                        ))}
                    </div>
                    <button onClick={irPaginaSiguiente} disabled={paginaActual === totalPaginas} className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-white hover:text-[#004563] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><ChevronRight size={20} /></button>
                </div>
            </div>
        </div>

      </main>

      {mostrarModal && (
          <ModalCrear cerrar={() => setMostrarModal(false)} />
      )}

    </div>
  );
}