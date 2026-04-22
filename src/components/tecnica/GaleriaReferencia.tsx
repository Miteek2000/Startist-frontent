'use client';

interface GaleriaReferenciaProps {
  obras: any[];
}

export function GaleriaReferencia({ obras }: GaleriaReferenciaProps) {
  return (
    <div className="mt-16">
      <h2 
        className="text-3xl font-semibold mb-8"
        style={{ fontFamily: 'var(--font-playfair)', color: '#333' }}
      >
        Obras de referencia
      </h2>

      {obras && obras.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {obras.map((obra) => (
            <a
              key={obra.id}
              href={obra.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer rounded-lg overflow-hidden"
              style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)' }}
            >
              <div className="aspect-square overflow-hidden bg-gray-200">
                <img
                  src={obra.imagen}
                  alt={obra.titulo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-3 bg-white">
                <h3 
                  className="text-sm font-semibold truncate"
                  style={{ color: '#333' }}
                >
                  {obra.titulo}
                </h3>
                <p 
                  className="text-xs truncate"
                  style={{ color: '#815629' }}
                >
                  {obra.artista}
                </p>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <p style={{ color: '#815629' }}>No hay obras de referencia disponibles</p>
      )}
    </div>
  );
}
