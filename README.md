# Vallejobs — Frontend

Aplicación React para la plataforma de empleos Vallejobs. Interfaz responsive con autenticación JWT, dashboard y gestor de ofertas laborales.

## Requisitos

- **Node.js** >= 18
- **pnpm** (recomendado) o npm

## Instalación

```bash
pnpm install
```

## Scripts

| Comando      | Descripción                                                 |
| ------------ | ----------------------------------------------------------- |
| `pnpm start` | Inicia el servidor de desarrollo en `http://localhost:3000` |
| `pnpm build` | Genera build de producción en `build/`                      |
| `pnpm test`  | Ejecuta los tests con React Testing Library                 |

## Estructura

```
frontend/
├── public/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── CreateJob.jsx    #   Formulario para crear ofertas
│   │   ├── EditProfile.jsx  #   Editar perfil del usuario
│   │   ├── JobModal.jsx     #   Modal de postulación a oferta
│   │   ├── Login.jsx        #   Formulario de inicio de sesión
│   │   ├── MainContent.jsx  #   Layout de contenido principal
│   │   ├── Navbar.jsx       #   Barra de navegación (auth-aware)
│   │   ├── ProtectedRoute.jsx #   Guard para rutas protegidas
│   │   ├── registro.jsx     #   Formulario de registro
│   │   ├── Sidebar.jsx      #   Sidebar de navegación
│   │   └── UserProfile.jsx  #   Perfil del usuario
│   ├── pages/               # Páginas completas
│   │   ├── dashboard.jsx    #   Panel principal con cards
│   │   ├── home.jsx         #   Página de inicio con Navbar
│   │   └── UserList.jsx     #   Lista de usuarios (admin)
│   ├── services/            # Servicios de API
│   │   ├── authService.js   #   Autenticación (login, registro, CRUD)
│   │   └── protectedService.js #   Peticiones autenticadas (axios)
│   ├── styles/              # Hojas de estilo CSS
│   │   ├── CreateJob.css
│   │   ├── Dashboard.css
│   │   ├── EditProfile.css
│   │   ├── Home.css
│   │   ├── JobModal.css
│   │   ├── Login.css
│   │   ├── MainContent.css
│   │   ├── Navbar.css
│   │   ├── registro.css
│   │   ├── Sidebar.css
│   │   └── UserProfile.css
│   ├── App.jsx              # Configuración de rutas
│   ├── App.css              # Estilos globales
│   └── index.js             # Punto de entrada
└── package.json
```

## Rutas

| Ruta           | Componente    | Protegida | Descripción                              |
| -------------- | ------------- | --------- | ---------------------------------------- |
| `/`            | `Home`        | —         | Página de inicio con Navbar y bienvenida |
| `/Home`        | `Home`        | —         | Alias de inicio                          |
| `/login`       | `Login`       | —         | Inicio de sesión                         |
| `/registro`    | `Registro`    | —         | Registro de usuario                      |
| `/dashboard`   | `Dashboard`   | Sí        | Panel principal con acceso a acciones    |
| `/CreateJob`   | `CreateJob`   | —         | Publicar nueva oferta laboral            |
| `/UserProfile` | `UserProfile` | Sí        | Ver perfil del usuario autenticado       |
| `/EditProfile` | `EditProfile` | Sí        | Editar perfil del usuario                |
| `/UserList`    | `UserList`    | Sí        | Listar todos los usuarios                |

## Autenticación

- Login exitoso guarda el **token JWT** en `localStorage`.
- El **Navbar** cambia dinámicamente: muestra Login/Registro si no hay sesión, y enlaces al Dashboard/Perfil/Cerrar sesión si está autenticado.
- Las rutas protegidas usan `<ProtectedRoute>` que redirige a `/login` si no hay token.
- Las peticiones autenticadas se hacen mediante `protectedService.js` (axios con header `Authorization: Bearer <token>`).

## API

El frontend se comunica con el backend en `http://localhost:5000`. Configurar CORS en el backend para permitir `http://localhost:3000`.

## Responsive

Todos los componentes y estilos están diseñados con **media queries** para los siguientes breakpoints:

- **≤ 480 px** — Teléfonos pequeños
- **≤ 600 px** — Teléfonos grandes
- **≤ 768 px** — Tablets
- **≤ 900 px** — Tablets grandes / laptops pequeñas

El menú de navegación se colapsa en un **hamburger menu** en pantallas pequeñas.
