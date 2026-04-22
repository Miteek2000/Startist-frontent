'use client';

import { Artista } from '@/types/artistas';
import { useState } from 'react';

interface EditProfileModalProps {
  isOpen: boolean;
  artista: Artista;
  onClose: () => void;
  onSave: (nombre: string, descripcion: string) => Promise<void>;
}

export function EditProfileModal({ isOpen, artista, onClose, onSave }: EditProfileModalProps) {
  const [nombre, setNombre] = useState(artista.nombre);
  const [descripcion, setDescripcion] = useState(artista.descripcion);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave(nombre, descripcion);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
    >
      <div 
        className="bg-white rounded-3xl p-8 w-full max-w-md"
        style={{ boxShadow: '-4px 4px 12px rgba(0, 0, 0, 0.1)' }}
      >
        <h2 
          className="text-3xl font-semibold mb-6"
          style={{ fontFamily: 'var(--font-playfair)', color: '#333' }}
        >
          Editar perfil
        </h2>

        <div className="space-y-4">

          <div>
            <label 
              className="block text-sm font-semibold mb-2 text-left"
              style={{ color: '#815629' }}
            >
              Nombre
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-2"
              style={{ borderColor: '#D1924F', color: '#333' }}
              placeholder="Tu nombre"
            />
          </div>


          <div>
            <label 
              className="block text-sm font-semibold mb-2 text-left"
              style={{ color: '#815629' }}
            >
              Descripción
            </label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none resize-none"
              style={{ borderColor: '#D1924F', color: '#333' }}
              placeholder="Cuéntanos sobre ti..."
              rows={4}
            />
          </div>
        </div>


        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2 rounded-full font-semibold text-sm transition-colors"
            style={{ backgroundColor: '#E0E0E0', color: '#333' }}
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="flex-1 px-4 py-2 rounded-full text-white font-semibold text-sm transition-colors"
            style={{ backgroundColor: '#D1924F' }}
          >
            {isLoading ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </div>
    </div>
  );
}
