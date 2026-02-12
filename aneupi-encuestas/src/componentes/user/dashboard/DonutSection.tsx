'use client';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export function DonutSection({ percentage, title }: { percentage: number, title: string }) {
  const data = [
    { name: 'Completado', value: percentage },
    { name: 'Restante', value: 100 - percentage },
  ];
  const COLORS = ['#0F3D5E', '#E5E7EB'];

  return (
    <div className="bg-white p-6 rounded-2xl card-shadow h-full flex flex-col items-center justify-center relative">
      <h3 className="font-bold text-gray-700 self-start w-full mb-4">{title}</h3>

      <div className="h-48 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-[#0F3D5E]">{percentage}%</span>
          <span className="text-xs text-gray-400">Total</span>
        </div>
      </div>

      <div className="mt-4 space-y-2 w-full">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Votos Presentes</span>
          <span className="font-bold text-[#0F3D5E]">1,234</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Ausentes</span>
          <span className="font-bold text-gray-400">450</span>
        </div>
      </div>
    </div>
  );
}