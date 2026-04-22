'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/ui/Header';
import { ArtistCard } from '@/components/ui/ArtistCard';
import { useAuth } from '@/context/AuthContext';

const Spinner = () => (
  <div style={{ backgroundColor: '#FEF7F3' }} className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4" style={{ borderColor: '#D1924F' }} />
  </div>
);

export default function ComunidadPage() {
  const { token, cargandoAuth } = useAuth();
  const router = useRouter();

  const [artistasConProyectos, setArtistasConProyectos] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError]       = useState('');

  useEffect(() => {

    if (cargandoAuth) return;

    if (!token) {
      router.push('/login');
      return;
    }

    const cargarDatos = async () => {
      setError('');
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artistas`, {
          headers,
          cache: 'no-store',
        });

        if (!res.ok) throw new Error(`Error ${res.status} al obtener artistas`);

        const artistas = await res.json();

        const conProyectos = await Promise.all(
          artistas.map(async (artista: any) => {
            try {
              const resP = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/artistas/${artista.id_artista}/proyectos`,
                { headers }
              );
              const proyectos = resP.ok ? await resP.json() : [];
              return { artista, proyectos };
            } catch {
              return { artista, proyectos: [] };
            }
          })
        );

        setArtistasConProyectos(conProyectos);
      } catch (err: any) {
        console.error('Error cargando comunidad:', err);
        setError('No se pudo cargar la comunidad. Verifica tu conexión e intenta de nuevo.');
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, [token, cargandoAuth, router]);

  if (cargandoAuth || cargando) return <Spinner />;

  if (error) {
    return (
      <div style={{ backgroundColor: '#FEF7F3' }} className="min-h-screen">
        <Header activeTab="comunidad" />
        <main className="max-w-7xl mx-auto px-6 py-12 text-center">
          <p className="text-gray-500 text-lg mb-4">{error}</p>
          <button
            onClick={() => { setCargando(true); setError(''); }}
            className="px-6 py-2 rounded-full text-white font-semibold"
            style={{ backgroundColor: '#D1924F' }}
          >
            Reintentar
          </button>
        </main>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#FEF7F3' }} className="min-h-screen">
      <Header activeTab="comunidad" />
      <main className="max-w-7xl mx-auto px-6 py-12">
        {artistasConProyectos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {artistasConProyectos.map(({ artista, proyectos }) => (
              <ArtistCard key={artista.id_artista} artist={artista} proyectos={proyectos} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No hay artistas disponibles aún.</p>
          </div>
        )}
      </main>
    </div>
  );
}