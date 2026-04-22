'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import { TecnicaCard } from '@/components/tecnica/TecnicaCard';
import { GaleriaReferencia } from '@/components/tecnica/GaleriaReferencia';
import { useAuth } from '@/context/AuthContext';

interface TecnicaPageProps {
  params: Promise<{ id: string }>;
}

export default function TecnicaPage({ params }: TecnicaPageProps) {
  const { id } = use(params);
  const { token } = useAuth();
  const router = useRouter();

  const [tarjetas, setTarjetas] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [galeria, setGaleria] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }

    const cargarDatos = async () => {
      try {
        setIsLoading(true);

        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        };

        const [resTarjetas, resArbol, resGaleria] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/tecnicas/${id}/tarjetas`, { headers }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/arbol`, { headers }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/tecnicas/${id}/galeria?limit=8`, { headers }),
        ]);

        const completadasMap = new Map<number, boolean>();
        if (resArbol.ok) {
          const arbol = await resArbol.json();
          for (const tecnica of arbol) {
            if (String(tecnica.id_tecnica) === String(id)) {
              for (const tj of tecnica.tarjetas) {
                completadasMap.set(tj.id_tarjeta, tj.completada);
              }
              break;
            }
          }
        }

        if (resTarjetas.ok) {
          const data = await resTarjetas.json();
          const lista = Array.isArray(data) ? data : data.data || [];

          const tarjetasConEstado = lista.map((tj: any) => ({
            id_tarjeta:  tj.id_tarjeta,
            nombre:      tj.titulo,
            descripcion: tj.descripcion || 'Aprende esta técnica paso a paso',
            completada:  completadasMap.get(tj.id_tarjeta) ?? false,
          }));

          setTarjetas(tarjetasConEstado);
        }

        if (resGaleria.ok) {
          const data = await resGaleria.json();
          setGaleria(Array.isArray(data) ? data : data.obras || data.data || []);
        }
      } catch (error) {
        console.error('Error cargando datos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    cargarDatos();
  }, [id, token, router]);

  const handleProyectoSubido = () => {
    setTarjetas(prev =>
      prev.map((tj, i) => i === currentIndex ? { ...tj, completada: true } : tj)
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FEF7F3' }}>
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-400" />
      </div>
    );
  }

  const tarjetaActual = tarjetas[currentIndex];

  return (
    <div className="min-h-screen px-6 py-12" style={{ backgroundColor: '#FEF7F3' }}>
      <div className="max-w-4xl mx-auto">
        {tarjetaActual && (
          <>
            <TecnicaCard
              tecnica={tarjetaActual}
              currentIndex={currentIndex}
              totalCards={tarjetas.length}
              onNext={() => currentIndex < tarjetas.length - 1 && setCurrentIndex(currentIndex + 1)}
              onPrevious={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)}
              onProyectoSubido={handleProyectoSubido}
            />
            {galeria.length > 0 && <GaleriaReferencia obras={galeria} />}
          </>
        )}
      </div>
    </div>
  );
}