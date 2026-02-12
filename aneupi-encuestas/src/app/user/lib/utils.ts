import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utilidad para combinar clases de Tailwind de forma segura
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Genera un fingerprint simulado para identificar usuarios anónimos
 * En producción, esto debería usar una librería real como FingerprintJS
 */
export function generateFingerprint(): string {
    // Simulación simple usando navegador + timestamp
    const nav = typeof navigator !== 'undefined' ? navigator.userAgent : 'server';
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7);

    return btoa(`${nav}-${timestamp}-${random}`).substring(0, 32);
}

/**
 * Verifica si un fingerprint ya votó en una encuesta
 */
export function hasVoted(encuestaId: string, fingerprint: string): boolean {
    if (typeof window === 'undefined') return false;

    const key = `voto_${encuestaId}`;
    const stored = localStorage.getItem(key);

    return stored === fingerprint;
}

/**
 * Registra un voto en localStorage
 */
export function recordVote(encuestaId: string, fingerprint: string): void {
    if (typeof window === 'undefined') return;

    const key = `voto_${encuestaId}`;
    localStorage.setItem(key, fingerprint);
}

/**
 * Formatea una fecha de forma legible
 */
export function formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;

    return new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(d);
}

/**
 * Formatea una fecha de forma relativa (hace X días)
 */
export function formatRelativeDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diff = now.getTime() - d.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `hace ${days} día${days > 1 ? 's' : ''}`;
    if (hours > 0) return `hace ${hours} hora${hours > 1 ? 's' : ''}`;
    if (minutes > 0) return `hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    return 'hace un momento';
}

/**
 * Formatea un monto de dinero
 */
export function formatMoney(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

/**
 * Valida un email
 */
export function isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Obtiene el usuario autenticado desde localStorage (simulado)
 */
export function getAuthUser() {
    if (typeof window === 'undefined') return null;

    const stored = localStorage.getItem('auth_user');
    return stored ? JSON.parse(stored) : null;
}

/**
 * Guarda el usuario autenticado en localStorage (simulado)
 */
export function setAuthUser(user: any) {
    if (typeof window === 'undefined') return;

    localStorage.setItem('auth_user', JSON.stringify(user));
}

/**
 * Elimina el usuario autenticado (logout simulado)
 */
export function clearAuthUser() {
    if (typeof window === 'undefined') return;

    localStorage.removeItem('auth_user');
}
