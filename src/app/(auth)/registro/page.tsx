'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function RegistroPage() {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/registro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          nombre: username, 
          descripcion: description,
          contrasena: password 
        }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        login(data.token, data.artista);
      } else {
        setError(data.message || 'Error al crear la cuenta');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <div className="flex min-h-screen bg-white flex-row-reverse">
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 xl:px-32">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Crea tu perfil</h2>
            <p className="text-gray-600">Únete a la comunidad de artistas.</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre de usuario</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-500 text-gray-900 focus:ring-2 focus:ring-black focus:border-black transition-all outline-none placeholder-gray-500"
                placeholder="Ej. ArtistaPro"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Descripción</label>
              <textarea
                required
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-500 text-gray-900 focus:ring-2 focus:ring-black focus:border-black transition-all outline-none resize-none placeholder-gray-500"
                placeholder="Cuéntanos sobre tu estilo..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Contraseña</label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-500 text-gray-900 focus:ring-2 focus:ring-black focus:border-black transition-all outline-none placeholder-gray-500"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Confirmar</label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-500 text-gray-900 focus:ring-2 focus:ring-black focus:border-black transition-all outline-none placeholder-gray-500"
                  placeholder="••••••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="w-full py-3.5 mt-2 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all shadow-lg active:scale-[0.98]">
              Registrarme
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            ¿Ya eres miembro? <Link href="/login" className="font-bold text-black hover:underline">Inicia sesión</Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/2 relative">
        <img src="/login_welcome_photo.jpg" alt="Startist Art" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
    </div>
  );
}