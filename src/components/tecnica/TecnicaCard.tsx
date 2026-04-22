'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SubirArchivoModal } from './SubirArchivoModal';
import { useAuth } from '@/context/AuthContext';

interface TecnicaCardProps {
  tecnica: {
    id_tarjeta: number;
    nombre: string;
    descripcion: string;
    completada: boolean;
  };
  currentIndex: number;
  totalCards: number;
  onNext: () => void;
  onPrevious: () => void;
  onProyectoSubido: () => void;
}

export function TecnicaCard({
  tecnica,
  currentIndex,
  totalCards,
  onNext,
  onPrevious,
  onProyectoSubido,
}: TecnicaCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = useAuth();

  const handleUploadSubmit = async (archivo: File, descripcion: string, titulo: string) => {
    if (!token) throw new Error('No autenticado');

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descripcion', descripcion);
    formData.append('tarjeta_id', String(tecnica.id_tarjeta));
    formData.append('archivo', archivo);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/proyectos`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData,
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || `Error ${response.status}`);
    }

    setIsModalOpen(false);
    onProyectoSubido();
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      {/* Decoración de fondo */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/4 opacity-40 pointer-events-none">
        <div className="relative w-80 h-96">
          <div className="absolute inset-0 bg-gray-400 transform -rotate-12 rounded-lg" />
          <div className="absolute inset-0 bg-amber-400 transform -rotate-6 rounded-lg translate-x-4" />
          <div className="absolute inset-0 bg-white transform rotate-2 rounded-lg translate-x-8" />
        </div>
      </div>

      <div
        className="relative bg-white rounded-3xl p-10 max-w-2xl w-full shadow-2xl z-10"
        style={{ boxShadow: '-4px 4px 12px rgba(0, 0, 0, 0.1)' }}
      >
        {/* Flecha de regreso al mapa */}
        <Link
          href="/dashboard"
          className="absolute top-6 left-8 flex items-center gap-1.5 text-sm font-semibold transition-all hover:gap-2.5"
          style={{ color: '#D1924F' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Mapa de habilidades
        </Link>

        {/* Badge completada */}
        {tecnica.completada && (
          <div
            className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{ backgroundColor: '#DCFCE7', color: '#15803D' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Completada
          </div>
        )}

        {/* Título con espacio para los botones de las esquinas */}
        <h1 className="text-4xl font-bold mt-8 mb-6 pr-12" style={{ color: '#333' }}>
          {tecnica.nombre}
        </h1>

        <p className="text-base mb-10 leading-relaxed" style={{ color: '#333' }}>
          {tecnica.descripcion}
        </p>

        <div className="flex gap-4 mb-8">
          {tecnica.completada ? (
            <div
              className="px-8 py-3 rounded-full text-sm font-semibold flex items-center gap-2 cursor-not-allowed"
              style={{ backgroundColor: '#F3F4F6', color: '#9CA3AF', border: '2px solid #E5E7EB' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Ya entregaste esta tarjeta
            </div>
          ) : (
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-3 rounded-full font-semibold text-sm transition-all hover:shadow-md border-2 flex items-center gap-2"
              style={{ borderColor: '#D1924F', color: '#D1924F' }}
            >
              <Image src="/SubirProyecto.png" alt="Subir" width={20} height={20} />
              Subir Archivo
            </button>
          )}
        </div>

        {/* Navegación entre tarjetas */}
        <div
          className="flex items-center justify-between mt-8 pt-6"
          style={{ borderTop: '1px solid #E8E8E8' }}
        >
          <span style={{ color: '#815629' }} className="text-sm font-medium">
            {currentIndex + 1} / {totalCards}
          </span>

          <div className="flex gap-2">
            <button
              onClick={onPrevious}
              disabled={currentIndex === 0}
              className="p-2 rounded-full transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md"
              style={{ backgroundColor: currentIndex === 0 ? '#E8E8E8' : '#D1924F', color: 'white' }}
            >
              ◀
            </button>
            <button
              onClick={onNext}
              disabled={currentIndex === totalCards - 1}
              className="p-2 rounded-full transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md"
              style={{ backgroundColor: currentIndex === totalCards - 1 ? '#E8E8E8' : '#D1924F', color: 'white' }}
            >
              ▶
            </button>
          </div>
        </div>
      </div>

      <SubirArchivoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleUploadSubmit}
      />
    </div>
  );
}