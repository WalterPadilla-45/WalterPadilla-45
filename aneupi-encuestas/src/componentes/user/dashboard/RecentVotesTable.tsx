import React from 'react';

export interface VoteRecord {
    id: string;
    shareholderId: string;
    date: string;
    status: 'valid' | 'pending' | 'rejected';
    ipAddress: string;
}

interface RecentVotesTableProps {
    votes: VoteRecord[];
}

export function RecentVotesTable({ votes }: RecentVotesTableProps) {
    return (
        <div className="bg-white rounded-xl card-shadow border border-gray-100 overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-[#0F3D5E]">
                    Últimos Votos Registrados
                </h3>
                <button className="text-sm font-medium text-[#0F3D5E] hover:underline">
                    Ver Auditoría Completa
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                            <th className="px-6 py-4 font-semibold">Accionista ID</th>
                            <th className="px-6 py-4 font-semibold">Fecha y Hora</th>
                            <th className="px-6 py-4 font-semibold">Estado</th>
                            <th className="px-6 py-4 font-semibold">IP Origen</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {votes.map((vote) => (
                            <tr key={vote.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-sm font-medium text-[#0F3D5E]">
                                    {vote.shareholderId}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {new Date(vote.date).toLocaleString('es-ES', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit'
                                    })}
                                </td>
                                <td className="px-6 py-4">
                                    <StatusBadge status={vote.status} />
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 font-mono">
                                    {vote.ipAddress}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: 'valid' | 'pending' | 'rejected' }) {
    const styles = {
        valid: 'bg-green-100 text-green-700',
        pending: 'bg-yellow-100 text-yellow-700',
        rejected: 'bg-red-100 text-red-700',
    };

    const labels = {
        valid: 'Validado',
        pending: 'Pendiente',
        rejected: 'Rechazado',
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
            {labels[status]}
        </span>
    );
}
