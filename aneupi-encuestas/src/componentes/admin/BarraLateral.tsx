"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, PlusCircle, LogOut, PieChart } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext'; // <--- IMPORTAMOS EL CONTEXTO
import { ModalAdvertencia } from './ModalAdvertencia'; // <--- IMPORTAMOS EL MODAL

interface Props {
  alHacerClickEnCrear?: () => void;
}

export const BarraLateral = ({ alHacerClickEnCrear }: Props) => {
  const rutaActual = usePathname();
  const router = useRouter();
  
  // Usamos el contexto para saber si hay peligro
  const { hayCambiosSinGuardar, setHayCambiosSinGuardar } = useAdmin();
  
  // Estado local para mostrar el modal de advertencia
  const [mostrarAdvertencia, setMostrarAdvertencia] = useState(false);
  const [rutaPendiente, setRutaPendiente] = useState(''); // A dónde quería ir el usuario

  const menuItems = [
    { nombre: 'Panel Principal', ruta: '/admin/dashboard', icono: <LayoutDashboard size={20} /> },
    { nombre: 'Crear Encuesta', ruta: '/admin/crear', icono: <PlusCircle size={20} /> },
    { nombre: 'Resultados (Demo)', ruta: '/admin/resultados', icono: <PieChart size={20} /> },
  ];

  // Función que maneja el clic en los enlaces
  const manejarNavegacion = (rutaDestino: string, esBotonCrear: boolean) => {
    // 1. Si estamos en CREAR y hay cambios, BLOQUEAMOS
    if (hayCambiosSinGuardar && rutaActual.includes('/admin/crear')) {
        setRutaPendiente(rutaDestino);
        setMostrarAdvertencia(true);
        return;
    }

    // 2. Si es el botón de "Crear" especial (abre modal)
    if (esBotonCrear && alHacerClickEnCrear) {
        alHacerClickEnCrear();
        return;
    }

    // 3. Navegación normal
    router.push(rutaDestino);
  };

  const confirmarSalida = () => {
    setHayCambiosSinGuardar(false); // Limpiamos la bandera
    setMostrarAdvertencia(false);   // Cerramos modal
    
    // Ejecutamos la acción que estaba pendiente
    if (rutaPendiente === 'ACCION_CREAR' && alHacerClickEnCrear) {
        alHacerClickEnCrear();
    } else {
        router.push(rutaPendiente);
    }
  };

  return (
    <>
        <aside className="w-64 bg-[#004563] text-white h-screen fixed left-0 top-0 flex flex-col shadow-2xl z-50">
        
        <div className="p-6 border-b border-[#003550]">
            <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-[#eab356]">Superusuario</span>
            </h1>
            <p className="text-xs text-gray-300 mt-1">Gestión de Encuestas</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
            const esActivo = rutaActual === item.ruta;
            return (
                <div 
                key={item.ruta} 
                onClick={() => manejarNavegacion(item.ruta, item.ruta === '/admin/crear')}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${
                    esActivo 
                    ? 'bg-white/10 text-white font-bold border-l-4 border-[#eab356]' 
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
                >
                {item.icono}
                <span>{item.nombre}</span>
                </div>
            );
            })}
        </nav>

        <div className="p-4 border-t border-[#003550]">
            <button className="flex items-center gap-3 w-full px-4 py-3 text-red-300 hover:bg-red-500/10 hover:text-red-200 rounded-lg transition-colors">
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
            </button>
        </div>
        </aside>

        {/* MODAL DE ADVERTENCIA */}
        <ModalAdvertencia 
            abierto={mostrarAdvertencia}
            alCancelar={() => setMostrarAdvertencia(false)}
            alConfirmarSalir={confirmarSalida}
        />
    </>
  );
};