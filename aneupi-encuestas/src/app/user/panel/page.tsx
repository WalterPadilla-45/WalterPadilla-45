'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/componentes/user/ui/Card';
import { Button } from '@/componentes/user/ui/Button';
import { Badge } from '@/componentes/user/ui/Badge';
import { getAuthUser, formatDate, formatMoney } from '../lib/utils';
import { getEncuestasActivas, getVotosByUsuario, getDonacionesByUsuario } from '../lib/mocks';
import { Usuario, Rol } from '../lib/types';
import { FileText, CheckCircle, Heart, User } from 'lucide-react';

export default function PanelPage() {
    const router = useRouter();
    const [user, setUser] = useState<Usuario | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const authUser = getAuthUser();
        if (!authUser || authUser.rol !== Rol.ACCIONISTA) {
            router.push('/user/login');
            return;
        }
        setUser(authUser);
        setLoading(false);
    }, [router]);

    if (loading) {
        return <div className="container py-12">Cargando...</div>;
    }

    if (!user) return null;

    const encuestasDisponibles = getEncuestasActivas();
    const votosUsuario = getVotosByUsuario(user.id);
    const donacionesUsuario = getDonacionesByUsuario(user.id);

    return (
        <div className="py-12">
            <div className="container">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[var(--color-bankBlue)] mb-2">
                        Mi Panel
                    </h1>
                    <p className="text-[var(--color-gray-600)]">
                        Bienvenido, {user.nombre || user.email}
                    </p>
                </div>

                {/* Tarjetas de Resumen */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="p-3 bg-[var(--color-bankBlue-lighter)] rounded-lg">
                                <CheckCircle size={24} className="text-[var(--color-bankBlue)]" />
                            </div>
                            <div>
                                <p className="text-sm text-[var(--color-gray-600)]">Encuestas respondidas</p>
                                <p className="text-2xl font-bold text-[var(--color-gray-900)]">
                                    {votosUsuario.length}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="p-3 bg-[var(--color-bankOrange-lighter)] rounded-lg">
                                <FileText size={24} className="text-[var(--color-bankOrange-dark)]" />
                            </div>
                            <div>
                                <p className="text-sm text-[var(--color-gray-600)]">Encuestas disponibles</p>
                                <p className="text-2xl font-bold text-[var(--color-gray-900)]">
                                    {encuestasDisponibles.length}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <Heart size={24} className="text-green-700" />
                            </div>
                            <div>
                                <p className="text-sm text-[var(--color-gray-600)]">Donaciones realizadas</p>
                                <p className="text-2xl font-bold text-[var(--color-gray-900)]">
                                    {donacionesUsuario.length}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Encuestas Respondidas */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CheckCircle size={20} />
                                Encuestas Respondidas
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {votosUsuario.length > 0 ? (
                                <div className="space-y-3">
                                    {votosUsuario.map((voto) => (
                                        <div
                                            key={voto.id}
                                            className="p-4 border border-[var(--border-color)] rounded-lg"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <p className="font-medium text-[var(--color-gray-900)]">
                                                        Encuesta ID: {voto.encuestaId.substring(0, 8)}...
                                                    </p>
                                                    <p className="text-sm text-[var(--color-gray-600)] mt-1">
                                                        Respondida el {formatDate(voto.creadoEn)}
                                                    </p>
                                                </div>
                                                <Badge variant="success">Completada</Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-[var(--color-gray-500)]">
                                    <CheckCircle className="mx-auto mb-2 opacity-30" size={48} />
                                    <p>Aún no has respondido ninguna encuesta</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Encuestas Disponibles */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText size={20} />
                                Encuestas Disponibles
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {encuestasDisponibles.length > 0 ? (
                                <div className="space-y-3">
                                    {encuestasDisponibles.slice(0, 3).map((encuesta) => (
                                        <div
                                            key={encuesta.id}
                                            className="p-4 border border-[var(--border-color)] rounded-lg hover:border-[var(--color-bankBlue)] transition-colors"
                                        >
                                            <p className="font-medium text-[var(--color-gray-900)] mb-1">
                                                {encuesta.titulo}
                                            </p>
                                            <p className="text-sm text-[var(--color-gray-600)] mb-3 line-clamp-2">
                                                {encuesta.descripcion}
                                            </p>
                                            <Link href={`/user/encuesta/${encuesta.slug}`} className="inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 border-2 border-[var(--color-bankBlue)] text-[var(--color-bankBlue)] hover:bg-gray-50 active:scale-[0.98] px-4 py-2 text-sm w-full">
                                                Responder
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-[var(--color-gray-500)]">
                                    <FileText className="mx-auto mb-2 opacity-30" size={48} />
                                    <p>No hay encuestas disponibles</p>
                                </div>
                            )}
                        </CardContent>
                        {encuestasDisponibles.length > 3 && (
                            <CardFooter>
                                <Link href="/user" className="inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 text-[var(--color-bankBlue)] hover:bg-gray-100 active:scale-[0.98] px-6 py-2.5 text-base w-full">
                                    Ver todas las encuestas
                                </Link>
                            </CardFooter>
                        )}
                    </Card>
                </div>

                {/* Historial de Donaciones */}
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Heart size={20} />
                            Historial de Donaciones
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {donacionesUsuario.length > 0 ? (
                            <div className="space-y-3">
                                {donacionesUsuario.map((donacion) => (
                                    <div
                                        key={donacion.id}
                                        className="p-4 border border-[var(--border-color)] rounded-lg"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <p className="font-medium text-[var(--color-gray-900)]">
                                                    {donacion.causa?.titulo}
                                                </p>
                                                <p className="text-sm text-[var(--color-gray-600)] mt-1">
                                                    {formatDate(donacion.creadoEn)}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-semibold text-[var(--color-bankOrange-dark)]">
                                                    {formatMoney(donacion.monto, donacion.moneda)}
                                                </p>
                                                <Badge variant={donacion.estado === 'COMPLETADA' ? 'success' : 'warning'}>
                                                    {donacion.estado}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-[var(--color-gray-500)]">
                                <Heart className="mx-auto mb-2 opacity-30" size={48} />
                                <p>No has realizado donaciones aún</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Acceso Rápido a Perfil */}
                <div className="mt-8">
                    <Link href="/user/perfil" className="inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 border-2 border-[var(--color-bankBlue)] text-[var(--color-bankBlue)] hover:bg-gray-50 active:scale-[0.98] px-6 py-2.5 text-base w-full md:w-auto">
                        <User size={18} />
                        Ver mi perfil
                    </Link>
                </div>
            </div>
        </div>
    );
}
