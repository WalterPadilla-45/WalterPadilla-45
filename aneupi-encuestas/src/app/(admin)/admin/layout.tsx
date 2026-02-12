"use client";

import React from 'react';
import { AdminProvider } from '@/context/AdminContext';

export default function LayoutAdmin({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
        <div className="min-h-screen bg-gray-50">
            {/* CAMBIO CLAVE: */}
            {/* Quitamos 'max-w-7xl', 'mx-auto' y 'p-8'. */}
            {/* Ahora 'children' ocupa el 100% del ancho disponible. */}
            <main className="w-full">
                {children}
            </main>
        </div>
    </AdminProvider>
  );
}