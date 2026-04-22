'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  token: string | null;
  user: any | null;
  cargandoAuth: boolean; 
  login: (token: string, user: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [cargandoAuth, setCargandoAuth] = useState(true); 
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem('startist_token');
    const savedUser  = localStorage.getItem('startist_user');

    if (savedToken && savedUser && savedUser !== 'undefined') {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Error al parsear el usuario:', e);
        localStorage.removeItem('startist_token');
        localStorage.removeItem('startist_user');
      }
    }
    setCargandoAuth(false);
  }, []);

  const login = (newToken: string, newUser: any) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('startist_token', newToken);
    localStorage.setItem('startist_user', JSON.stringify(newUser));
    router.push('/dashboard');
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('startist_token');
    localStorage.removeItem('startist_user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ token, user, cargandoAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
};