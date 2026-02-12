import { CheckCircle2 } from 'lucide-react';

export function TopListSection({ encuestas }: { encuestas: any[] }) {
  // Tomamos solo las 3 primeras para el diseño
  const displayList = encuestas.slice(0, 3); 

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm h-full flex flex-col">
      <h3 className="font-bold text-gray-700 mb-6">Top Encuestas</h3>
      
      <div className="space-y-4 flex-1">
        {displayList.length > 0 ? displayList.map((encuesta, i) => (
          <div key={encuesta.id} className="flex items-center gap-3 group cursor-pointer">
            <div className={`p-2 rounded-lg ${i === 0 ? 'bg-orange-100 text-orange-600' : 'bg-blue-50 text-blue-600'}`}>
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-800 line-clamp-1 group-hover:text-[#eab356] transition-colors">
                {encuesta.titulo}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(encuesta.creadoEn).toLocaleDateString()}
              </p>
            </div>
          </div>
        )) : (
          <p className="text-sm text-gray-400">No hay encuestas recientes</p>
        )}
      </div>

      <button className="mt-6 w-full bg-[#004563] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#00324a] transition-colors shadow-lg shadow-blue-900/20">
        Ver Todas
      </button>
    </div>
  );
}