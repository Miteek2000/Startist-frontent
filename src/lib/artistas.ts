import { Artista, Proyecto, ArtistaPerfil, ApiResponse } from '@/types';

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
    

    if (Array.isArray(data)) {
      return data;
    }
    

    return data.data || [];
  } catch (error) {
    console.error('Error in getArtistas:', error);
    return [];
  }
}

export async function getProyectosByArtista(artistaId: string | number): Promise<Proyecto[]> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Usar token de variable de entorno en servidor
    if (API_TOKEN) {
      headers['Authorization'] = `Bearer ${API_TOKEN}`;
    }

    const response = await fetch(`${API_URL}/artistas/${artistaId}/proyectos`, {
      method: 'GET',
      headers,
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (Array.isArray(data)) {
      return data;
    }
    
    return data.data || [];
  } catch (error) {
    console.error('Error in getProyectosByArtista:', error);
    return [];
  }
}


export async function getArtistaById(artistaId: string | number): Promise<ArtistaPerfil | null> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (API_TOKEN) {
      headers['Authorization'] = `Bearer ${API_TOKEN}`;
    }

    const response = await fetch(`${API_URL}/artistas/${artistaId}`, {
      method: 'GET',
      headers,
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

export async function getTecnicasDesbloqueadas(): Promise<any[]> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (API_TOKEN) {
      headers['Authorization'] = `Bearer ${API_TOKEN}`;
    }

    const response = await fetch(`${API_URL}/arbol`, {
      method: 'GET',
      headers,
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (Array.isArray(data)) {
      return data;
    }
    
    return data.data || [];
  } catch (error) {
    console.error('Error in getTecnicasDesbloqueadas:', error);
    return [];
  }
}

export async function updateArtistaProfile(artistaId: string | number, data: { nombre: string; descripcion: string }): Promise<boolean> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (API_TOKEN) {
      headers['Authorization'] = `Bearer ${API_TOKEN}`;
    }

    const response = await fetch(`${API_URL}/artistas/${artistaId}`, {
      method: 'PATCH',
      headers,
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
