'use client';

import { TecnicaArbol } from '@/types/tecnicas';

interface TechniquesSectionProps {
  tecnicas: TecnicaArbol[];
}

export function TechniquesSection({ tecnicas }: TechniquesSectionProps) {
  return (
    <div className="lg:col-span-1">
      <div 
        className="bg-white rounded-3xl shadow-sm p-6"
        style={{ boxShadow: '-4px 4px 12px rgba(0, 0, 0, 0.1)' }}
      >
        <h2 
          className="text-2xl font-semibold mb-6"
          style={{ fontFamily: 'var(--font-playfair)', color: '#333' }}
        >
          Técnicas
        </h2>

        <div className="flex flex-col gap-3">
          {tecnicas && tecnicas.length > 0 ? (
            tecnicas.map((tecnica) => (
              <div
                key={tecnica.id_tecnica}
                className="px-4 py-3 rounded-2xl text-white font-semibold text-sm flex flex-col"
                style={{
                  backgroundColor: tecnica.desbloqueada ? '#D1924F' : '#D3D3D3',
                }}
              >
                <div className="flex items-center gap-2">
                  {tecnica.desbloqueada && '✓'}
                  {tecnica.nombre}
                </div>
                <div className="text-xs opacity-80 mt-1">
                  {tecnica.tarjetas_completadas}/{tecnica.total_tarjetas} tarjetas
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No hay técnicas disponibles</p>
          )}
        </div>
      </div>
    </div>
  );
}
