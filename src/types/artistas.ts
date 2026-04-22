export interface Artista {
  id_artista: string | number;
  nombre: string;
  descripcion: string;
  imagen?: string;
  tecnicas?: string[];
  fecha_registro?: string;
}

export interface Proyecto {
  id_proyecto: string | number;
  proyecto_titulo?: string;
  archivo?: string;
  proyecto_descripcion?: string;
  tecnica_nombre?: string;
  artista_id?: string | number;
  artista_nombre?: string;
  id_tarjeta?: string | number;
  tarjeta_titulo?: string;
  id_tecnica?: string | number;
}

export interface ArtistaPerfil extends Artista {}
