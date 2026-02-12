'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/componentes/user/ui/Card';
import { Input } from '@/componentes/user/ui/Input';
import { Button } from '@/componentes/user/ui/Button';
import { setAuthUser } from '../lib/utils';
import { mockUsuarios } from '../lib/mocks';
import { Rol } from '../lib/types';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulación de login
        setTimeout(() => {
            // Buscar usuario por email en los mocks
            const user = mockUsuarios.find(u => u.email === email);

            if (user) {
                setAuthUser(user);

                // Redirigir según rol
                if (user.rol === Rol.ACCIONISTA) {
                    router.push('/user/dashboard');
                } else {
                    router.push('/user/panel');
                }
            } else {
                setError('Credenciales incorrectas. Prueba con: publico@example.com o accionista@example.com');
                setLoading(false);
            }
        }, 800);
    };

    return (
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12">
            <div className="container max-w-md">
                <Card>
                    <CardHeader>
                        <CardTitle>Iniciar Sesión</CardTitle>
                        <CardDescription>
                            Ingresa tus credenciales para acceder a tu cuenta
                        </CardDescription>
                    </CardHeader>

                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            {error && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                                    {error}
                                </div>
                            )}

                            <Input
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="tu@email.com"
                                required
                            />

                            <Input
                                label="Contraseña"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />

                            <div className="text-sm">
                                <p className="text-[var(--color-gray-600)] mb-2">
                                    Para pruebas, usa:
                                </p>
                                <div className="bg-[var(--color-gray-50)] p-2 rounded text-xs space-y-1">
                                    <p><strong>Usuario Público:</strong> publico@example.com</p>
                                    <p><strong>Accionista:</strong> accionista@example.com</p>
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="flex flex-col gap-3">
                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full"
                                disabled={loading}
                            >
                                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                            </Button>

                            <p className="text-sm text-center text-[var(--color-gray-600)]">
                                ¿No tienes cuenta?{' '}
                                <Link href="/user/registro" className="text-[var(--color-bankBlue)] hover:underline">
                                    Regístrate aquí
                                </Link>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}
