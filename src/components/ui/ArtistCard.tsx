import Image from 'next/image';
import { Artista, Proyecto } from '@/types';

interface ArtistCardProps {
  artist: Artista;
  proyectos?: Proyecto[];
}

export function ArtistCard({ artist, proyectos = [] }: ArtistCardProps) {
  return (
    <div className="max-w-2xl bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col" style={{ boxShadow: '-4px 4px 12px rgba(0, 0, 0, 0.1)' }}>

      <div className="flex items-start gap-4 mb-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: '#F2D8BD' }}
        >
          <Image
            src={artist.imagen || '/UsuarioComunidad.png'}
            alt={artist.nombre}
            width={35}
            height={35}
          />
        </div>


        <div className="flex flex-col justify-center">
          <h3 className="text-lg font-semibold text-gray-800" style={{ fontFamily: 'var(--font-playfair)' }}>{artist.nombre}</h3>
          <p className="text-sm" style={{ color: '#815629' }}>{artist.descripcion}</p>
        </div>
      </div>


      <div className="w-full">
        <div
          className="rounded-2xl px-4 py-3 flex flex-wrap gap-2 justify-start items-center"
          style={{ backgroundColor: '#D1924F', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)' }}
        >
          <span className="text-white text-ls font-semibold w-full text-left mb-2">PROYECTOS</span>
          {proyectos && proyectos.length > 0 ? (
            proyectos.map((proyecto, index) => (
              <span
                key={index}
                className="text-white text-sm px-3 py-1 rounded-full"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
              >
                {proyecto.tecnica_nombre}
              </span>
            ))
          ) : (
            <span className="text-white text-sm px-3 py-1" style={{ opacity: 0.7 }}>
              Este artista aún no cuenta con proyectos registrados
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
