'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Usuario } from '@/app/user/lib/types';
import { clearAuthUser } from '@/app/user/lib/utils';
import { Building2, ChevronDown, User, LogOut, LayoutDashboard, Home } from 'lucide-react';

interface AuthenticatedHeaderProps {
    user: Usuario;
}

export function AuthenticatedHeader({ user }: AuthenticatedHeaderProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        clearAuthUser();
        router.push('/user/login');
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navLinks = [
        { href: '/user', label: 'Encuestas', icon: Home },
        { href: '/user/dashboard', label: 'Dashboard', icon: LayoutDashboard }
    ];

    return (
        <header className="bg-[var(--color-bankBlue)] text-white sticky top-0 z-50 shadow-lg">
            <div className="container">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/user" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                            <Building2 size={24} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold">Sistema de Encuestas</h1>
                            <p className="text-xs text-white/70">Portal de Accionistas</p>
                        </div>
                    </Link>

                    {/* Navegación */}
                    <nav className="hidden md:flex items-center gap-2">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            const isActive = pathname === link.href;

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                                            ? 'bg-white/20 text-white'
                                            : 'text-white/80 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    <Icon size={18} />
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Menú de usuario */}
                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            <div className="w-9 h-9 bg-[var(--color-bankOrange)] rounded-lg flex items-center justify-center font-bold text-sm">
                                {user.nombre?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-sm font-medium hidden sm:inline">{user.nombre || user.email}</span>
                            <ChevronDown size={16} className={`transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {menuOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                                <div className="px-4 py-3 border-b border-gray-200">
                                    <p className="text-sm font-semibold text-gray-900">{user.nombre || 'Usuario'}</p>
                                    <p className="text-xs text-gray-600 truncate">{user.email}</p>
                                </div>

                                <Link
                                    href="/user/perfil"
                                    className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <User size={16} />
                                    <span className="text-sm font-medium">Mi Perfil</span>
                                </Link>

                                <button
                                    onClick={() => {
                                        setMenuOpen(false);
                                        handleLogout();
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    <LogOut size={16} />
                                    <span className="text-sm font-medium">Cerrar Sesión</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
