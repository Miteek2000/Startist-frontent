import Image from 'next/image';
import { Artista } from '@/types';

interface ArtistCardProps {
  artist: Artista;
}

export function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col items-center text-center">
      {/* Avatar */}
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4 flex-shrink-0"
        style={{ backgroundColor: '#D1924F' }}
      >
        <Image
          src="/UsuarioPerfil_Header.png"
          alt={artist.nombre}
          width={64}
          height={64}
          className="rounded-full object-cover"
        />
      </div>

      {/* Artist Info */}
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{artist.nombre}</h3>
      <p className="text-sm text-gray-500 mb-4">{artist.descripcion}</p>

      {/* Techniques */}
      <div className="w-full">
        <div
          className="rounded-lg px-4 py-3 flex flex-wrap gap-2 justify-center items-center"
          style={{ backgroundColor: '#D1924F' }}
        >
          <span className="text-white text-xs font-semibold">TÉCNICAS</span>
          {artist.tecnicas && artist.tecnicas.length > 0 ? (
            artist.tecnicas.map((tecnica, index) => (
              <span
                key={index}
                className="bg-white bg-opacity-30 text-white text-xs px-3 py-1 rounded-full"
              >
                {tecnica}
              </span>
            ))
          ) : (
            <>
              <span className="bg-white bg-opacity-30 text-white text-xs px-3 py-1 rounded-full">
                Grafito
              </span>
              <span className="bg-white bg-opacity-30 text-white text-xs px-3 py-1 rounded-full">
                Acuarela
              </span>
              <span className="bg-white bg-opacity-30 text-white text-xs px-3 py-1 rounded-full">
                Acuarela
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
