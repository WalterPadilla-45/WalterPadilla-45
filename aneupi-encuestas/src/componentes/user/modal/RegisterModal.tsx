'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setAuthUser, isValidEmail } from '@/app/user/lib/utils';
import { Rol, Usuario } from '@/app/user/lib/types';
import { X } from 'lucide-react';

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToLogin: () => void;
}

export function RegisterModal({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.nombre.trim()) newErrors.nombre = 'Requerido';
        if (!formData.email.trim()) newErrors.email = 'Requerido';
        else if (!isValidEmail(formData.email)) newErrors.email = 'Inválido';
        if (!formData.password) newErrors.password = 'Requerido';
        else if (formData.password.length < 6) newErrors.password = 'Min 6 caracteres';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'No coinciden';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);

        setTimeout(() => {
            const newUser: Usuario = {
                id: `usr-${Date.now()}`,
                email: formData.email,
                emailVerified: new Date(),
                password: null,
                nombre: formData.nombre,
                rol: Rol.SUPER_USUARIO, // Just for demo, usually PUBLICO but based on requirements let's assume default permissions
                creadoEn: new Date()
            };

            setAuthUser(newUser);
            router.push('/user/panel');
            onClose();
        }, 1000);
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
                    <h2 className="text-xl font-bold text-[#004563]">Crear Cuenta</h2>
                    <p className="text-sm text-slate-500">Únete a FinSurvey</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700">Nombre Completo</label>
                        <input
                            type="text"
                            className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition-all ${errors.nombre ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-[#004563] focus:ring-[#004563]'}`}
                            placeholder="Nombre Apellido"
                            value={formData.nombre}
                            onChange={(e) => handleChange('nombre', e.target.value)}
                        />
                        {errors.nombre && <span className="text-[10px] text-red-500">{errors.nombre}</span>}
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700">Email</label>
                        <input
                            type="email"
                            className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition-all ${errors.email ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-[#004563] focus:ring-[#004563]'}`}
                            placeholder="tu@email.com"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                        />
                        {errors.email && <span className="text-[10px] text-red-500">{errors.email}</span>}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-700">Contraseña</label>
                            <input
                                type="password"
                                className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition-all ${errors.password ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-[#004563] focus:ring-[#004563]'}`}
                                placeholder="••••••"
                                value={formData.password}
                                onChange={(e) => handleChange('password', e.target.value)}
                            />
                            {errors.password && <span className="text-[10px] text-red-500">{errors.password}</span>}
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-700">Confirmar</label>
                            <input
                                type="password"
                                className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition-all ${errors.confirmPassword ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-[#004563] focus:ring-[#004563]'}`}
                                placeholder="••••••"
                                value={formData.confirmPassword}
                                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                            />
                            {errors.confirmPassword && <span className="text-[10px] text-red-500">{errors.confirmPassword}</span>}
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-[#004563] py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-70"
                        >
                            {loading ? 'Registrando...' : 'Registrarse'}
                        </button>
                    </div>

                    <div className="text-center text-xs text-slate-500 mt-4">
                        ¿Ya tienes cuenta?{' '}
                        <button
                            type="button"
                            onClick={onSwitchToLogin}
                            className="font-bold text-[#eab356] hover:underline focus:outline-none"
                        >
                            Inicia sesión
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
