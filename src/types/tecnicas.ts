export interface Tarjeta {
  id_tarjeta: string | number;
  titulo: string;
  descripcion?: string;
  completada: boolean;
}

export interface TecnicaArbol {
  id_tecnica: string | number;
  nombre: string;
  tecnica_padre_id?: string | number | null;
  desbloqueada: boolean;
  completada: boolean;
  total_tarjetas: number;
  tarjetas_completadas: number;
  tarjetas: Tarjeta[];
}

export interface ArbolTecnicas extends Array<TecnicaArbol> {}
