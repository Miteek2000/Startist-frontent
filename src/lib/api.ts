import { Artista, ApiResponse } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Obtener token del localStorage
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
}

export async function getArtistas(): Promise<Artista[]> {
  try {
    const response = await fetch(`${API_URL}/artistas`, {
      method: 'GET',
      headers: getAuthHeaders(),
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Error fetching artistas');
    }

    const data: ApiResponse<Artista[]> = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error in getArtistas:', error);
    return [];
  }
}

// Función para guardar el token
export function setToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
}

// Función para obtener el token
export function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}

// Función para limpiar el token
export function clearToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
}
