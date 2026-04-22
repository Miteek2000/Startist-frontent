import { Header } from '@/components/ui/Header';
import { ProfileHeader } from '@/components/perfil/ProfileHeader';
import { ProjectsSection } from '@/components/perfil/ProjectsSection';
import { TechniquesSection } from '@/components/perfil/TechniquesSection';
import { getArtistaById, getTecnicasDesbloqueadas, getProyectosByArtista } from '@/lib/artistas';
import { TecnicaArbol } from '@/types/tecnicas';

const ARTIST_ID = 1;

export default async function PerfilPage() {
  const artista = await getArtistaById(ARTIST_ID);
  const tecnicas = await getTecnicasDesbloqueadas() as TecnicaArbol[];
  const proyectos = await getProyectosByArtista(ARTIST_ID);

  if (!artista) {
    return (
      <div style={{ backgroundColor: '#FEF7F3' }} className="min-h-screen">
        <Header activeTab="perfil" />
        <main className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <p className="text-gray-500 text-lg">No se encontró el artista</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#FEF7F3' }} className="min-h-screen">
      <Header activeTab="perfil" />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Tarjeta de Perfil Principal */}
        <ProfileHeader artista={artista} tecnicas={tecnicas} />

        {/* Sección de Proyectos y Técnicas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ProjectsSection proyectos={proyectos} />
          <TechniquesSection tecnicas={tecnicas} />
        </div>
      </main>
    </div>
  );
}
