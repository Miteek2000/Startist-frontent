'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/ui/Header';
import { ProfileHeader } from '@/components/perfil/ProfileHeader';
import { ProjectsSection } from '@/components/perfil/ProjectsSection';
import { TechniquesSection } from '@/components/perfil/TechniquesSection';
import { useAuth } from '@/context/AuthContext';
import { TecnicaArbol } from '@/types/tecnicas';

export default function PerfilPage() {
  const { token, user } = useAuth();
  const router = useRouter();

  const [artista, setArtista] = useState<any>(null);
  const [tecnicas, setTecnicas] = useState<TecnicaArbol[]>([]);
  const [proyectos, setProyectos] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!token || !user) {
      router.push('/login');
      return;
    }

    const cargarDatos = async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        };

        const artistaId = user.id;

        const [resArtista, resTecnicas, resProyectos] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/artistas/${artistaId}`, { headers }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/arbol`, { headers }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/artistas/${artistaId}/proyectos`, { headers }),
        ]);

        if (resArtista.ok) {
          const data = await resArtista.json();
          setArtista(data.data || data);
        }

        if (resTecnicas.ok) {
          const data = await resTecnicas.json();
          setTecnicas(Array.isArray(data) ? data : data.data || []);
        }

        if (resProyectos.ok) {
          const data = await resProyectos.json();
          setProyectos(Array.isArray(data) ? data : data.data || []);
        }
      } catch (error) {
        console.error('Error cargando perfil:', error);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, [token, user, router]);

  if (cargando) {
    return (
      <div style={{ backgroundColor: '#FEF7F3' }} className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-400" />
      </div>
    );
  }

  if (!artista) {
    return (
      <div style={{ backgroundColor: '#FEF7F3' }} className="min-h-screen">
        <Header activeTab="perfil" />
        <main className="max-w-7xl mx-auto px-6 py-12 text-center">
          <p className="text-gray-500 text-lg">No se encontró el artista</p>
        </main>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#FEF7F3' }} className="min-h-screen">
      <Header activeTab="perfil" />
      <main className="max-w-7xl mx-auto px-6 py-12">
        <ProfileHeader artista={artista} tecnicas={tecnicas} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ProjectsSection proyectos={proyectos} />
          <TechniquesSection tecnicas={tecnicas} />
        </div>
      </main>
    </div>
  );
}