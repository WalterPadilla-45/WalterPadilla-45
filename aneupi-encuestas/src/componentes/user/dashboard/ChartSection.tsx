'use client';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'ENE', val: 30 }, { name: 'FEB', val: 45 }, { name: 'MAR', val: 25 },
  { name: 'ABR', val: 50 }, { name: 'MAY', val: 35 }, { name: 'JUN', val: 60 },
  { name: 'JUL', val: 40 }, { name: 'AGO', val: 20 }, { name: 'SEP', val: 55 },
];

export function ChartSection({ title }: { title: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl card-shadow h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-700">{title}</h3>
        
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
            <Tooltip cursor={{ fill: 'transparent' }} />
            <Bar dataKey="val" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 5 ? '#0F3D5E' : '#D4AF37'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}