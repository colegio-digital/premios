export interface Nominee {
  id: string;
  name: string;
  workOrProject: string; // Película, Obra, Corto o Proyecto
  description?: string;
  avatarUrl?: string;
}

export interface Category {
  id: string; // Identificador para el scroll suave (ej: 'categoria-1')
  number: number; // Número de categoría (1 al 14)
  title: string; // Nombre de la categoría (ej: 'Mejor Película')
  description: string; // Descripción breve de la categoría
  youtubeId: string; // ID del video de YouTube (ej: 'fmErhmOOLXU')
  nominees: Nominee[]; // Lista de nominados
  iconName?: string;
}

export interface EventInfo {
  name: string;
  edition: string;
  subtitle: string;
  year: number;
  location: string;
  dateText: string;
}
