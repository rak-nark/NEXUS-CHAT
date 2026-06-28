# Nexus Chat

Aplicación web de chat con IA en tiempo real. React 19 + Express 5 + Google Gemini.

[![Stack](https://img.shields.io/badge/React-19-61DAFB?logo=react)]()
[![Stack](https://img.shields.io/badge/Express-5-000000?logo=express)]()
[![Stack](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)]()

## Características

- **Streaming en tiempo real** — Respuestas de la IA carácter por carácter (SSE)
- **Markdown renderizado** — Código con syntax highlighting, tablas, listas
- **Adjuntar archivos** — Imágenes, PDF y TXT que Gemini analiza
- **Micrófono** — Speech-to-Text (Chrome/Edge)
- **Sidebar responsive** — Overlay en mobile, fijo en desktop
- **Paleta de comandos** — `Ctrl+K` para navegación rápida
- **Tema oscuro** — Diseño Material Design con colores personalizados

## Stack

| Capa | Tecnología |
|---|---|
| Frontend | React 19 + Vite 8 + Tailwind CSS 4 |
| Backend | Express 5 + `@google/genai` SDK |
| IA | Google Gemini 2.5 Flash |
| Linter | Oxlint |

## Requisitos

- Node.js 18+
- API key de Google Gemini (gratis en [aistudio.google.com/apikey](https://aistudio.google.com/apikey))

## Setup rápido

```bash
# Clonar
git clone https://github.com/tu-usuario/nexus-chat.git
cd nexus-chat

# Instalar dependencias
npm install

# Configurar API key
cp .env.example .env
# Edita .env y pon: GEMINI_API_KEY=tu_key
```

## Desarrollo

```bash
# Terminal 1 — Backend (http://localhost:3001)
npm run server

# Terminal 2 — Frontend (http://localhost:5173)
npm run dev
```

## Build producción

```bash
npm run build
npm run preview
```

## Variables de entorno

| Variable | Default | Requerida | Descripción |
|---|---|---|---|
| `GEMINI_API_KEY` | — | Sí | API key de Google Gemini |
| `GEMINI_MODEL` | `gemini-2.5-flash` | No | Modelo de Gemini |
| `PORT` | `3001` | No | Puerto del backend |

## Licencia

MIT
