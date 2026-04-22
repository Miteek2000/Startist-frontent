export interface Dependencia {
  id: number;
  nombre: string;
}

export interface TecnicaNodo {
  id: number;
  nombre: string;
  descripcion: string;
  imagen_url: string;
  desbloqueada: boolean;
  completada: boolean;
  posicion_x: number; // Para el layout del mapa
  posicion_y: number;
  dependencias: number[]; // IDs de las técnicas de las que depende
}

export interface ArbolRespuesta {
  artista_id: number;
  progreso_total: number;
  nodos: TecnicaNodo[];
}