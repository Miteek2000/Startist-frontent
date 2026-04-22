# Startist Frontend

Frontend de la plataforma Startist, una app para que artistas gestionen su progreso en técnicas artísticas mediante un árbol de habilidades.

---

## Tecnologías

| Capa | Tecnología |
|---|---|
| Framework | Next.js 15 (App Router) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS |
| Autenticación | JWT almacenado en localStorage via Context API |
| Fuente de datos | Startist API (backend Express) |

---

## Arquitectura

```
startist-frontend/
├── public/                        # Imágenes estáticas
│   ├── login_welcome_photo.jpg
│   ├── EjemploProyecto.png
│   ├── SubirProyecto.png
│   ├── UsuarioComunidad.png
│   └── UsuarioPerfil_Header.png
├── src/
│   ├── app/                       # Páginas (App Router de Next.js)
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx     # Inicio de sesión
│   │   │   └── registro/page.tsx  # Registro de artista
│   │   ├── comunidad/page.tsx     # Lista de artistas y sus técnicas
│   │   ├── dashboard/page.tsx     # Mapa de habilidades interactivo
│   │   ├── perfil/page.tsx        # Perfil del artista autenticado
│   │   ├── tecnica/[id]/page.tsx  # Tarjetas de actividad de una técnica
│   │   ├── api/                   # Route handlers de Next.js (proxy al backend)
│   │   │   ├── artistas/[id]/route.ts
│   │   │   └── proyectos/route.ts
│   │   ├── layout.tsx
│   │   ├── page.tsx               # Raíz: redirige a /login o /dashboard
│   │   └── globals.css
│   ├── components/
│   │   ├── perfil/
│   │   │   ├── ProfileHeader.tsx  # Encabezado con stats del artista
│   │   │   ├── ProjectsSection.tsx # Grid de proyectos subidos
│   │   │   ├── TechniquesSection.tsx # Lista de técnicas con progreso
│   │   │   └── EditProfileModal.tsx
│   │   ├── tecnica/
│   │   │   ├── TecnicaCard.tsx    # Tarjeta de actividad + subida de archivo
│   │   │   ├── SubirArchivoModal.tsx
│   │   │   └── GaleriaReferencia.tsx # Galería Unsplash
│   │   └── ui/
│   │       ├── Header.tsx
│   │       └── ArtistCard.tsx
│   ├── context/
│   │   └── AuthContext.tsx        # Token y usuario en memoria + localStorage
│   ├── lib/                       # Funciones de fetch al backend
│   │   ├── artistas.ts
│   │   ├── tecnicas.ts
│   │   ├── api.ts
│   │   └── auth.ts
│   └── types/                     # Interfaces TypeScript
│       ├── artistas.ts
│       ├── tecnicas.ts
│       ├── arbol.ts
│       └── index.ts
└── .env.local
```

---

## Páginas

| Ruta | Descripción | Auth |
|---|---|---|
| `/` | Redirige a `/dashboard` o `/login` según sesión | — |
| `/login` | Formulario de inicio de sesión | No |
| `/registro` | Formulario de registro | No |
| `/dashboard` | Mapa de técnicas interactivo con árbol de habilidades | Sí |
| `/comunidad` | Lista de todos los artistas y sus técnicas completadas | Sí |
| `/perfil` | Perfil del artista autenticado con proyectos y estadísticas | Sí |
| `/tecnica/[id]` | Tarjetas de actividad de una técnica, con subida de proyectos | Sí |

---

## Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# URL base del backend (sin slash al final)
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```
---

## Instalación y ejecución

### Requisitos previos
- Node.js 18+
- El backend de Startist corriendo

### Pasos

```bash
# 1. Clonar el repositorio
git clone  https://github.com/Miteek2000/Startist-frontent.git
cd startist-frontend

# 2. Instalar dependencias
npm install

# 3. Crear el archivo de variables de entorno
cp .env.example .env.local
# Editar .env.local con la URL de tu backend

# 4. Correr en desarrollo
npm run dev

# 5. Build de producción
npm run build
npm start
```

La app queda disponible en `http://localhost:3000`.

---

