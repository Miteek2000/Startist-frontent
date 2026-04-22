const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_TOKEN = process.env.API_TOKEN;

export async function getTecnicaById(tecnicaId: string | number): Promise<any> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (API_TOKEN) {
      headers['Authorization'] = `Bearer ${API_TOKEN}`;
    }

    const response = await fetch(`${API_URL}/tecnicas/${tecnicaId}`, {
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
    console.error('Error in getTecnicaById:', error);
    return null;
  }
}

export async function getTarjetasByTecnica(tecnicaId: string | number): Promise<any[]> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (API_TOKEN) {
      headers['Authorization'] = `Bearer ${API_TOKEN}`;
    }

    const response = await fetch(`${API_URL}/tecnicas/${tecnicaId}/tarjetas`, {
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
    console.error('Error in getTarjetasByTecnica:', error);
    return [];
  }
}

export async function getGaleriaByTecnica(tecnicaId: string | number, limit: number = 20): Promise<any[]> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (API_TOKEN) {
      headers['Authorization'] = `Bearer ${API_TOKEN}`;
    }

    const response = await fetch(`${API_URL}/tecnicas/${tecnicaId}/galeria?limit=${limit}`, {
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
    
    return data.data || data.obras || [];
  } catch (error) {
    console.error('Error in getGaleriaByTecnica:', error);
    return [];
  }
}

export async function subirProyecto(
  titulo: string,
  archivoUrl: string,
  descripcion: string,
  tarjeta_id: string | number
): Promise<boolean> {
  try {
    const response = await fetch('/api/proyectos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        titulo,
        archivo: archivoUrl,
        descripcion,
        tarjeta_id,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Error in subirProyecto:', error);
    throw error;
  }
}
