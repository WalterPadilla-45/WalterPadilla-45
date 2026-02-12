import React from 'react';
import { Info } from 'lucide-react';

interface OptionResult {
    label: string;
    votes: number;
    percentage: number;
    color?: string;
}

interface QuestionResultCardProps {
    questionNumber: string;
    questionText: string;
    type: 'distribution' | 'columns';
    data: OptionResult[];
}

export function QuestionResultCard({
    questionNumber,
    questionText,
    type,
    data,
}: QuestionResultCardProps) {
    return (
        <div className="bg-white p-6 rounded-xl card-shadow border border-gray-100 flex flex-col h-full">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600">
                        {questionNumber}
                    </div>
                    <h3 className="text-lg font-semibold text-[#0F3D5E] leading-tight">
                        {questionText}
                    </h3>
                </div>
                <button className="text-gray-400 hover:text-[#0F3D5E]">
                    <Info size={20} />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1">
                {type === 'distribution' ? (
                    <div className="space-y-6">
                        {data.map((item, index) => (
                            <div key={index}>
                                <div className="flex justify-between text-sm font-medium text-[#0F3D5E] mb-1.5">
                                    <span>{item.label}</span>
                                    <span className="font-bold">
                                        {item.percentage.toFixed(1)}% ({item.votes} votos)
                                    </span>
                                </div>
                                <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{
                                            width: `${item.percentage}%`,
                                            backgroundColor: item.color || '#0F3D5E',
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="h-full flex flex-col justify-end pt-4">
                        <div className="flex justify-around items-end h-40 mb-4 px-4">
                            {data.map((item, index) => (
                                <div key={index} className="flex flex-col items-center gap-2 group w-1/4">
                                    <span className="text-sm font-bold text-[#0F3D5E]">
                                        {item.percentage}%
                                    </span>
                                    <div
                                        className="w-full bg-gray-100 rounded-t-lg relative group-hover:opacity-90 transition-all"
                                        style={{ height: `${item.percentage * 1.5}px` }}
                                    >
                                        <div
                                            className="absolute bottom-0 left-0 right-0 top-0 rounded-t-lg opacity-20"
                                            style={{ backgroundColor: item.color || '#0F3D5E' }}
                                        ></div>
                                        <div
                                            className="absolute bottom-0 left-0 right-0 h-1 rounded-t-sm"
                                            style={{ backgroundColor: item.color || '#0F3D5E' }}
                                        ></div>
                                    </div>
                                    <span className="text-xs text-gray-500 font-medium uppercase text-center">
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center gap-6 mt-4 border-t border-gray-100 pt-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#D4AF37]"></div>
                                <span className="text-xs text-gray-500">Tendencia Ganadora</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                                <span className="text-xs text-gray-500">Otras Opciones</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
