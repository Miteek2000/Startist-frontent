'use client';

import { Proyecto } from '@/types/artistas';

interface ProjectsSectionProps {
  proyectos: Proyecto[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function ProjectsSection({ proyectos }: ProjectsSectionProps) {
  return (
    <div className="lg:col-span-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {proyectos && proyectos.length > 0 ? (
          proyectos.map((proyecto) => {
            const imagenUrl = proyecto.archivo?.startsWith('http') 
              ? proyecto.archivo 
              : `${API_URL?.replace('/api/v1', '')}/uploads/${proyecto.archivo?.split('/').pop()}`;
            
            return (
              <div
                key={proyecto.id_proyecto}
                className="rounded-2xl overflow-hidden"
                style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)' }}
              >
                <div className="p-3" style={{ backgroundColor: '#D1924F' }}>
                  <div className="w-full h-48 bg-gray-200 overflow-hidden flex items-center justify-center rounded-lg">
                    {imagenUrl ? (
                      <img 
                        src={imagenUrl} 
                        alt={proyecto.proyecto_titulo} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.error('Error loading image:', imagenUrl);
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="text-gray-400">Sin imagen</div>
                    )}
                  </div>
                </div>

                <div className="p-4 text-center" style={{ backgroundColor: '#D1924F' }}>
                  <h3 
                    className="text-base font-semibold text-white"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    {proyecto.proyecto_titulo}
                  </h3>
                  <p className="text-xs text-white opacity-90 mt-2 mb-2 line-clamp-2">
                    {proyecto.proyecto_descripcion}
                  </p>
                  <p className="text-xs text-white opacity-75 italic">
                    {proyecto.tarjeta_titulo}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 col-span-full">No hay proyectos disponibles</p>
        )}
      </div>
    </div>
  );
}