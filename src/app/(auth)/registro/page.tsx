'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function RegistroPage() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Endpoint de registro configurado en el backend de Paola
      const res = await fetch(`${API_BASE_URL}/auth/registro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          nombre, 
          correo: email, 
          contrasena: password 
        }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        // Asumiendo que el registro también devuelve un token para auto-login
        login(data.token, data.user);
      } else {
        setError(data.message || 'Error al crear la cuenta. Intenta de nuevo.');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <div className="flex min-h-screen bg-white flex-row-reverse">
      {/* Columna Derecha: Formulario (Invertido para darle variedad vs Login) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 xl:px-32">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Crea tu perfil</h2>
            <p className="text-gray-600">Únete a la comunidad y domina nuevas técnicas.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre de artista</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black focus:border-black transition-all outline-none"
                placeholder="Tu nombre o seudónimo"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Correo electrónico</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black focus:border-black transition-all outline-none"
                placeholder="artista@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Contraseña</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black focus:border-black transition-all outline-none"
                placeholder="Mínimo 8 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="w-full py-3.5 mt-2 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]">
              Registrarme
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            ¿Ya eres miembro?{' '}
            <Link href="/login" className="font-bold text-black hover:underline">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>

      {/* Columna Izquierda: Imagen decorativa */}
      <div className="hidden lg:block lg:w-1/2 relative bg-gray-100">
        <img 
          src="/EjemploProyecto.png" 
          alt="Comunidad Startist" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
    </div>
  );
}