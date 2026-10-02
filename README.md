# BioLab Virtual (`biolab-next`)

Laboratorio virtual de **biología celular y molecular**: Progressive Web App (aplicación web progresiva) con ocho prácticas, simuladores y bitácoras.

**Objetivo comercial:** licenciar a universidades, editoriales académicas e interesados (docentes / academias).

## Stack

- Next.js 15 + React 19 + TypeScript
- Tailwind CSS 4
- Supabase (bitácoras, interruptores de práctica, registro)
- PWA (`manifest` + service worker)

## Rutas clave

| Ruta | Uso |
|------|-----|
| `/` | Landing comercial (venta / demo) |
| `/laboratorio` | Panel de prácticas |
| `/laboratorio/registro` | Ingreso por sesión (QR / asistencia) |
| `/laboratorio/practica1` … `practica8` | Prácticas |
| `/admin` | Administración docente |

## Desarrollo local

```bash
npm install
npm run dev
```

Copia variables desde `.env.example` a `.env.local` cuando uses Supabase.

## Licenciamiento

Producto intelectual de PhD. Giovanni Alexander Lineros Franco · BioGALF Home Health S.A.S.  
Contacto comercial: `giovannilineros@biogalfhomehealth.com`

## Nota histórica

Migrado desde el legacy `bio-lab-virtual`. Ver `RECUPERACION_FORENSE.md` para deuda visual de la migración CSS/HTML.
