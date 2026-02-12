import React from 'react';

export function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12'
    };

    return (
        <div className="flex items-center justify-center">
            <div
                className={`${sizes[size]} border-4 border-[var(--color-bankBlue-lighter)] border-t-[var(--color-bankBlue)] rounded-full animate-spin`}
                role="status"
                aria-label="Cargando"
            />
        </div>
    );
}

export function LoadingScreen({ message = 'Cargando...' }: { message?: string }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <Spinner size="lg" />
            <p className="text-[var(--color-gray-600)]">{message}</p>
        </div>
    );
}
