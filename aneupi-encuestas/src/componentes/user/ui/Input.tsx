import React from 'react';
import { cn } from '@/app/user/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export function Input({
    label,
    error,
    className,
    ...props
}: InputProps) {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-1.5">
                    {label}
                    {props.required && <span className="text-[var(--color-error)] ml-1">*</span>}
                </label>
            )}
            <input
                className={cn(
                    'w-full px-4 py-2.5 rounded-lg border transition-all duration-200',
                    'focus:outline-none focus:ring-2 focus:ring-[var(--color-bankBlue)] focus:border-transparent',
                    error
                        ? 'border-[var(--color-error)] bg-red-50'
                        : 'border-[var(--border-color)] bg-white hover:border-[var(--color-gray-400)]',
                    'disabled:bg-[var(--color-gray-100)] disabled:cursor-not-allowed',
                    className
                )}
                {...props}
            />
            {error && (
                <p className="mt-1.5 text-sm text-[var(--color-error)]">{error}</p>
            )}
        </div>
    );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export function Textarea({
    label,
    error,
    className,
    ...props
}: TextareaProps) {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-1.5">
                    {label}
                    {props.required && <span className="text-[var(--color-error)] ml-1">*</span>}
                </label>
            )}
            <textarea
                className={cn(
                    'w-full px-4 py-2.5 rounded-lg border transition-all duration-200',
                    'focus:outline-none focus:ring-2 focus:ring-[var(--color-bankBlue)] focus:border-transparent',
                    error
                        ? 'border-[var(--color-error)] bg-red-50'
                        : 'border-[var(--border-color)] bg-white hover:border-[var(--color-gray-400)]',
                    'disabled:bg-[var(--color-gray-100)] disabled:cursor-not-allowed',
                    'resize-vertical min-h-[100px]',
                    className
                )}
                {...props}
            />
            {error && (
                <p className="mt-1.5 text-sm text-[var(--color-error)]">{error}</p>
            )}
        </div>
    );
}
