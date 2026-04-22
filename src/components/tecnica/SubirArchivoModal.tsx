'use client';

import { useState } from 'react';

interface SubirArchivoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (archivo: File, descripcion: string, titulo: string) => Promise<void>;
}

export function SubirArchivoModal({ isOpen, onClose, onSubmit }: SubirArchivoModalProps) {
  const [archivo, setArchivo]       = useState<File | null>(null);
  const [titulo, setTitulo]         = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [isLoading, setIsLoading]   = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError]           = useState(''); // ← nuevo

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setArchivo(file);
      setError('');
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleClose = () => {
    setArchivo(null);
    setTitulo('');
    setDescripcion('');
    setPreviewUrl(null);
    setError('');
    onClose();
  };

  const handleSubmit = async () => {
    setError('');

    if (!archivo) {
      setError('Por favor selecciona una imagen.');
      return;
    }
    if (!titulo.trim()) {
      setError('Por favor agrega un título.');
      return;
    }
    if (!descripcion.trim()) {
      setError('Por favor agrega una descripción.');
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit(archivo, descripcion, titulo);
      setArchivo(null);
      setTitulo('');
      setDescripcion('');
      setPreviewUrl(null);
    } catch (err: any) {
      setError(err?.message || 'Ocurrió un error al subir el archivo. Intenta de nuevo.');
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
          Subir Archivo
        </h2>

        {/* Banner de error */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {previewUrl && (
            <div className="rounded-lg overflow-hidden border-2" style={{ borderColor: '#D1924F' }}>
              <img src={previewUrl} alt="Preview" className="w-full h-40 object-cover" />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold mb-2 text-left" style={{ color: '#815629' }}>
              Imagen
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none"
              style={{ borderColor: '#D1924F', color: '#333' }}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-left" style={{ color: '#815629' }}>
              Título
            </label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none"
              style={{ borderColor: '#D1924F', color: '#333' }}
              placeholder="Nombre del proyecto"
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
              placeholder="Describe tu trabajo..."
              rows={4}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="flex-1 px-4 py-3 rounded-full font-semibold text-sm transition-colors disabled:opacity-50"
            style={{ backgroundColor: '#E0E0E0', color: '#333' }}
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-1 px-4 py-3 rounded-full text-white font-semibold text-sm transition-colors disabled:opacity-50"
            style={{ backgroundColor: '#D1924F' }}
          >
            {isLoading ? 'Subiendo...' : 'Subir'}
          </button>
        </div>
      </div>
    </div>
  );
}