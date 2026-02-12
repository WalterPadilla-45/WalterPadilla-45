'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setAuthUser } from '@/app/user/lib/utils';
import { mockUsuarios } from '@/app/user/lib/mocks';
import { Rol } from '@/app/user/lib/types';
import { X } from 'lucide-react';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToRegister: () => void;
}

export function LoginModal({ isOpen, onClose, onSwitchToRegister }: LoginModalProps) {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulation
        setTimeout(() => {
            const user = mockUsuarios.find(u => u.email === email);
            if (user) {
                setAuthUser(user);
                if (user.rol === Rol.SUPER_USUARIO) {
                    router.push('/user/panel');
                } else {
                    // Just refresh or redirect to dashboard/home? 
                    // Assuming dashboard for valid users as per original login page logic
                    router.push('/user/dashboard');
                }
                onClose();
            } else {
                setError('Credenciales incorrectas');
                setLoading(false);
            }
        }, 800);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="mb-6">
                    <h2 className="text-xl font-bold text-[#004563]">Iniciar Sesión</h2>
                    <p className="text-sm text-slate-500">Ingresa a tu cuenta corporativa</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-100">
                            {error}
                        </div>
                    )}

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700">Email Corporativo</label>
                        <input
                            type="email"
                            className="w-full rounded-lg border-slate-200 px-3 py-2 text-sm focus:border-[#004563] focus:ring-[#004563] outline-none transition-all"
                            placeholder="usuario@empresa.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700">Contraseña</label>
                        <input
                            type="password"
                            className="w-full rounded-lg border-slate-200 px-3 py-2 text-sm focus:border-[#004563] focus:ring-[#004563] outline-none transition-all"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-[#004563] py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-70"
                        >
                            {loading ? 'Validando...' : 'Acceder'}
                        </button>
                    </div>

                    <div className="text-center text-xs text-slate-500 mt-4">
                        ¿No tienes cuenta?{' '}
                        <button
                            type="button"
                            onClick={onSwitchToRegister}
                            className="font-bold text-[#eab356] hover:underline focus:outline-none"
                        >
                            Regístrate aquí
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
