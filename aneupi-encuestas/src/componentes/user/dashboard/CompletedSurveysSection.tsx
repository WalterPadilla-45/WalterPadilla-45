import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface TopSurvey {
    id: string;
    title: string;
    date: string;
}

export function CompletedSurveysSection() {
    const encuestas: TopSurvey[] = [
        { id: '1', title: 'Encuesta de Satisfacción 5', date: '7/02/2026' },
        { id: '2', title: 'Encuesta de Satisfacción 4', date: '1/02/2026' },
        { id: '3', title: 'Encuesta de Satisfacción 3', date: '7/01/2026' },
    ];

    const colors = ['bg-orange-100 text-orange-600', 'bg-blue-50 text-blue-600', 'bg-blue-50 text-blue-500'];

    return (
        <div className="bg-white p-6 rounded-2xl card-shadow h-full flex flex-col">
            <h3 className="font-bold text-gray-700 mb-6">Top Encuestas</h3>

            <div className="space-y-4 flex-1">
                {encuestas.map((encuesta, i) => (
                    <div key={encuesta.id} className="flex items-center gap-3 group cursor-pointer">
                        <div className={`p-2 rounded-lg ${colors[i] || 'bg-gray-100 text-gray-500'}`}>
                            <CheckCircle2 size={20} />
                        </div>
                        <div>
                            <p className="font-semibold text-sm text-gray-800 line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
                                {encuesta.title}
                            </p>
                            <p className="text-xs text-gray-400">{encuesta.date}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button className="mt-6 w-full bg-[#0F3D5E] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#0A2D45] transition-colors shadow-lg shadow-blue-900/20">
                Ver Todas
            </button>
        </div>
    );
}
