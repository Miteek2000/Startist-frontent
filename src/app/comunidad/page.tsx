import { Header } from '@/components/ui/Header';
import { ArtistCard } from '@/components/ui/ArtistCard';
import { getArtistas } from '@/lib/artistas';

export default async function ComunidadPage() {
  const artistas = await getArtistas();

  return (
    <div style={{ backgroundColor: '#FEF7F3' }} className="min-h-screen">
      <Header activeTab="comunidad" />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-12">Comunidad</h1>

        {/* Artists Grid */}
        {artistas && artistas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {artistas.map((artista) => (
              <ArtistCard key={artista.id_artista} artist={artista} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No hay artistas disponibles</p>
          </div>
        )}
      </main>
    </div>
  );
}
