'use client';

import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { LayoutDashboard, Bell, Mail, Phone, MapPin } from 'lucide-react';
import { LoginModal } from '@/componentes/user/modal/LoginModal';
import { RegisterModal } from '@/componentes/user/modal/RegisterModal';

const inter = Inter({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '900'],
    variable: '--font-inter',
    display: 'swap',
});

export default function UserLayout({ children }: { children: React.ReactNode }) {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    const openLogin = () => {
        setIsRegisterOpen(false);
        setIsLoginOpen(true);
    };

    const openRegister = () => {
        setIsLoginOpen(false);
        setIsRegisterOpen(true);
    };

    return (
        <div className={`${inter.variable} font-sans min-h-screen bg-[#F4F6F8] text-slate-800 flex flex-col overflow-x-hidden`}>

            {/* ── NAVBAR SUPERIOR ──────────────────────────────── */}
            <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
                <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-3">
                    {/* Logo ANEUPI */}
                    <Link href="/user/dashboard" className="flex items-center gap-2.5 text-[#0F3D5E] no-underline">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0F3D5E] text-white shadow-sm font-bold text-sm">
                            A
                        </div>
                        <span className="text-lg font-bold tracking-tight">ANEUPI</span>
                    </Link>

                    {/* Nav Right */}
                    <div className="flex items-center gap-4">
                        {/* Dashboard Link */}
                        <Link
                            href="/user/dashboard"
                            className="hidden md:flex items-center gap-1.5 text-sm font-medium text-[#0F3D5E] hover:text-[#D4AF37] transition-colors no-underline"
                        >
                            <LayoutDashboard size={16} />
                            Dashboard
                        </Link>

                        {/* Profile */}
                        <div className="flex items-center gap-2 ml-2">
                            <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-white font-bold text-xs">
                                MA
                            </div>
                            <span className="hidden md:block text-sm font-medium text-gray-700">
                                Maria Accionista
                            </span>
                        </div>

                        {/* Bell */}
                        <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500">
                            <Bell size={18} />
                            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
                        </button>
                    </div>
                </div>
            </header>

            {/* ── MAIN CONTENT ─────────────────────────────────── */}
            <main className="flex-1">
                {children}
            </main>

            {/* ── FOOTER CORPORATIVO ───────────────────────────── */}
            <footer className="bg-[#0F3D5E] text-white mt-auto">
                <div className="mx-auto max-w-[1200px] px-6 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        {/* Left */}
                        <div className="space-y-2">
                            <p className="text-sm font-medium leading-snug">
                                Asociación Nacional de Empresarios Unidos para la Inversión. Trabajamos por la
                                <br className="hidden md:block" />
                                transparencia y el desarrollo corporativo.
                            </p>
                        </div>

                        {/* Right - Contact */}
                        <div className="text-right space-y-1 text-xs text-blue-200">
                            <div className="flex items-center gap-2 justify-end">
                                <Mail size={12} />
                                <span>Email: info@aneupi.org</span>
                            </div>
                            <div className="flex items-center gap-2 justify-end">
                                <Phone size={12} />
                                <span>Tel: 1 (2) 233 2376</span>
                            </div>
                            <div className="flex items-center gap-2 justify-end">
                                <MapPin size={12} />
                                <span>Bogotá, Colombia</span>
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="mt-6 pt-4 border-t border-white/10 text-center">
                        <p className="text-xs text-blue-200">
                            © 2026 ANEUPI. Todos los derechos reservados.
                        </p>
                    </div>
                </div>
            </footer>

            {/* Modals */}
            <LoginModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onSwitchToRegister={openRegister}
            />
            <RegisterModal
                isOpen={isRegisterOpen}
                onClose={() => setIsRegisterOpen(false)}
                onSwitchToLogin={openLogin}
            />
        </div>
    );
}
