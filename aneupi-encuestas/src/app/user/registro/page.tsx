'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/componentes/user/ui/Card';
import { Input } from '@/componentes/user/ui/Input';
import { Button } from '@/componentes/user/ui/Button';
import { setAuthUser, isValidEmail } from '../lib/utils';
import { Rol, Usuario } from '../lib/types';

export default function RegistroPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.nombre.trim()) {
            newErrors.nombre = 'El nombre es requerido';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'El email es requerido';
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = 'El email no es válido';
        }

        if (!formData.password) {
            newErrors.password = 'La contraseña es requerida';
        } else if (formData.password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setLoading(true);

        // Simulación de registro
        setTimeout(() => {
            const newUser: Usuario = {
                id: `usr-${Date.now()}`,
                email: formData.email,
                emailVerified: new Date(),
                password: null,
                nombre: formData.nombre,
                rol: Rol.ACCIONISTA,
                creadoEn: new Date()
            };

            setAuthUser(newUser);
            router.push('/user/panel');
        }, 1000);
    };

    return (
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12">
            <div className="container max-w-md">
                <Card>
                    <CardHeader>
                        <CardTitle>Crear Cuenta</CardTitle>
                        <CardDescription>
                            Completa el formulario para registrarte en ANEUPI
                        </CardDescription>
                    </CardHeader>

                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <Input
                                label="Nombre completo"
                                type="text"
                                value={formData.nombre}
                                onChange={(e) => handleChange('nombre', e.target.value)}
                                placeholder="Juan Pérez"
                                error={errors.nombre}
                                required
                            />

                            <Input
                                label="Email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                placeholder="tu@email.com"
                                error={errors.email}
                                required
                            />

                            <Input
                                label="Contraseña"
                                type="password"
                                value={formData.password}
                                onChange={(e) => handleChange('password', e.target.value)}
                                placeholder="••••••••"
                                error={errors.password}
                                required
                            />

                            <Input
                                label="Confirmar contraseña"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                                placeholder="••••••••"
                                error={errors.confirmPassword}
                                required
                            />
                        </CardContent>

                        <CardFooter className="flex flex-col gap-3">
                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full"
                                disabled={loading}
                            >
                                {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
                            </Button>

                            <p className="text-sm text-center text-[var(--color-gray-600)]">
                                ¿Ya tienes cuenta?{' '}
                                <Link href="/user/login" className="text-[var(--color-bankBlue)] hover:underline">
                                    Inicia sesión aquí
                                </Link>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}
