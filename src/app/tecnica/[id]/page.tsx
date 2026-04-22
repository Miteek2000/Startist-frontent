'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import { TecnicaCard } from '@/components/tecnica/TecnicaCard';
import { GaleriaReferencia } from '@/components/tecnica/GaleriaReferencia';
import { getTecnicaById, getTarjetasByTecnica, getGaleriaByTecnica } from '@/lib/tecnicas';

interface TecnicaPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function TecnicaPage({ params }: TecnicaPageProps) {
  const { id } = use(params);
  const [tecnicas, setTecnicas] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [galeria, setGaleria] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setIsLoading(true);
        
        const tarjetas = await getTarjetasByTecnica(id);
        

        const tecnicasConDetalles = tarjetas.map((tarjeta) => ({
          id_tarjeta: tarjeta.id_tarjeta,
          nombre: tarjeta.titulo,
          descripcion: tarjeta.descripcion || 'Aprende esta técnica paso a paso',
        }));
        
        setTecnicas(tecnicasConDetalles);
        

        const obrasGaleria = await getGaleriaByTecnica(id, 8);
        setGaleria(obrasGaleria);
      } catch (error) {
        console.error('Error cargando datos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    cargarDatos();
  }, [id]);

  const handleNext = () => {
    if (currentIndex < tecnicas.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FEF7F3' }}>
        <p style={{ color: '#815629' }}>Cargando...</p>
      </div>
    );
  }

  const tecnicaActual = tecnicas[currentIndex];

  return (
    <div className="min-h-screen px-6 py-12" style={{ backgroundColor: '#FEF7F3' }}>
      <div className="max-w-4xl mx-auto">
        {tecnicaActual && (
          <>
            <TecnicaCard
              tecnica={tecnicaActual}
              currentIndex={currentIndex}
              totalCards={tecnicas.length}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
            
            {galeria.length > 0 && <GaleriaReferencia obras={galeria} />}
          </>
        )}
      </div>
    </div>
  );
}
