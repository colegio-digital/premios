import { Category, EventInfo } from '../types';

export const EVENT_INFO: EventInfo = {
  name: 'Gala Anual de Premios de Cine & Artes',
  edition: '28ª Edición Anual',
  subtitle: 'Celebrando la excelencia, creatividad e innovación cinematográfica',
  year: new Date().getFullYear(),
  location: 'Gran Teatro de la Gala - Auditorio Principal',
  dateText: 'Transmisión en Vivo & Ceremonia de Gala',
};

/**
 * ==============================================================================
 * 📌 GUÍA DE EDICIÓN RÁPIDA:
 * 
 * 1. PARA CAMBIAR EL VIDEO DE YOUTUBE DE CUALQUIER CATEGORÍA:
 *    Simplemente cambia el valor de 'youtubeId' por el ID de tu video de YouTube.
 *    Ejemplo:
 *      Si la URL del video es: https://www.youtube.com/watch?v=dQw4w9WgXcQ
 *      El youtubeId es: 'dQw4w9WgXcQ'
 * 
 * 2. PARA EDITAR LOS NOMINADOS DE CADA CATEGORÍA:
 *    Modifica los objetos dentro del array 'nominees' de la categoría correspondiente
 *    cambiando los campos 'name' (nombre del nominado) y 'workOrProject' (obra/película).
 * ==============================================================================
 */

export const CATEGORIES: Category[] = [
  {
    id: 'categoria-1',
    number: 1,
    title: 'Mejor Película',
    description: 'Reconocimiento al largometraje más sobresaliente del año en producción, dirección y narrativa.',
    
    // 🔴 INSTRUCCIÓN: Reemplaza 'fmErhmOOLXU' con el ID del video definitivo de YouTube para Mejor Película
    youtubeId: 'fmErhmOOLXU',
    
    // 🔴 INSTRUCCIÓN: Edita los nombres de los nominados y sus obras aquí
    nominees: [
      { id: 'nom-1-1', name: 'Laura Fernández', workOrProject: 'El Silencio de la Luna', description: 'Producción de Alta Cima Studios' },
      { id: 'nom-1-2', name: 'Carlos Mendoza', workOrProject: 'Horizonte Dorado', description: 'Producción de Vanguardia Cine' },
      { id: 'nom-1-3', name: 'Elena Rostova', workOrProject: 'Ecos del Tiempo', description: 'Producción de Mirada Audiovisual' },
      { id: 'nom-1-4', name: 'Mateo Morales', workOrProject: 'La ÚLtima Frontera', description: 'Producción de Solar Film Co.' },
      { id: 'nom-1-5', name: 'Sofía Valenzuela', workOrProject: 'Luces sobre la Ciudad', description: 'Producción de Estudiantil Arte' },
    ],
  },
  {
    id: 'categoria-2',
    number: 2,
    title: 'Mejor Dirección',
    description: 'Premio al director o directora que ha demostrado una visión artística extraordinaria e innovadora.',
    
    // 🔴 INSTRUCCIÓN: Reemplaza 'fmErhmOOLXU' con el ID del video definitivo de YouTube para Mejor Dirección
    youtubeId: 'fmErhmOOLXU',
    
    // 🔴 INSTRUCCIÓN: Edita los nombres de los nominados y sus obras aquí
    nominees: [
      { id: 'nom-2-1', name: 'Alejandro Íñiguez', workOrProject: 'Horizonte Dorado' },
      { id: 'nom-2-2', name: 'Valeria Benítez', workOrProject: 'El Silencio de la Luna' },
      { id: 'nom-2-3', name: 'Gabriel Torres', workOrProject: 'Ecos del Tiempo' },
      { id: 'nom-2-4', name: 'Marina Silva', workOrProject: 'Bajo el Mismo Cielo' },
    ],
  },
  {
    id: 'categoria-3',
    number: 3,
    title: 'Mejor Actor Principal',
    description: 'A la actuación masculina más conmovedora y destacada en un rol protagónico.',
    
    // 🔴 INSTRUCCIÓN: Reemplaza 'fmErhmOOLXU' con el ID del video definitivo de YouTube para Mejor Actor Principal
    youtubeId: 'fmErhmOOLXU',
    
    // 🔴 INSTRUCCIÓN: Edita los nombres de los nominados y sus obras aquí
    nominees: [
      { id: 'nom-3-1', name: 'Ricardo Darín Jr.', workOrProject: 'El Silencio de la Luna', description: 'Rol: Javier Santos' },
      { id: 'nom-3-2', name: 'Diego Luna', workOrProject: 'La Última Frontera', description: 'Rol: Comandante Vega' },
      { id: 'nom-3-3', name: 'Andrés Parra', workOrProject: 'Horizonte Dorado', description: 'Rol: Mateo Baresi' },
      { id: 'nom-3-4', name: 'Javier Bardem', workOrProject: 'El Laberinto Urbano', description: 'Rol: Inspector Cruz' },
    ],
  },
  {
    id: 'categoria-4',
    number: 4,
    title: 'Mejor Actriz Principal',
    description: 'A la interpretación femenina más impactante y memorable en un rol protagónico.',
    
    // 🔴 INSTRUCCIÓN: Reemplaza 'fmErhmOOLXU' con el ID del video definitivo de YouTube para Mejor Actriz Principal
    youtubeId: 'fmErhmOOLXU',
    
    // 🔴 INSTRUCCIÓN: Edita los nombres de los nominados y sus obras aquí
    nominees: [
      { id: 'nom-4-1', name: 'Penélope Cruz', workOrProject: 'Ecos del Tiempo', description: 'Rol: Clara Osorio' },
      { id: 'nom-4-2', name: 'Paulina García', workOrProject: 'Luces sobre la Ciudad', description: 'Rol: Profesora Elena' },
      { id: 'nom-4-3', name: 'Ana de Armas', workOrProject: 'Sombra e Ilusión', description: 'Rol: Beatriz Montero' },
      { id: 'nom-4-4', name: 'Norma Aleandro', workOrProject: 'El Retorno', description: 'Rol: Matilde' },
    ],
  },
  {
    id: 'categoria-5',
    number: 5,
    title: 'Mejor Actor de Reparto',
    description: 'A la interpretación masculina secundaria que enriqueció y fortaleció el desarrollo de la historia.',
    
    // 🔴 INSTRUCCIÓN: Reemplaza 'fmErhmOOLXU' con el ID del video definitivo de YouTube para Mejor Actor de Reparto
    youtubeId: 'fmErhmOOLXU',
    
    // 🔴 INSTRUCCIÓN: Edita los nombres de los nominados y sus obras aquí
    nominees: [
      { id: 'nom-5-1', name: 'Oscar Martínez', workOrProject: 'Horizonte Dorado' },
      { id: 'nom-5-2', name: 'Gael García Bernal', workOrProject: 'El Silencio de la Luna' },
      { id: 'nom-5-3', name: 'Tenoch Huerta', workOrProject: 'La Última Frontera' },
      { id: 'nom-5-4', name: 'Rodrigo Santoro', workOrProject: 'Ecos del Tiempo' },
    ],
  },
  {
    id: 'categoria-6',
    number: 6,
    title: 'Mejor Actriz de Reparto',
    description: 'A la interpretación femenina secundaria de excepcional fuerza expresiva y relevancia narrativa.',
    
    // 🔴 INSTRUCCIÓN: Reemplaza 'fmErhmOOLXU' con el ID del video definitivo de YouTube para Mejor Actriz de Reparto
    youtubeId: 'fmErhmOOLXU',
    
    // 🔴 INSTRUCCIÓN: Edita los nombres de los nominados y sus obras aquí
    nominees: [
      { id: 'nom-6-1', name: 'Sonia Braga', workOrProject: 'Luces sobre la Ciudad' },
      { id: 'nom-6-2', name: 'Maribel Verdú', workOrProject: 'Ecos del Tiempo' },
      { id: 'nom-6-3', name: 'Cecilia Roth', workOrProject: 'El Silencio de la Luna' },
      { id: 'nom-6-4', name: 'Aitana Sánchez-Gijón', workOrProject: 'Sombra e Ilusión' },
    ],
  },
  {
    id: 'categoria-7',
    number: 7,
    title: 'Mejor Guion Original',
    description: 'Premio a la historia original con los diálogos y estructura dramática más auténtica e innovadora.',
    
    // 🔴 INSTRUCCIÓN: Reemplaza 'fmErhmOOLXU' con el ID del video definitivo de YouTube para Mejor Guion Original
    youtubeId: 'fmErhmOOLXU',
    
    // 🔴 INSTRUCCIÓN: Edita los nombres de los nominados y sus obras aquí
    nominees: [
      { id: 'nom-7-1', name: 'Guillermo Arriaga', workOrProject: 'Horizonte Dorado' },
      { id: 'nom-7-2', name: 'Lucrecia Martel', workOrProject: 'El Silencio de la Luna' },
      { id: 'nom-7-3', name: 'Santiago Mitre & Mariano Llinás', workOrProject: 'Luces sobre la Ciudad' },
      { id: 'nom-7-4', name: 'Isabel Coixet', workOrProject: 'Reflejos Nocturnos' },
    ],
  },
  {
    id: 'categoria-8',
    number: 8,
    title: 'Mejor Guion Adaptado',
    description: 'Al guion basado en una obra literaria, teatral o material previo de notable maestría narrativa.',
    
    // 🔴 INSTRUCCIÓN: Reemplaza 'fmErhmOOLXU' con el ID del video definitivo de YouTube para Mejor Guion Adaptado
    youtubeId: 'fmErhmOOLXU',
    
    // 🔴 INSTRUCCIÓN: Edita los nombres de los nominados y sus obras aquí
    nominees: [
      { id: 'nom-8-1', name: 'Mateo Gil', workOrProject: 'Ecos del Tiempo (Basado en la novela de J. R. Silva)' },
      { id: 'nom-8-2', name: 'Sebastián Lelio', workOrProject: 'La Última Frontera' },
      { id: 'nom-8-3', name: 'Claudia Llosa', workOrProject: 'El Laberinto Urbano' },
      { id: 'nom-8-4', name: 'Pablo Larraín', workOrProject: 'Sombra e Ilusión' },
    ],
  },
  {
    id: 'categoria-9',
    number: 9,
    title: 'Mejor Banda Sonora / Música Original',
    description: 'A la composición musical original que eleva la emoción, atmósfera y ritmo de la obra.',
    
    // 🔴 INSTRUCCIÓN: Reemplaza 'fmErhmOOLXU' con el ID del video definitivo de YouTube para Mejor Banda Sonora
    youtubeId: 'fmErhmOOLXU',
    
    // 🔴 INSTRUCCIÓN: Edita los nombres de los nominados y sus obras aquí
    nominees: [
      { id: 'nom-9-1', name: 'Alberto Iglesias', workOrProject: 'El Silencio de la Luna' },
      { id: 'nom-9-2', name: 'Gustavo Santaolalla', workOrProject: 'Horizonte Dorado' },
      { id: 'nom-9-3', name: 'Roque Baños', workOrProject: 'La Última Frontera' },
      { id: 'nom-9-4', name: 'Lucas Vidal', workOrProject: 'Ecos del Tiempo' },
    ],
  },
  {
    id: 'categoria-10',
    number: 10,
    title: 'Mejor Fotografía',
    description: 'Reconocimiento a la dirección de fotografía por el encuadre, iluminación y estética visual excepcional.',
    
    // 🔴 INSTRUCCIÓN: Reemplaza 'fmErhmOOLXU' con el ID del video definitivo de YouTube para Mejor Fotografía
    youtubeId: 'fmErhmOOLXU',
    
    // 🔴 INSTRUCCIÓN: Edita los nombres de los nominados y sus obras aquí
    nominees: [
      { id: 'nom-10-1', name: 'Emmanuel Lubezki', workOrProject: 'Horizonte Dorado' },
      { id: 'nom-10-2', name: 'Rodrigo Prieto', workOrProject: 'Ecos del Tiempo' },
      { id: 'nom-10-3', name: 'César Charlone', workOrProject: 'El Silencio de la Luna' },
      { id: 'nom-10-4', name: 'Natasha Braier', workOrProject: 'Luces sobre la Ciudad' },
    ],
  },
  {
    id: 'categoria-11',
    number: 11,
    title: 'Mejor Diseño de Producción',
    description: 'Al trabajo de dirección de arte, ambientación y escenografía que construye la atmósfera del filme.',
    
    // 🔴 INSTRUCCIÓN: Reemplaza 'fmErhmOOLXU' con el ID del video definitivo de YouTube para Mejor Diseño de Producción
    youtubeId: 'fmErhmOOLXU',
    
    // 🔴 INSTRUCCIÓN: Edita los nombres de los nominados y sus obras aquí
    nominees: [
      { id: 'nom-11-1', name: 'Eugenio Caballero', workOrProject: 'La Última Frontera' },
      { id: 'nom-11-2', name: 'Pilar Revuelta', workOrProject: 'Ecos del Tiempo' },
      { id: 'nom-11-3', name: 'Clara Notari', workOrProject: 'El Silencio de la Luna' },
      { id: 'nom-11-4', name: 'Antxón Gómez', workOrProject: 'Horizonte Dorado' },
    ],
  },
  {
    id: 'categoria-12',
    number: 12,
    title: 'Mejores Efectos Visuales',
    description: 'A la integración de tecnología, CGI y efectos prácticos que crean mundos e ilusiones convincentes.',
    
    // 🔴 INSTRUCCIÓN: Reemplaza 'fmErhmOOLXU' con el ID del video definitivo de YouTube para Mejores Efectos Visuales
    youtubeId: 'fmErhmOOLXU',
    
    // 🔴 INSTRUCCIÓN: Edita los nombres de los nominados y sus obras aquí
    nominees: [
      { id: 'nom-12-1', name: 'VFX Studios Latam', workOrProject: 'La Última Frontera' },
      { id: 'nom-12-2', name: 'Digital Magic FX', workOrProject: 'Ecos del Tiempo' },
      { id: 'nom-12-3', name: 'Arte Digital Cine', workOrProject: 'Horizonte Dorado' },
      { id: 'nom-12-4', name: 'Pixel Vision Lab', workOrProject: 'Sombra e Ilusión' },
    ],
  },
  {
    id: 'categoria-13',
    number: 13,
    title: 'Mejor Montaje / Edición',
    description: 'Al dominio del ritmo, corte cinematográfico y estructura temporal de la producción.',
    
    // 🔴 INSTRUCCIÓN: Reemplaza 'fmErhmOOLXU' con el ID del video definitivo de YouTube para Mejor Montaje
    youtubeId: 'fmErhmOOLXU',
    
    // 🔴 INSTRUCCIÓN: Edita los nombres de los nominados y sus obras aquí
    nominees: [
      { id: 'nom-13-1', name: 'Bernat Vilaplana', workOrProject: 'El Silencio de la Luna' },
      { id: 'nom-13-2', name: 'Teresa Font', workOrProject: 'Horizonte Dorado' },
      { id: 'nom-13-3', name: 'Alejandro Carrillo', workOrProject: 'La Última Frontera' },
      { id: 'nom-13-4', name: 'Lucía Zucchetti', workOrProject: 'Ecos del Tiempo' },
    ],
  },
  {
    id: 'categoria-14',
    number: 14,
    title: 'Mejor Sonido / Diseño Sonoro',
    description: 'A la excelencia en mezcla, grabación de campo y foley que sumerge al espectador en la historia.',
    
    // 🔴 INSTRUCCIÓN: Reemplaza 'fmErhmOOLXU' con el ID del video definitivo de YouTube para Mejor Sonido
    youtubeId: 'fmErhmOOLXU',
    
    // 🔴 INSTRUCCIÓN: Edita los nombres de los nominados y sus obras aquí
    nominees: [
      { id: 'nom-14-1', name: 'José Luis Díaz & Equipo', workOrProject: 'El Silencio de la Luna' },
      { id: 'nom-14-2', name: 'Marc Orts', workOrProject: 'Horizonte Dorado' },
      { id: 'nom-14-3', name: 'Sergio Díaz', workOrProject: 'La Última Frontera' },
      { id: 'nom-14-4', name: 'Gabriel Coll', workOrProject: 'Ecos del Tiempo' },
    ],
  },
];
