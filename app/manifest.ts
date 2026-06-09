import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BioLab Virtual',
    short_name: 'BioLab',
    description: 'PWA educativa para practicas de Biologia Celular y Molecular.',
    start_url: '/',
    display: 'standalone',
    background_color: '#020617',
    theme_color: '#020617',
    orientation: 'portrait',
    lang: 'es-CO',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any maskable',
      },
    ],
  };
}
