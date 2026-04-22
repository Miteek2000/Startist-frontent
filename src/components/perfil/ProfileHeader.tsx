'use client';

import { Artista } from '@/types/artistas';
import { TecnicaArbol } from '@/types/tecnicas';
import { EditProfileModal } from './EditProfileModal';
import { updateArtistaProfile } from '@/lib/artistas';
import { useState } from 'react';

interface ProfileHeaderProps {
  artista: Artista;
  tecnicas: TecnicaArbol[];
}

export function ProfileHeader({ artista, tecnicas }: ProfileHeaderProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleSaveProfile = async (nombre: string, descripcion: string) => {
    try {
      await updateArtistaProfile(artista.id_artista, { nombre, descripcion });
      console.log('Perfil actualizado exitosamente');
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      throw error;
    }
  };
  return (
    <div 
      className="bg-white rounded-3xl shadow-sm p-8 mb-8 flex flex-col items-center text-center"
      style={{ boxShadow: '-4px 4px 12px rgba(0, 0, 0, 0.1)' }}
    >

      <div
        className="w-24 h-24 rounded-full flex items-center justify-center mb-6 flex-shrink-0"
        style={{ backgroundColor: '#F2D8BD' }}
      >
        <svg
          width="60"
          height="60"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="24" cy="14" r="7" fill="#C9945E" />
          <path
            d="M 10 28 Q 10 22 24 22 Q 38 22 38 28 L 38 35 Q 38 38 35 38 L 13 38 Q 10 38 10 35 Z"
            fill="#C9945E"
          />
        </svg>
      </div>


      <h1 
        className="text-4xl font-semibold mb-2" 
        style={{ fontFamily: 'var(--font-playfair)', color: '#333' }}
      >
        {artista.nombre}
      </h1>
      <p className="text-lg mb-4" style={{ color: '#815629' }}>
        {artista.descripcion}
      </p>


      <div className="flex gap-12 mb-6">
        <div className="text-center">
          <p className="text-2xl font-bold" style={{ color: '#D1924F' }}>
            {tecnicas.reduce((sum, t) => sum + t.tarjetas_completadas, 0)}
          </p>
          <p className="text-sm" style={{ color: '#815629' }}>Tarjetas completadas</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold" style={{ color: '#D1924F' }}>
            {tecnicas.filter(t => t.desbloqueada).length}
          </p>
          <p className="text-sm" style={{ color: '#815629' }}>Técnicas desbloqueadas</p>
        </div>
      </div>


      <button
        onClick={() => setIsEditModalOpen(true)}
        className="px-6 py-2 rounded-full text-white font-semibold text-sm"
        style={{ backgroundColor: '#D1924F' }}
      >
        Editar perfil
      </button>

      <EditProfileModal 
        isOpen={isEditModalOpen}
        artista={artista}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProfile}
      />
    </div>
  );
}
