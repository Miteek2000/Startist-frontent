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
  const [nombre, setNombre]         = useState(artista.nombre);
  const [descripcion, setDescripcion] = useState(artista.descripcion);
  const [isLoading, setIsLoading]   = useState(false);
  const [error, setError]           = useState(''); // ← nuevo
  const [exito, setExito]           = useState(false); // ← nuevo

  const handleSave = async () => {
    setError('');
    setExito(false);

    if (!nombre.trim()) {
      setError('El nombre no puede estar vacío.');
      return;
    }

    setIsLoading(true);
    try {
      await onSave(nombre, descripcion);
      setExito(true);
      setTimeout(() => {
        setExito(false);
        onClose();
      }, 800);
    } catch (err: any) {
      setError(err?.message || 'No se pudo actualizar el perfil. Intenta de nuevo.');
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
        <h2 className="text-3xl font-semibold mb-6" style={{ color: '#333' }}>
          Editar perfil
        </h2>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
            {error}
          </div>
        )}

        {/* Éxito */}
        {exito && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm font-medium">
            ¡Perfil actualizado correctamente!
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-left" style={{ color: '#815629' }}>
              Nombre
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none"
              style={{ borderColor: '#D1924F', color: '#333' }}
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-left" style={{ color: '#815629' }}>
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
            className="flex-1 px-4 py-2 rounded-full font-semibold text-sm transition-colors disabled:opacity-50"
            style={{ backgroundColor: '#E0E0E0', color: '#333' }}
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="flex-1 px-4 py-2 rounded-full text-white font-semibold text-sm transition-colors disabled:opacity-50"
            style={{ backgroundColor: '#D1924F' }}
          >
            {isLoading ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </div>
    </div>
  );
}