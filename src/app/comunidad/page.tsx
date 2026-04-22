import { Header } from '@/components/ui/Header';
import { ArtistCard } from '@/components/ui/ArtistCard';
import { getArtistas, getProyectosByArtista } from '@/lib/artistas';

export default async function ComunidadPage() {
  const artistas = await getArtistas();

  // Obtener proyectos para cada artista
  const artistasConProyectos = await Promise.all(
    artistas.map(async (artista) => ({
      artista,
      proyectos: await getProyectosByArtista(artista.id_artista),
    }))
  );

  return (
    <div style={{ backgroundColor: '#FEF7F3' }} className="min-h-screen">
      <Header activeTab="comunidad" />

      <main className="max-w-7xl mx-auto px-6 py-12">

        {artistas && artistas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {artistasConProyectos.map(({ artista, proyectos }) => (
              <ArtistCard key={artista.id_artista} artist={artista} proyectos={proyectos} />
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
