'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/componentes/user/ui/Card';
import { Input } from '@/componentes/user/ui/Input';
import { Button } from '@/componentes/user/ui/Button';
import { getAuthUser, setAuthUser } from '../lib/utils';
import { Usuario, Rol } from '../lib/types';
import { User, Mail, Calendar } from 'lucide-react';

export default function PerfilPage() {
    const router = useRouter();
    const [user, setUser] = useState<Usuario | null>(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        email: ''
    });

    useEffect(() => {
        const authUser = getAuthUser();
        if (!authUser) {
            router.push('/user/login');
            return;
        }
        setUser(authUser);
        setFormData({
            nombre: authUser.nombre || '',
            email: authUser.email
        });
        setLoading(false);
    }, [router]);

    const handleSave = () => {
        if (user) {
            const updatedUser: Usuario = {
                ...user,
                nombre: formData.nombre,
                email: formData.email
            };
            setAuthUser(updatedUser);
            setUser(updatedUser);
            setEditing(false);
        }
    };

    if (loading) {
        return <div className="container py-12">Cargando...</div>;
    }

    if (!user) return null;

    return (
        <div className="py-12">
            <div className="container max-w-2xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[var(--color-bankBlue)] mb-2">
                        Mi Perfil
                    </h1>
                    <p className="text-[var(--color-gray-600)]">
                        Gestiona tu información personal
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Información Personal</CardTitle>
                            {!editing && (
                                <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
                                    Editar
                                </Button>
                            )}
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Avatar/Icono */}
                        <div className="flex justify-center">
                            <div className="w-24 h-24 bg-[var(--color-bankOrange)] rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-4xl">
                                    {user.nombre?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        </div>

                        {editing ? (
                            <>
                                <Input
                                    label="Nombre completo"
                                    value={formData.nombre}
                                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                    placeholder="Tu nombre"
                                />

                                <Input
                                    label="Email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="tu@email.com"
                                />

                                <div className="flex gap-3">
                                    <Button variant="primary" onClick={handleSave} className="flex-1">
                                        Guardar cambios
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setEditing(false);
                                            setFormData({
                                                nombre: user.nombre || '',
                                                email: user.email
                                            });
                                        }}
                                        className="flex-1"
                                    >
                                        Cancelar
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-4 bg-[var(--color-gray-50)] rounded-lg">
                                        <User size={20} className="text-[var(--color-bankBlue)]" />
                                        <div className="flex-1">
                                            <p className="text-sm text-[var(--color-gray-600)]">Nombre</p>
                                            <p className="font-medium text-[var(--color-gray-900)]">
                                                {user.nombre || 'No especificado'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-4 bg-[var(--color-gray-50)] rounded-lg">
                                        <Mail size={20} className="text-[var(--color-bankBlue)]" />
                                        <div className="flex-1">
                                            <p className="text-sm text-[var(--color-gray-600)]">Email</p>
                                            <p className="font-medium text-[var(--color-gray-900)]">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-4 bg-[var(--color-gray-50)] rounded-lg">
                                        <User size={20} className="text-[var(--color-bankBlue)]" />
                                        <div className="flex-1">
                                            <p className="text-sm text-[var(--color-gray-600)]">Rol</p>
                                            <p className="font-medium text-[var(--color-gray-900)]">
                                                {user.rol === Rol.ACCIONISTA ? 'Accionista' : 'Super Usuario'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-4 bg-[var(--color-gray-50)] rounded-lg">
                                        <Calendar size={20} className="text-[var(--color-bankBlue)]" />
                                        <div className="flex-1">
                                            <p className="text-sm text-[var(--color-gray-600)]">Miembro desde</p>
                                            <p className="font-medium text-[var(--color-gray-900)]">
                                                {new Date(user.creadoEn).toLocaleDateString('es-ES', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
