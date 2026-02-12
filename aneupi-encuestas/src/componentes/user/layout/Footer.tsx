import React from 'react';
import Link from 'next/link';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[var(--color-bankBlue)] text-white mt-auto">
            <div className="container py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Sobre ANEUPI */}
                    <div>
                        <h4 className="font-semibold text-lg mb-3 text-[var(--color-bankOrange)]">
                            Sobre ANEUPI
                        </h4>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            Asociación Nacional de Empresarios Unidos para la Inversión.
                            Trabajamos por la transparencia y el desarrollo corporativo.
                        </p>
                    </div>

                    {/* Enlaces Rápidos */}
                    <div>
                        <h4 className="font-semibold text-lg mb-3 text-[var(--color-bankOrange)]">
                            Enlaces Rápidos
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/user" className="text-gray-300 hover:text-white transition-colors duration-200">
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link href="/user/login" className="text-gray-300 hover:text-white transition-colors duration-200">
                                    Iniciar Sesión
                                </Link>
                            </li>
                            <li>
                                <Link href="/user/registro" className="text-gray-300 hover:text-white transition-colors duration-200">
                                    Registrarse
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contacto */}
                    <div>
                        <h4 className="font-semibold text-lg mb-3 text-[var(--color-bankOrange)]">
                            Contacto
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li>Email: info@aneupi.org</li>
                            <li>Tel: +57 (1) 234 5678</li>
                            <li>Bogotá, Colombia</li>
                        </ul>
                    </div>
                </div>

                <hr className="my-6 border-[var(--color-bankBlue-light)]" />

                <div className="text-center text-sm text-gray-300">
                    <p>&copy; {currentYear} ANEUPI. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
