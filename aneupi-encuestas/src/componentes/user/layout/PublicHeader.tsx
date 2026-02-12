import React from 'react';
import Link from 'next/link';
import { Building2 } from 'lucide-react';

export function PublicHeader() {
    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="container">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/user" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <div className="w-12 h-12 bg-[var(--color-bankBlue)] rounded-lg flex items-center justify-center">
                            <Building2 size={24} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-[var(--color-bankBlue)]">Sistema de Encuestas</h1>
                            <p className="text-xs text-gray-600">Portal de Accionistas</p>
                        </div>
                    </Link>

                    {/* Botones de acción */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="/user/login"
                            className="px-6 py-2.5 text-sm font-semibold text-[var(--color-bankBlue)] hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            Iniciar Sesión
                        </Link>
                        <Link
                            href="/user/registro"
                            className="px-6 py-2.5 text-sm font-semibold bg-[var(--color-bankBlue)] text-white hover:bg-[#003a52] rounded-lg transition-colors shadow-sm"
                        >
                            Registrarse
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
