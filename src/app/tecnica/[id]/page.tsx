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

const Spinner = () => (
  <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FEF7F3' }}>
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4" style={{ borderColor: '#D1924F' }} />
  </div>
);

export default function TecnicaPage({ params }: TecnicaPageProps) {
  const { id }        = use(params);
  const { token, cargandoAuth } = useAuth();
  const router        = useRouter();

  const [tarjetas, setTarjetas]       = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [galeria, setGaleria]         = useState<any[]>([]);
  const [isLoading, setIsLoading]     = useState(true);
  const [error, setError]             = useState('');

  useEffect(() => {
    if (cargandoAuth) return;

    if (!token) {
      router.push('/login');
      return;
    }

    const cargarDatos = async () => {
      setError('');
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

        if (!resTarjetas.ok) throw new Error(`Error ${resTarjetas.status} al obtener las tarjetas`);

        const data  = await resTarjetas.json();
        const lista = Array.isArray(data) ? data : data.data || [];

        setTarjetas(lista.map((tj: any) => ({
          id_tarjeta:  tj.id_tarjeta,
          nombre:      tj.titulo,
          descripcion: tj.descripcion || 'Aprende esta técnica paso a paso',
          completada:  completadasMap.get(tj.id_tarjeta) ?? false,
        })));

        if (resGaleria.ok) {
          const gData = await resGaleria.json();
          setGaleria(Array.isArray(gData) ? gData : gData.obras || gData.data || []);
        }
      } catch (err: any) {
        console.error('Error cargando técnica:', err);
        setError('No se pudieron cargar las actividades. Verifica tu conexión e intenta de nuevo.');
      } finally {
        setIsLoading(false);
      }
    };

    cargarDatos();
  }, [id, token, cargandoAuth, router]);

  const handleProyectoSubido = () => {
    setTarjetas(prev =>
      prev.map((tj, i) => i === currentIndex ? { ...tj, completada: true } : tj)
    );
  };

  if (cargandoAuth || isLoading) return <Spinner />;

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center" style={{ backgroundColor: '#FEF7F3' }}>
        <p className="text-gray-500 text-lg">{error}</p>
        <div className="flex gap-3">
          <button
            onClick={() => { setIsLoading(true); setError(''); }}
            className="px-6 py-2 rounded-full text-white font-semibold"
            style={{ backgroundColor: '#D1924F' }}
          >
            Reintentar
          </button>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-2 rounded-full font-semibold"
            style={{ backgroundColor: '#E0E0E0', color: '#333' }}
          >
            Volver al mapa
          </button>
        </div>
      </div>
    );
  }

  if (tarjetas.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center" style={{ backgroundColor: '#FEF7F3' }}>
        <p className="text-gray-500 text-lg">Esta técnica no tiene actividades aún.</p>
        <button
          onClick={() => router.push('/dashboard')}
          className="px-6 py-2 rounded-full text-white font-semibold"
          style={{ backgroundColor: '#D1924F' }}
        >
          Volver al mapa
        </button>
      </div>
    );
  }

  const tarjetaActual = tarjetas[currentIndex];

  return (
    <div className="min-h-screen px-6 py-12" style={{ backgroundColor: '#FEF7F3' }}>
      <div className="max-w-4xl mx-auto">
        <TecnicaCard
          tecnica={tarjetaActual}
          currentIndex={currentIndex}
          totalCards={tarjetas.length}
          onNext={()     => currentIndex < tarjetas.length - 1 && setCurrentIndex(currentIndex + 1)}
          onPrevious={()  => currentIndex > 0                   && setCurrentIndex(currentIndex - 1)}
          onProyectoSubido={handleProyectoSubido}
        />
        {galeria.length > 0 && <GaleriaReferencia obras={galeria} />}
      </div>
    </div>
  );
}