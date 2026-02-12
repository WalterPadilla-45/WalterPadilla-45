'use client';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: '1', uv: 4000, pv: 2400 },
  { name: '2', uv: 3000, pv: 1398 },
  { name: '3', uv: 2000, pv: 9800 },
  { name: '4', uv: 2780, pv: 3908 },
  { name: '5', uv: 1890, pv: 4800 },
  { name: '6', uv: 2390, pv: 3800 },
  { name: '7', uv: 3490, pv: 4300 },
];

export function WaveChartSection({ title }: { title: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl card-shadow h-full">
      <div className="flex justify-between mb-4">
        <div>
          <h3 className="font-bold text-gray-700">{title}</h3>
          <p className="text-xs text-gray-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span> Online
            <span className="w-2 h-2 rounded-full bg-[#0F3D5E]"></span> Presencial
          </p>
        </div>
      </div>
      <div className="h-40 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0F3D5E" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#0F3D5E" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip />
            <Area type="monotone" dataKey="uv" stroke="#D4AF37" fillOpacity={1} fill="url(#colorUv)" />
            <Area type="monotone" dataKey="pv" stroke="#0F3D5E" fillOpacity={1} fill="url(#colorPv)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}