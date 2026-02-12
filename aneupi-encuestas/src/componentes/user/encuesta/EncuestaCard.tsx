import React from 'react';
import Link from 'next/link';
import { Encuesta, EstadoEncuesta, CategoriaEncuesta } from '@/app/user/lib/types';
import { Card, CardContent } from '@/componentes/user/ui/Card';
import { Button } from '@/componentes/user/ui/Button';
import { Badge } from '@/componentes/user/ui/Badge';
import { formatDate } from '@/app/user/lib/utils';
import { Calendar, ArrowRight } from 'lucide-react';

interface EncuestaCardProps {
    encuesta: Encuesta;
    showShareButton?: boolean;
}

const getCategoryLabel = (categoria: CategoriaEncuesta): string => {
    const labels: Record<CategoriaEncuesta, string> = {
        [CategoriaEncuesta.FINANCIERA]: 'Financiera',
        [CategoriaEncuesta.GOBIERNO_CORPORATIVO]: 'Gobierno Corporativo',
        [CategoriaEncuesta.ESTRATEGIA]: 'Estrategia',
        [CategoriaEncuesta.OPERACIONES]: 'Operaciones',
        [CategoriaEncuesta.RRHH]: 'Recursos Humanos',
        [CategoriaEncuesta.OTRA]: 'Otra'
    };
    return labels[categoria];
};

const getStateVariant = (estado: EstadoEncuesta): 'success' | 'warning' | 'info' => {
    if (estado === EstadoEncuesta.ACTIVA) return 'success';
    if (estado === EstadoEncuesta.PROXIMA) return 'info';
    return 'warning';
};

const getStateLabel = (estado: EstadoEncuesta): string => {
    const labels: Record<EstadoEncuesta, string> = {
        [EstadoEncuesta.ACTIVA]: 'Activa',
        [EstadoEncuesta.CERRADA]: 'Cerrada',
        [EstadoEncuesta.PROXIMA]: 'Próxima'
    };
    return labels[estado];
};

export function EncuestaCard({ encuesta }: EncuestaCardProps) {
    return (
        <Card hover className="h-full flex flex-col">
            <CardContent className="flex flex-col h-full p-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                    <span className="text-xs font-bold text-[var(--color-bankOrange)] uppercase tracking-wider">
                        {getCategoryLabel(encuesta.categoria)}
                    </span>
                    <Badge variant={getStateVariant(encuesta.estado)} className="text-xs shrink-0">
                        {getStateLabel(encuesta.estado)}
                    </Badge>
                </div>

                {/* Título */}
                <h3 className="text-lg font-bold text-[var(--color-bankBlue)] mb-3 line-clamp-2 leading-tight">
                    {encuesta.titulo}
                </h3>

                {/* Descripción */}
                <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">
                    {encuesta.descripcion || 'Sin descripción disponible'}
                </p>

                {/* Fecha */}
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4 pb-4 border-t border-gray-100 pt-4">
                    <Calendar size={14} />
                    <span>
                        {encuesta.fechaFin
                            ? `Cierra: ${formatDate(encuesta.fechaFin)}`
                            : 'Sin fecha límite'}
                    </span>
                </div>

                {/* Botón */}
                <Link href={`/user/encuesta/${encuesta.slug}`}>
                    <Button variant="primary" size="sm" className="w-full flex items-center justify-center gap-2">
                        Responder
                        <ArrowRight size={16} />
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
}
