"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
// CORRECCIÓN: Agregado 'Upload' a los imports
import { Plus, Trash2, Save, Image as ImageIcon, X, Upload, Calendar, ArrowLeft, AlignLeft, Type, Star, Send } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

// --- TIPOS ---
type TipoPregunta = 'OPCION_MULTIPLE' | 'TEXTO_ABIERTO' | 'CALIFICACION';

interface Opcion {
  id: string;
  texto: string;
  imagen?: string;
  archivoImagen?: File;
}

interface Pregunta {
  id: string;
  texto: string;
  tipo: TipoPregunta;
  opciones: Opcion[];
  imagen?: string;
  archivoImagen?: File;
}

export default function PaginaCrearEncuesta() {
  const router = useRouter();
  const { setHayCambiosSinGuardar } = useAdmin();
  const searchParams = useSearchParams();
  
  // --- ESTADOS ---
  const [titulo, setTitulo] = useState(searchParams.get('titulo') || '');
  const [fechaInicio, setFechaInicio] = useState(searchParams.get('inicio') || '');
  const [fechaFin, setFechaFin] = useState(searchParams.get('fin') || '');
  const [descripcion, setDescripcion] = useState('');
  
  // NUEVOS ESTADOS PARA PORTADA
  const [imagenPortada, setImagenPortada] = useState<string | undefined>(undefined);
  const [archivoImagenPortada, setArchivoImagenPortada] = useState<File | undefined>(undefined);
  
  const [preguntas, setPreguntas] = useState<Pregunta[]>([
    {
      id: crypto.randomUUID(),
      texto: '',
      tipo: 'OPCION_MULTIPLE',
      opciones: [{ id: crypto.randomUUID(), texto: '' }]
    }
  ]);

  // EFECTO DE CAMBIOS
  useEffect(() => {
    const hayDatos = titulo !== '' || descripcion !== '' || preguntas.length > 1 || preguntas[0].texto !== '' || imagenPortada !== undefined;
    if (hayDatos) setHayCambiosSinGuardar(true);
  }, [titulo, descripcion, fechaInicio, fechaFin, preguntas, imagenPortada, setHayCambiosSinGuardar]);

  // --- LÓGICA ---

  const manejarImagenPortada = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImagenPortada(URL.createObjectURL(file));
      setArchivoImagenPortada(file);
    }
  };

  const eliminarImagenPortada = () => {
    setImagenPortada(undefined);
    setArchivoImagenPortada(undefined);
  };

  const agregarPregunta = () => {
    const nuevaPregunta: Pregunta = {
      id: crypto.randomUUID(),
      texto: '',
      tipo: 'OPCION_MULTIPLE',
      opciones: [{ id: crypto.randomUUID(), texto: '' }]
    };
    setPreguntas([...preguntas, nuevaPregunta]);
  };

  const eliminarPregunta = (idPregunta: string) => {
    setPreguntas(preguntas.filter(p => p.id !== idPregunta));
  };

  const actualizarTextoPregunta = (idPregunta: string, nuevoTexto: string) => {
    setPreguntas(preguntas.map(p => p.id === idPregunta ? { ...p, texto: nuevoTexto } : p));
  };

  const cambiarTipoPregunta = (idPregunta: string, nuevoTipo: TipoPregunta) => {
    setPreguntas(preguntas.map(p => p.id === idPregunta ? { ...p, tipo: nuevoTipo } : p));
  };

  const manejarImagenPregunta = (idPregunta: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreguntas(preguntas.map(p =>
        p.id === idPregunta ? { ...p, imagen: URL.createObjectURL(file), archivoImagen: file } : p
      ));
    }
  };

  const eliminarImagenPregunta = (idPregunta: string) => {
    setPreguntas(preguntas.map(p =>
      p.id === idPregunta ? { ...p, imagen: undefined, archivoImagen: undefined } : p
    ));
  };

  const agregarOpcion = (idPregunta: string) => {
    setPreguntas(preguntas.map(p => {
      if (p.id === idPregunta) {
        return { ...p, opciones: [...p.opciones, { id: crypto.randomUUID(), texto: '' }] };
      }
      return p;
    }));
  };

  const eliminarOpcion = (idPregunta: string, idOpcion: string) => {
    setPreguntas(preguntas.map(p => {
      if (p.id === idPregunta) {
        return { ...p, opciones: p.opciones.filter(op => op.id !== idOpcion) };
      }
      return p;
    }));
  };

  const actualizarTextoOpcion = (idPregunta: string, idOpcion: string, nuevoTexto: string) => {
    setPreguntas(preguntas.map(p => {
      if (p.id === idPregunta) {
        const nuevasOpciones = p.opciones.map(op => op.id === idOpcion ? { ...op, texto: nuevoTexto } : op);
        return { ...p, opciones: nuevasOpciones };
      }
      return p;
    }));
  };

  const manejarImagenOpcion = (idPregunta: string, idOpcion: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreguntas(preguntas.map(p => {
        if (p.id === idPregunta) {
          const nuevasOpciones = p.opciones.map(op => 
            op.id === idOpcion ? { ...op, imagen: URL.createObjectURL(file), archivoImagen: file } : op
          );
          return { ...p, opciones: nuevasOpciones };
        }
        return p;
      }));
    }
  };

  const eliminarImagenOpcion = (idPregunta: string, idOpcion: string) => {
    setPreguntas(preguntas.map(p => {
        if (p.id === idPregunta) {
          const nuevasOpciones = p.opciones.map(op => 
            op.id === idOpcion ? { ...op, imagen: undefined, archivoImagen: undefined } : op
          );
          return { ...p, opciones: nuevasOpciones };
        }
        return p;
      }));
  };

  const guardarEncuesta = () => {
    if (!titulo || !fechaInicio || !fechaFin) {
      alert("⚠️ Faltan datos: Por favor revisa el título y las fechas.");
      return;
    }
    const datos = { titulo, descripcion, imagenPortada, fechaInicio, fechaFin, preguntas };
    console.log("📝 Datos listos para enviar:", datos);
    if (archivoImagenPortada) {
        console.log("📁 Archivo de portada listo para subir:", archivoImagenPortada.name);
    }
    alert("✅ Guardado (Revisa la consola)");
    setHayCambiosSinGuardar(false);
  };

  // ==========================================
  // RENDERIZADO
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-50 pb-32 font-sans text-slate-800 w-full">
      
      {/* 1. BARRA DE NAVEGACIÓN */}
      <div className="sticky top-0 z-40 bg-[#004563] border-b border-[#003550] px-6 py-3 shadow-lg flex justify-between items-center w-full">
         <div className="flex items-center gap-4">
             <button onClick={() => router.back()} className="p-2 text-blue-200 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                 <ArrowLeft size={22} />
             </button>
             <h1 className="text-lg font-bold !text-white tracking-wide hidden sm:block">Editor de Encuesta</h1>
         </div>

         <div className="flex items-center gap-3">
             <button className="p-2 text-red-300 hover:text-red-100 hover:bg-white/10 rounded-full transition-colors" title="Eliminar Encuesta">
                <Trash2 size={20} />
             </button>
             <div className="h-6 w-px bg-white/20 mx-1"></div>
             <button 
                onClick={guardarEncuesta}
                className="flex items-center gap-2 px-4 py-2 text-blue-100 font-bold text-sm hover:text-white hover:bg-white/10 rounded-lg transition-colors border border-transparent hover:border-white/20"
             >
                <Save size={18} />
                <span className="hidden sm:inline">Guardar</span>
             </button>
             <button 
                className="flex items-center gap-2 px-5 py-2 bg-[#eab356] text-[#004563] font-extrabold text-sm rounded-lg shadow-md hover:bg-yellow-400 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
             >
                <Send size={18} />
                <span>Publicar</span>
             </button>
         </div>
      </div>

      {/* CONTENIDO CENTRADO */}
      <div className="max-w-4xl mx-auto px-4 md:px-0 mt-8 space-y-8">
        
        {/* 2. TARJETA DATOS GENERALES */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-md transition-shadow relative">
          <div className="h-1.5 w-full bg-gradient-to-r from-[#004563] to-[#006080]"></div>
          
          {/* --- SECCIÓN DE IMAGEN DE PORTADA --- */}
          {imagenPortada ? (
            <div className="relative w-full h-48 sm:h-64 bg-slate-100 group/cover">
                <img src={imagenPortada} alt="Portada de la encuesta" className="w-full h-full object-cover" />
                <button 
                    onClick={eliminarImagenPortada} 
                    className="absolute top-4 right-4 bg-white text-red-500 p-2 rounded-full shadow-md opacity-0 group-hover/cover:opacity-100 transition-opacity hover:scale-105"
                    title="Eliminar portada"
                >
                    <X size={20} />
                </button>
            </div>
          ) : (
            <div className="w-full bg-slate-50 border-b border-dashed border-slate-200 hover:bg-slate-100 transition-colors group/upload">
                <label className="cursor-pointer flex flex-col items-center justify-center gap-2 text-slate-400 group-hover/upload:text-[#004563] transition-colors py-8">
                    <ImageIcon size={32} />
                    <span className="font-bold text-sm">Añadir imagen de portada</span>
                    <input type="file" accept="image/*" className="hidden" onChange={manejarImagenPortada} />
                </label>
            </div>
          )}

          <div className="p-8 md:p-10 space-y-8">
            <div className="space-y-4">
              <label className="block text-xs font-bold text-[#eab356] uppercase tracking-widest mb-1">Título de la Encuesta</label>
              <input
                type="text" 
                value={titulo} 
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ej: Elecciones Presidenciales 2026"
                className="w-full text-3xl md:text-4xl font-black text-[#004563] placeholder-slate-300 border-none p-0 focus:ring-0 bg-transparent transition-colors"
              />
              <textarea 
                  value={descripcion} 
                  onChange={(e) => setDescripcion(e.target.value)} 
                  placeholder="Añade una descripción o instrucciones para los participantes..." 
                  className="w-full text-lg text-slate-600 placeholder-slate-400 border-none p-0 focus:ring-0 bg-transparent resize-none h-auto min-h-[60px]"
                  rows={2}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 hover:border-[#eab356] transition-colors group/date">
                  <label className="flex items-center gap-2 text-xs font-bold text-[#004563] uppercase mb-3">
                      <Calendar size={16} className="text-[#eab356]" /> Inicio
                  </label>
                  <input type="datetime-local" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} 
                    className="w-full bg-transparent text-slate-700 font-bold outline-none text-sm cursor-pointer"
                  />
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 hover:border-[#eab356] transition-colors group/date">
                  <label className="flex items-center gap-2 text-xs font-bold text-[#004563] uppercase mb-3">
                      <Calendar size={16} className="text-[#eab356]" /> Fin (Cierre)
                  </label>
                  <input type="datetime-local" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} 
                    className="w-full bg-transparent text-slate-700 font-bold outline-none text-sm cursor-pointer"
                  />
              </div>
            </div>
          </div>
        </div>

        {/* 3. LISTA DE PREGUNTAS */}
        <div className="space-y-6">
          {preguntas.map((pregunta, index) => (
            <div key={pregunta.id} className="group bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#004563] opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-5 items-start mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#004563] text-white font-bold text-sm shadow-sm shrink-0 mt-1">
                    {index + 1}
                  </span>
                  
                  <div className="flex-grow w-full space-y-4">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
                        <input
                          type="text"
                          value={pregunta.texto}
                          onChange={(e) => actualizarTextoPregunta(pregunta.id, e.target.value)}
                          placeholder="Escribe tu pregunta aquí..."
                          className="w-full text-xl font-bold text-slate-800 placeholder-slate-300 border-none focus:ring-0 p-0 bg-transparent leading-tight"
                        />

                        <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-lg border border-slate-200 shrink-0">
                            <div className="relative group/select">
                                <select
                                  value={pregunta.tipo}
                                  onChange={(e) => cambiarTipoPregunta(pregunta.id, e.target.value as TipoPregunta)}
                                  className="appearance-none pl-9 pr-8 py-2 bg-white text-xs font-bold text-slate-700 rounded-md border border-slate-200 outline-none focus:border-[#004563] cursor-pointer shadow-sm hover:border-[#004563] transition-colors"
                                >
                                  <option value="OPCION_MULTIPLE">Opción Múltiple</option>
                                  <option value="TEXTO_ABIERTO">Texto Abierto</option>
                                  <option value="CALIFICACION">Calificación</option>
                                </select>
                                <div className="absolute left-3 top-2.5 text-[#004563]">
                                    {pregunta.tipo === 'OPCION_MULTIPLE' && <AlignLeft size={14} />}
                                    {pregunta.tipo === 'TEXTO_ABIERTO' && <Type size={14} />}
                                    {pregunta.tipo === 'CALIFICACION' && <Star size={14} />}
                                </div>
                            </div>

                            <div className="w-px h-6 bg-slate-300 mx-1"></div>

                            <label className="cursor-pointer p-2 text-slate-400 hover:text-[#004563] hover:bg-white rounded-md transition-colors" title="Imagen">
                                <ImageIcon size={18} />
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => manejarImagenPregunta(pregunta.id, e)} />
                            </label>

                            <button onClick={() => eliminarPregunta(pregunta.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-md transition-colors" title="Eliminar">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>

                    {pregunta.imagen && (
                      <div className="relative w-full md:w-2/3 h-52 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 group/img shadow-inner">
                        <img src={pregunta.imagen} alt="Pregunta" className="w-full h-full object-cover" />
                        <button onClick={() => eliminarImagenPregunta(pregunta.id)} className="absolute top-3 right-3 bg-white text-red-500 p-2 rounded-full shadow-lg opacity-0 group-hover/img:opacity-100 transition-opacity hover:scale-110">
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pl-0 md:pl-14">
                  {pregunta.tipo === 'TEXTO_ABIERTO' && (
                    <div className="p-6 bg-slate-50 border border-dashed border-slate-300 rounded-xl text-slate-400 text-sm font-medium flex items-center gap-3">
                        <div className="p-2 bg-white rounded-full border border-slate-200">
                            <Type size={16} />
                        </div>
                        El usuario responderá escribiendo texto libre en este espacio.
                    </div>
                  )}

                  {pregunta.tipo === 'CALIFICACION' && (
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6 bg-slate-50/50 rounded-xl border border-slate-100">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">1 (Bajo)</span>
                          <div className="flex gap-3">
                              {[1,2,3,4,5].map(i => (
                                  <div key={i} className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 font-bold shadow-sm text-lg">
                                      {i}
                                  </div>
                              ))}
                          </div>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">5 (Alto)</span>
                      </div>
                  )}

                  {pregunta.tipo === 'OPCION_MULTIPLE' && (
                    <div className="space-y-3">
                      {pregunta.opciones.map((opcion, i) => (
                        <div key={opcion.id} className="group/opt">
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full border-2 border-slate-300 group-focus-within/opt:border-[#004563] shrink-0 transition-colors bg-white"></div>
                                <div className="flex-grow relative">
                                    <input
                                      type="text"
                                      value={opcion.texto}
                                      onChange={(e) => actualizarTextoOpcion(pregunta.id, opcion.id, e.target.value)}
                                      placeholder={`Escribe la opción ${i + 1}`}
                                      className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 focus:bg-white border border-transparent focus:border-[#004563]/30 rounded-lg text-slate-700 outline-none transition-all font-medium"
                                    />
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-0 group-hover/opt:opacity-100 focus-within:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm rounded-md shadow-sm border border-slate-200 px-1 py-0.5">
                                        <label className="cursor-pointer p-1.5 text-slate-400 hover:text-[#004563] hover:bg-blue-50 rounded" title="Subir foto">
                                            <Upload size={14} />
                                            <input type="file" accept="image/*" className="hidden" onChange={(e) => manejarImagenOpcion(pregunta.id, opcion.id, e)} />
                                        </label>
                                        <button onClick={() => eliminarOpcion(pregunta.id, opcion.id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded">
                                            <X size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {opcion.imagen && (
                                <div className="ml-8 mt-2 relative w-32 h-32 rounded-lg overflow-hidden border border-slate-200 group/img shadow-sm bg-white">
                                    <img src={opcion.imagen} alt="Candidato" className="w-full h-full object-cover" />
                                    <button onClick={() => eliminarImagenOpcion(pregunta.id, opcion.id)} className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center text-white transition-opacity">
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            )}
                        </div>
                      ))}
                      <button onClick={() => agregarOpcion(pregunta.id)} className="ml-8 mt-3 text-sm font-bold text-[#eab356] hover:text-[#dca03a] flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-[#eab356]/10 transition-colors">
                          <Plus size={16} /> Añadir opción
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
            <button 
                onClick={agregarPregunta} 
                className="flex items-center gap-2 px-8 py-3 bg-[#004563] text-white font-bold rounded-full shadow-lg hover:bg-[#003550] hover:scale-105 transition-all group"
            >
                <div className="bg-white/20 rounded-full p-1 group-hover:bg-white/30 transition-colors">
                    <Plus size={20} className="text-[#eab356]" />
                </div>
                <span>Agregar Nueva Pregunta</span>
            </button>
        </div>

      </div>
    </div>
  );
}