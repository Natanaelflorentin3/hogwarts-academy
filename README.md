# Hogwarts Academy 🪄

Plataforma de cursos hecha con **React + TypeScript + Vite + Tailwind**, conectada a la API real de la academia (Render).

## Funcionalidades

| Pantalla | Ruta | Quién entra |
| --- | --- | --- |
| Login | `/login` | Público |
| Registro (crea un estudiante y entra directo) | `/registro` | Público |
| Inicio (estudiante: cursos y créditos · admin: totales) | `/inicio` | Con sesión |
| Cursos con buscador y barra de cupos | `/cursos` | Con sesión |
| Detalle e inscripción | `/cursos/:id` | Con sesión |
| Mis inscripciones | `/inscripciones` | Estudiante |
| 404 | `*` | Público |

## Cómo correrlo

```bash
npm install
cp .env.example .env
npm run dev
```

`VITE_API_URL` apunta a `https://api-academia-funval.onrender.com/api`.
La API se duerme: la primera petición puede tardar ~50 segundos.

## Estructura

- `src/services/` — un servicio por tema (auth, cursos, inscripciones, usuarios). Las páginas solo llaman a los servicios.
- `src/hooks/useApi.ts` — cargando / error / datos / reintentar.
- `src/store/useAuthStore.ts` — sesión con Zustand (persistida).
- `src/types/` — tipos según la documentación de la API.
