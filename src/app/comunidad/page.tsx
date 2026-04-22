'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/ui/Header';
import { ArtistCard } from '@/components/ui/ArtistCard';
import { useAuth } from '@/context/AuthContext';

export default function ComunidadPage() {
  const { token } = useAuth();
  const router = useRouter();
  const [artistasConProyectos, setArtistasConProyectos] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }

    const cargarDatos = async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artistas`, {
          headers,
          cache: 'no-store',
        });

        if (!res.ok) throw new Error('Error al obtener artistas');

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
      } catch (error) {
        console.error('Error cargando comunidad:', error);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, [token, router]);

  if (cargando) {
    return (
      <div style={{ backgroundColor: '#FEF7F3' }} className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-400" />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#FEF7F3' }} className="min-h-screen">
      <Header activeTab="comunidad" />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {artistasConProyectos.length > 0 ? (
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