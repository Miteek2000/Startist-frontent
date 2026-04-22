import { Artista, Proyecto, ArtistaPerfil } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_TOKEN = process.env.API_TOKEN;

const getHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (API_TOKEN) {
    headers['Authorization'] = `Bearer ${API_TOKEN}`;
  }
  return headers;
};

export async function getTecnicasDesbloqueadas(): Promise<any[]> {
  try {
    const response = await fetch(`${API_URL}/arbol`, {
      method: 'GET',
      headers: getHeaders(),
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : (data.data || []);
  } catch (error) {
    console.error('Error in getTecnicasDesbloqueadas:', error);
    return [];
  }
}

export async function getArtistas(): Promise<Artista[]> {
  try {
    const response = await fetch(`${API_URL}/artistas`, {
      method: 'GET',
      headers: getHeaders(),
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : (data.data || []);
  } catch (error) {
    console.error('Error in getArtistas:', error);
    return [];
  }
}

export async function getProyectosByArtista(artistaId: string | number): Promise<Proyecto[]> {
  try {
    const response = await fetch(`${API_URL}/artistas/${artistaId}/proyectos`, {
      method: 'GET',
      headers: getHeaders(),
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : (data.data || []);
  } catch (error) {
    console.error('Error in getProyectosByArtista:', error);
    return [];
  }
}

export async function getArtistaById(artistaId: string | number): Promise<ArtistaPerfil | null> {
  try {
    const response = await fetch(`${API_URL}/artistas/${artistaId}`, {
      method: 'GET',
      headers: getHeaders(),
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.data || data || null;
  } catch (error) {
    console.error('Error in getArtistaById:', error);
    return null;
  }
}

export async function updateArtistaProfile(
  artistaId: string | number,
  data: { nombre: string; descripcion: string }
): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/artistas/${artistaId}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(data),
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Error in updateArtistaProfile:', error);
    throw error;
  }

}