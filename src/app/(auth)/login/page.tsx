'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setError('');
    
    try {
      // Ajusta la URL según el .env que configuramos
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: email, contrasena: password }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        login(data.token, data.user);
      } else {
        setError(data.message || 'Credenciales incorrectas');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Columna Izquierda: Formulario */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 xl:px-32">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Bienvenido de nuevo</h2>
            <p className="text-gray-600">Ingresa a Startist y continúa tu camino artístico.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
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
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-gray-700">Contraseña</label>
                <a href="#" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">¿Olvidaste tu contraseña?</a>
              </div>
              <input
                type="password"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black focus:border-black transition-all outline-none"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="w-full py-3.5 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]">
              Iniciar Sesión
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            ¿Aún no tienes una cuenta?{' '}
            <Link href="/registro" className="font-bold text-black hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>

      {/* Columna Derecha: Imagen decorativa */}
      <div className="hidden lg:block lg:w-1/2 relative bg-gray-100">
        <img 
          src="/EjemploProyecto.png" 
          alt="Arte en Startist" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay oscuro opcional para que la imagen no brille tanto */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
    </div>
  );
}