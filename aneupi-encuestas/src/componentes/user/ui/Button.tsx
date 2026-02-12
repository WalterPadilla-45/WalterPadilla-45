import React from 'react';
import { cn } from '@/app/user/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

export function Button({
    variant = 'primary',
    size = 'md',
    className,
    children,
    ...props
}: ButtonProps) {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm';

    const variants = {
        primary: 'bg-[var(--color-bankBlue)] text-white hover:bg-[#003a52] active:scale-[0.98]',
        secondary: 'bg-[var(--color-bankOrange)] text-white hover:bg-[#d49f45] active:scale-[0.98]',
        outline: 'border-2 border-[var(--color-bankBlue)] text-[var(--color-bankBlue)] hover:bg-gray-50 active:scale-[0.98] shadow-none',
        ghost: 'text-[var(--color-bankBlue)] hover:bg-gray-100 active:scale-[0.98] shadow-none'
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-2.5 text-base',
        lg: 'px-8 py-3.5 text-lg'
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </button>
    );
}
