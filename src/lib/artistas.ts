import { Artista, ApiResponse } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_TOKEN = process.env.API_TOKEN;

export async function getArtistas(): Promise<Artista[]> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Usar token de variable de entorno en servidor
    if (API_TOKEN) {
      headers['Authorization'] = `Bearer ${API_TOKEN}`;
    }

    const response = await fetch(`${API_URL}/artistas`, {
      method: 'GET',
      headers,
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    // El API devuelve un array directamente
    if (Array.isArray(data)) {
      return data;
    }
    
    // Si devuelve un objeto con data
    return data.data || [];
  } catch (error) {
    console.error('Error in getArtistas:', error);
    return [];
  }
}
