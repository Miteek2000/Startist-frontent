import { ArbolRespuesta } from "@/types/arbol";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchArbol = async (token: string): Promise<ArbolRespuesta> => {
  const res = await fetch(`${API_BASE_URL}/arbol`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) throw new Error('Error al obtener el mapa de técnicas');
  return res.json();
};