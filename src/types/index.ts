export interface Artista {
  id_artista: string | number;
  nombre: string;
  descripcion: string;
  imagen?: string;
  tecnicas?: string[];
  fecha_registro?: string;
}

export interface ApiResponse<T> {
  success?: boolean;
  data?: T;
  message?: string;
}
