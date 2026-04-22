'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/ui'; // Reutilizando el componente de Mayte
import { TecnicaNodo } from '@/types/arbol';

export default function DashboardPage() {
  const [nodos, setNodos] = useState<TecnicaNodo[]>([]);
  const [tecnicaSeleccionada, setTecnicaSeleccionada] = useState<TecnicaNodo | null>(null);

  useEffect(() => {
    // Datos simulados con el flujo exacto de tu diseño y coordenadas precisas
    const mockData: TecnicaNodo[] = [
      // Nivel 1
      { id: 1, nombre: 'Grafito', descripcion: 'La técnica base por excelencia. Aprende a dominar los trazos, las sombras y los volúmenes usando lápices de diferentes durezas.', imagen_url: '/EjemploProyecto.png', desbloqueada: true, completada: true, posicion_x: 50, posicion_y: 10, dependencias: [] },
      // Nivel 2
      { id: 2, nombre: 'Carboncillo', descripcion: 'Sombreado intenso y difuminados dramáticos. Ideal para retratos y alto contraste.', imagen_url: '/EjemploProyecto.png', desbloqueada: true, completada: false, posicion_x: 30, posicion_y: 35, dependencias: [1] },
      { id: 3, nombre: 'Acuarela', descripcion: 'Pintura basada en agua. Domina la transparencia, los lavados y el control de la humedad.', imagen_url: '/EjemploProyecto.png', desbloqueada: true, completada: false, posicion_x: 70, posicion_y: 35, dependencias: [1] },
      // Nivel 3
      { id: 4, nombre: 'Grabado', descripcion: 'Técnicas de impresión como linóleo o punta seca. Requiere precisión y paciencia.', imagen_url: '/EjemploProyecto.png', desbloqueada: false, completada: false, posicion_x: 30, posicion_y: 65, dependencias: [2] },
      { id: 5, nombre: 'Óleo', descripcion: 'Pintura de secado lento y colores vibrantes. Perfecta para mezclas suaves y texturas.', imagen_url: '/EjemploProyecto.png', desbloqueada: false, completada: false, posicion_x: 60, posicion_y: 65, dependencias: [3] },
      { id: 6, nombre: 'Acrílico', descripcion: 'Pintura de secado rápido. Versátil y vibrante, ideal para múltiples capas.', imagen_url: '/EjemploProyecto.png', desbloqueada: false, completada: false, posicion_x: 80, posicion_y: 65, dependencias: [3] },
      // Nivel 4
      { id: 7, nombre: 'Escultura', descripcion: 'Modelado en 3D utilizando arcilla, yeso u otros materiales para dar vida a tus ideas.', imagen_url: '/EjemploProyecto.png', desbloqueada: false, completada: false, posicion_x: 30, posicion_y: 90, dependencias: [4] },
    ];
    setNodos(mockData);
    
    // Seleccionar Grafito por defecto al cargar
    setTecnicaSeleccionada(mockData[0]);
  }, []);

  // Función para dibujar las líneas conectoras del SVG
  const renderizarLineas = () => {
    return nodos.map((nodo) => {
      return nodo.dependencias.map((depId) => {
        const padre = nodos.find((n) => n.id === depId);
        if (!padre) return null;

        const colorLinea = nodo.desbloqueada ? '#3b82f6' : '#d1d5db'; // Azul si está desbloqueada, gris si no
        const strokeWidth = nodo.desbloqueada ? 4 : 2;

        return (
          <line
            key={`line-${padre.id}-${nodo.id}`}
            x1={`${padre.posicion_x}%`}
            y1={`${padre.posicion_y}%`}
            x2={`${nodo.posicion_x}%`}
            y2={`${nodo.posicion_y}%`}
            stroke={colorLinea}
            strokeWidth={strokeWidth}
            strokeDasharray={!nodo.desbloqueada ? '5,5' : '0'} // Línea punteada si está bloqueada
            className="transition-all duration-500 ease-in-out"
          />
        );
      });
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="container mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 flex-1 h-[calc(100vh-80px)]">
        {/* Lado Izquierdo: Mapa de Técnicas */}
        <section className="flex-1 bg-white rounded-2xl shadow-sm relative overflow-hidden border border-gray-200 min-h-[500px]">
          {/* Capa inferior: Líneas SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {renderizarLineas()}
          </svg>
          
          {/* Capa superior: Nodos Interactivos */}
          <div className="relative z-10 w-full h-full">
            {nodos.map((nodo) => (
              <button
                key={nodo.id}
                onClick={() => setTecnicaSeleccionada(nodo)}
                style={{ left: `${nodo.posicion_x}%`, top: `${nodo.posicion_y}%` }}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-28 h-12 md:w-32 md:h-14 rounded-full border-4 transition-all duration-300 shadow-md flex items-center justify-center
                  ${nodo.completada ? 'bg-blue-100 border-blue-500 text-blue-800' : 'bg-white border-blue-400 text-gray-700'}
                  ${!nodo.desbloqueada ? 'bg-gray-100 border-gray-300 text-gray-400 opacity-70 cursor-not-allowed hover:scale-100' : 'hover:scale-110 hover:shadow-lg active:scale-95'}
                  ${tecnicaSeleccionada?.id === nodo.id ? 'ring-4 ring-blue-300 ring-opacity-50 scale-105' : ''}
                `}
              >
                <span className="font-bold text-sm md:text-base tracking-wide">{nodo.nombre}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Lado Derecho: Panel de Detalles */}
        <aside className="w-full lg:w-96 bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col h-full transition-all">
          {tecnicaSeleccionada ? (
            <div className="space-y-6 flex flex-col h-full">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{tecnicaSeleccionada.nombre}</h2>
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${tecnicaSeleccionada.completada ? 'bg-green-100 text-green-700' : tecnicaSeleccionada.desbloqueada ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                    {tecnicaSeleccionada.completada ? 'Dominada' : tecnicaSeleccionada.desbloqueada ? 'En progreso' : 'Bloqueada'}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {tecnicaSeleccionada.descripcion}
                </p>
              </div>

              {/* Contenedor de la imagen estilizado */}
              <div className="aspect-[4/3] w-full rounded-xl overflow-hidden shadow-inner bg-gray-100 border border-gray-100 mt-4 relative">
                {/* Utilizamos una de las imágenes que subió Mayte al repositorio para mantener la consistencia */}
                <img 
                  src="/EjemploProyecto.png" 
                  alt={`Ejemplo de ${tecnicaSeleccionada.nombre}`} 
                  className={`w-full h-full object-cover transition-opacity duration-300 ${!tecnicaSeleccionada.desbloqueada ? 'grayscale blur-[2px]' : ''}`}
                />
              </div>

              <div className="mt-auto pt-6">
                {tecnicaSeleccionada.desbloqueada ? (
                  <Link href={`/tecnica/${tecnicaSeleccionada.id}`} className="block w-full">
                    <button className="w-full py-3.5 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-md hover:shadow-lg active:scale-[0.98] flex justify-center items-center gap-2">
                      Ver actividades
                      {/* Ícono de flecha simple */}
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
              <p className="text-lg">Selecciona una técnica en el mapa para ver los detalles</p>
            </div>
          )}
        </aside>
      </main>
    </div>
  );
}