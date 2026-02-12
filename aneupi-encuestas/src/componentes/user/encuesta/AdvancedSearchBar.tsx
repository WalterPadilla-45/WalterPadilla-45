'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '../ui/Button';
import { CategoriaEncuesta, EstadoEncuesta } from '@/app/user/lib/types';

interface AdvancedSearchBarProps {
    searchText: string;
    onSearchTextChange: (value: string) => void;
    selectedCategory: string;
    onCategoryChange: (value: string) => void;
    selectedState: string;
    onStateChange: (value: string) => void;
    onFilter: () => void;
}

export function AdvancedSearchBar({
    searchText,
    onSearchTextChange,
    selectedCategory,
    onCategoryChange,
    selectedState,
    onStateChange,
    onFilter
}: AdvancedSearchBarProps) {
    const categorias = [
        { value: '', label: 'Todas las categorías' },
        { value: CategoriaEncuesta.FINANCIERA, label: 'Financiera' },
        { value: CategoriaEncuesta.GOBIERNO_CORPORATIVO, label: 'Gobierno Corporativo' },
        { value: CategoriaEncuesta.ESTRATEGIA, label: 'Estrategia' },
        { value: CategoriaEncuesta.OPERACIONES, label: 'Operaciones' },
        { value: CategoriaEncuesta.RRHH, label: 'Recursos Humanos' },
        { value: CategoriaEncuesta.OTRA, label: 'Otra' }
    ];

    const estados = [
        { value: '', label: 'Todos los estados' },
        { value: EstadoEncuesta.ACTIVA, label: 'Activa' },
        { value: EstadoEncuesta.CERRADA, label: 'Cerrada' },
        { value: EstadoEncuesta.PROXIMA, label: 'Próxima' }
    ];

    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-10">
            <div className="flex flex-col gap-5">
                {/* Título */}
                <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                    <Search size={24} className="text-[var(--color-bankBlue)]" />
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Buscar Encuestas</h2>
                        <p className="text-sm text-gray-600">Filtra por título, categoría o estado</p>
                    </div>
                </div>

                {/* Controles de búsqueda */}
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Campo de búsqueda */}
                    <div className="flex-1">
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                            Buscar por título
                        </label>
                        <input
                            type="text"
                            value={searchText}
                            onChange={(e) => onSearchTextChange(e.target.value)}
                            placeholder="Escribe palabras clave..."
                            className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-bankBlue)] focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Categoría */}
                    <div className="lg:w-64">
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                            Categoría
                        </label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => onCategoryChange(e.target.value)}
                            className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-bankBlue)] focus:border-transparent transition-all bg-white cursor-pointer"
                        >
                            {categorias.map((cat) => (
                                <option key={cat.value} value={cat.value}>
                                    {cat.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Estado */}
                    <div className="lg:w-48">
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                            Estado
                        </label>
                        <select
                            value={selectedState}
                            onChange={(e) => onStateChange(e.target.value)}
                            className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-bankBlue)] focus:border-transparent transition-all bg-white cursor-pointer"
                        >
                            {estados.map((est) => (
                                <option key={est.value} value={est.value}>
                                    {est.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Botón */}
                    <div className="lg:w-auto flex items-end">
                        <Button
                            onClick={onFilter}
                            variant="primary"
                            className="w-full lg:w-auto px-8 py-3"
                        >
                            Filtrar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
