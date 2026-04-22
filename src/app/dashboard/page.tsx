'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/ui/Header';
import { TecnicaNodo } from '@/types/arbol';
import { useAuth } from '@/context/AuthContext';

const Spinner = () => (
  <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FEF7F3' }}>
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4" style={{ borderColor: '#D1924F' }} />
  </div>
);

export default function DashboardPage() {
  const [nodos, setNodos]                         = useState<TecnicaNodo[]>([]);
  const [tecnicaSeleccionada, setTecnicaSeleccionada] = useState<TecnicaNodo | null>(null);
  const [cargando, setCargando]                   = useState(true);
  const [error, setError]                         = useState('');

  const { token, cargandoAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (cargandoAuth) return;

    if (!token) {
      router.push('/login');
      return;
    }

    const fetchArbol = async () => {
      setError('');
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/arbol`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) throw new Error(`Error ${res.status} al obtener el árbol`);

        const backendData = await res.json();

        const nodosFrontend = backendData.map((t: any) => {
          let configVisual = {};
          switch (t.id_tecnica) {
            case 1: configVisual = { descripcion: 'La técnica base por excelencia. Aprende a dominar los trazos, las sombras y los volúmenes usando lápices de diferentes durezas.', imagen_url: '/EjemploProyecto.png', posicion_x: 50, posicion_y: 10 }; break;
            case 2: configVisual = { descripcion: 'Sombreado intenso y difuminados dramáticos. Ideal para retratos y alto contraste.',                                              imagen_url: '/EjemploProyecto.png', posicion_x: 30, posicion_y: 35 }; break;
            case 3: configVisual = { descripcion: 'Pintura basada en agua. Domina la transparencia, los lavados y el control de la humedad.',                                       imagen_url: '/EjemploProyecto.png', posicion_x: 70, posicion_y: 35 }; break;
            case 4: configVisual = { descripcion: 'Técnicas de impresión como linóleo o punta seca. Requiere precisión y paciencia.',                                               imagen_url: '/EjemploProyecto.png', posicion_x: 30, posicion_y: 65 }; break;
            case 5: configVisual = { descripcion: 'Pintura de secado lento y colores vibrantes. Perfecta para mezclas suaves y texturas.',                                          imagen_url: '/EjemploProyecto.png', posicion_x: 60, posicion_y: 65 }; break;
            case 6: configVisual = { descripcion: 'Pintura de secado rápido. Versátil y vibrante, ideal para múltiples capas.',                                                     imagen_url: '/EjemploProyecto.png', posicion_x: 80, posicion_y: 65 }; break;
            case 7: configVisual = { descripcion: 'Modelado en 3D utilizando arcilla, yeso u otros materiales para dar vida a tus ideas.',                                          imagen_url: '/EjemploProyecto.png', posicion_x: 30, posicion_y: 90 }; break;
            default: configVisual = { descripcion: 'Técnica artística', imagen_url: '/EjemploProyecto.png', posicion_x: 50, posicion_y: 50 }; break;
          }
          return {
            id: t.id_tecnica,
            nombre: t.nombre,
            desbloqueada: t.desbloqueada,
            completada: t.completada,
            dependencias: t.tecnica_padre_id ? [t.tecnica_padre_id] : [],
            ...configVisual,
          };
        });

        setNodos(nodosFrontend);
        const raiz = nodosFrontend.find((n: TecnicaNodo) => n.id === 1);
        setTecnicaSeleccionada(raiz || nodosFrontend[0] || null);
      } catch (err: any) {
        console.error('Error al obtener el árbol:', err);
        setError('No se pudo cargar el mapa de habilidades. Verifica tu conexión e intenta de nuevo.');
      } finally {
        setCargando(false);
      }
    };

    fetchArbol();
  }, [token, cargandoAuth, router]);

  if (cargandoAuth || cargando) return <Spinner />;

  if (error) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FEF7F3' }}>
        <Header />
        <main className="flex-1 flex items-center justify-center flex-col gap-4 text-center px-6">
          <p className="text-gray-500 text-lg">{error}</p>
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

  const renderizarLineas = () =>
    nodos.map((nodo) =>
      nodo.dependencias.map((depId) => {
        const padre = nodos.find((n) => n.id === depId);
        if (!padre) return null;
        return (
          <line
            key={`line-${padre.id}-${nodo.id}`}
            x1={`${padre.posicion_x}%`} y1={`${padre.posicion_y}%`}
            x2={`${nodo.posicion_x}%`}  y2={`${nodo.posicion_y}%`}
            stroke={nodo.desbloqueada ? '#3b82f6' : '#d1d5db'}
            strokeWidth={nodo.desbloqueada ? 4 : 2}
            strokeDasharray={!nodo.desbloqueada ? '5,5' : '0'}
            className="transition-all duration-500 ease-in-out"
          />
        );
      })
    );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="container mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 flex-1 h-[calc(100vh-80px)]">
        {/* Mapa */}
        <section className="flex-1 bg-white rounded-2xl shadow-sm relative overflow-hidden border border-gray-200 min-h-[500px]">
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {renderizarLineas()}
          </svg>
          <div className="relative z-10 w-full h-full">
            {nodos.map((nodo) => (
              <button
                key={nodo.id}
                onClick={() => nodo.desbloqueada && setTecnicaSeleccionada(nodo)}
                style={{ left: `${nodo.posicion_x}%`, top: `${nodo.posicion_y}%` }}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-28 h-12 md:w-32 md:h-14 rounded-full border-4 transition-all duration-300 shadow-md flex items-center justify-center
                  ${nodo.completada   ? 'bg-blue-100 border-blue-500 text-blue-800'   : 'bg-white border-blue-400 text-gray-700'}
                  ${!nodo.desbloqueada ? 'bg-gray-100 border-gray-300 text-gray-400 opacity-70 cursor-not-allowed' : 'hover:scale-110 hover:shadow-lg active:scale-95'}
                  ${tecnicaSeleccionada?.id === nodo.id ? 'ring-4 ring-blue-300 ring-opacity-50 scale-105' : ''}
                `}
              >
                <span className="font-bold text-sm md:text-base tracking-wide">{nodo.nombre}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Panel de detalles */}
        <aside className="w-full lg:w-96 bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col h-full">
          {tecnicaSeleccionada ? (
            <div className="space-y-6 flex flex-col h-full">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{tecnicaSeleccionada.nombre}</h2>
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    tecnicaSeleccionada.completada   ? 'bg-green-100 text-green-700'  :
                    tecnicaSeleccionada.desbloqueada ? 'bg-blue-100 text-blue-700'   :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {tecnicaSeleccionada.completada ? 'Dominada' : tecnicaSeleccionada.desbloqueada ? 'En progreso' : 'Bloqueada'}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">{tecnicaSeleccionada.descripcion}</p>
              </div>

              <div className="aspect-[4/3] w-full rounded-xl overflow-hidden shadow-inner bg-gray-100 border border-gray-100">
                <img
                  src="/EjemploProyecto.png"
                  alt={`Ejemplo de ${tecnicaSeleccionada.nombre}`}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${!tecnicaSeleccionada.desbloqueada ? 'grayscale blur-[2px]' : ''}`}
                />
              </div>

              <div className="mt-auto pt-6">
                {tecnicaSeleccionada.desbloqueada ? (
                  <Link href={`/tecnica/${tecnicaSeleccionada.id}`} className="block w-full">
                    <button className="w-full py-3.5 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-md flex justify-center items-center gap-2">
                      Ver actividades
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </Link>
                ) : (
                  <div className="w-full py-3.5 bg-gray-100 text-gray-500 rounded-xl font-semibold text-center border border-gray-200">
                    Completa las técnicas anteriores para desbloquear
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400 text-center flex-col gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <p className="text-lg">Selecciona una técnica en el mapa</p>
            </div>
          )}
        </aside>
      </main>
    </div>
  );
}