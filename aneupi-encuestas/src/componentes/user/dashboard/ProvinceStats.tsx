'use client';
import { MapPin, TrendingUp } from 'lucide-react';

export function ProvinceStats() {
  const provincias = [
    { nombre: 'Pichincha', votos: 5830, porcentaje: 45 },
    { nombre: 'Guayas', votos: 3290, porcentaje: 28 },
    { nombre: 'Azuay', votos: 1900, porcentaje: 12 },
  ];

  return (
    <div className="bg-[#0F3D5E] p-6 rounded-2xl card-shadow h-full flex flex-col" style={{ color: '#FFFFFF' }}>
      <div className="mb-6">
        <div className="font-bold text-lg flex items-center gap-2" style={{ color: '#FFFFFF' }}>
          <MapPin size={20} style={{ color: '#D4AF37' }} />
          Origen geográfico del voto
        </div>
        <p className="text-xs mt-1" style={{ color: 'rgba(147, 197, 253, 0.8)' }}>Distribución por provincia</p>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto pr-2 custom-scrollbar">
        {provincias.map((prov, index) => (
          <div key={prov.nombre} className="group">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium flex items-center gap-2">
                <span className="font-bold text-xs" style={{ color: '#D4AF37' }}>#{index + 1} {prov.nombre}</span>
              </span>
              <span className="font-bold" style={{ color: '#FFFFFF' }}>{prov.votos.toLocaleString()}</span>
            </div>

            <div className="w-full rounded-full h-2 relative" style={{ backgroundColor: 'rgba(30, 58, 138, 0.5)' }}>
              <div
                className="h-2 rounded-full transition-all duration-1000 group-hover:brightness-110"
                style={{ width: `${prov.porcentaje}%`, backgroundColor: '#D4AF37' }}
              ></div>
            </div>
            <p className="text-[10px] text-right mt-1" style={{ color: 'rgba(147, 197, 253, 0.7)' }}>{prov.porcentaje}% del total</p>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="flex items-center justify-center gap-2 text-xs" style={{ color: 'rgba(147, 197, 253, 0.8)' }}>
          <TrendingUp size={14} />
          <span>Pichincha lidera la votación</span>
        </div>
      </div>
    </div>
  );
}