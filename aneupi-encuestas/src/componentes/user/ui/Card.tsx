import React from 'react';
import { cn } from '@/app/user/lib/utils';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
    return (
        <div
            className={cn(
                'bg-white rounded-xl border border-gray-200 shadow-sm',
                hover && 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
                className
            )}
        >
            {children}
        </div>
    );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cn('px-6 py-5 border-b border-gray-100', className)}>
            {children}
        </div>
    );
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <h3 className={cn('text-xl font-bold text-[var(--color-bankBlue)]', className)}>
            {children}
        </h3>
    );
}

export function CardDescription({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <p className={cn('text-sm text-gray-600 mt-2', className)}>
            {children}
        </p>
    );
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cn('px-6 py-4', className)}>
            {children}
        </div>
    );
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cn('px-6 py-4', className)}>
            {children}
        </div>
    );
}
