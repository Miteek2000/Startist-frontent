'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SubirArchivoModal } from './SubirArchivoModal';
import { useAuth } from '@/context/AuthContext';

interface TecnicaCardProps {
  tecnica: any;
  currentIndex: number;
  totalCards: number;
  onNext: () => void;
  onPrevious: () => void;
}

export function TecnicaCard({ tecnica, currentIndex, totalCards, onNext, onPrevious }: TecnicaCardProps) {
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
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || `Error ${response.status}`);
    }

    setIsModalOpen(false);
    alert('¡Proyecto subido exitosamente! 🎨');
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      {/* Decoración de fondo */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/4 opacity-40 pointer-events-none">
        <div className="relative w-80 h-96">
          <div className="absolute inset-0 bg-gray-400 transform -rotate-12 rounded-lg"></div>
          <div className="absolute inset-0 bg-amber-400 transform -rotate-6 rounded-lg translate-x-4"></div>
          <div className="absolute inset-0 bg-white transform rotate-2 rounded-lg translate-x-8"></div>
        </div>
      </div>

      <div
        className="relative bg-white rounded-3xl p-10 max-w-2xl w-full shadow-2xl z-10"
        style={{ boxShadow: '-4px 4px 12px rgba(0, 0, 0, 0.1)' }}
      >
        <h1
          className="text-4xl font-bold mb-6 pr-12"
          style={{ color: '#333' }}
        >
          {tecnica.nombre}
        </h1>

        <p className="text-base mb-10 leading-relaxed" style={{ color: '#333' }}>
          {tecnica.descripcion}
        </p>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-3 rounded-full font-semibold text-sm transition-all hover:shadow-md border-2 flex items-center gap-2"
            style={{ borderColor: '#D1924F', color: '#D1924F' }}
          >
            <Image src="/SubirProyecto.png" alt="Subir" width={20} height={20} />
            Subir Archivo
          </button>
        </div>

        <div className="flex items-center justify-between mt-8 pt-6" style={{ borderTop: '1px solid #E8E8E8' }}>
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