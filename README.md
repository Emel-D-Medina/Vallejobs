# Vallejobs — Backend API

API REST para la plataforma de empleos Vallejobs. Construida con **Express 5**, **Sequelize 6** y **MariaDB**, con autenticación JWT.

## Requisitos

- **Node.js** >= 18
- **MariaDB** >= 10.6 (o MySQL 8)
- **pnpm** (recomendado) o npm

## Instalación

```bash
pnpm install
```

## Configuración

Crear archivo `.env` en la raíz del proyecto:

```env
DB_NAME=vallejobs
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_PORT=3306
JWT_SECRET=una_clave_segura_aqui
```

## Scripts

| Comando      | Descripción                                 |
| ------------ | ------------------------------------------- |
| `pnpm start` | Inicia el servidor en producción            |
| `pnpm dev`   | Inicia con **nodemon** (recarga automática) |
| `pnpm test`  | Ejecuta los tests con Jest (modo ESM)       |

## Estructura

```
backend/
├── __tests__/           # Tests con Jest + Supertest
│   ├── authMiddleware.test.js
│   ├── categoria.test.js
│   ├── database.test.js
│   ├── server.test.js
│   └── users.test.js
├── controllers/         # Lógica de negocio
│   ├── categoriaController.js
│   ├── OfertasController.js
│   └── userController.js
├── middlewares/         # Middleware de autenticación
│   └── authMiddleware.js
├── models/              # Modelos Sequelize
│   ├── associations.js  # Relaciones entre modelos
│   ├── Categoria.js
│   ├── OfertasTrabajo.js
│   └── User.js
├── routes/              # Definición de rutas
│   ├── categoria.js
│   ├── ofertas.js
│   └── users.js
├── database.js          # Configuración Sequelize + pool
├── server.js            # Punto de entrada
└── package.json
```

## Endpoints

### Usuarios — `/Usuarios`

| Método | Ruta                       | Auth | Descripción                   |
| ------ | -------------------------- | ---- | ----------------------------- |
| POST   | `/Usuarios/registrar`      | —    | Registrar nuevo usuario       |
| POST   | `/Usuarios/login`          | —    | Iniciar sesión (devuelve JWT) |
| GET    | `/Usuarios/obtener`        | JWT  | Listar todos los usuarios     |
| GET    | `/Usuarios/obtener/:id`    | JWT  | Obtener usuario por ID        |
| PUT    | `/Usuarios/actualizar/:id` | JWT  | Actualizar usuario            |
| DELETE | `/Usuarios/eliminar/:id`   | JWT  | Eliminar usuario              |

### Trabajos — `/Trabajos`

| Método | Ruta                             | Auth | Descripción              |
| ------ | -------------------------------- | ---- | ------------------------ |
| POST   | `/Trabajos/registrar`            | —    | Crear oferta de trabajo  |
| GET    | `/Trabajos/obtener`              | —    | Listar todas las ofertas |
| GET    | `/Trabajos/obtener/:id`          | JWT  | Obtener oferta por ID    |
| GET    | `/Trabajos/categoria/:categoria` | —    | Filtrar por categoría    |
| POST   | `/Trabajos/agpostulante`         | JWT  | Postularse a una oferta  |
| PUT    | `/Trabajos/actualizar/:id`       | JWT  | Actualizar oferta        |
| DELETE | `/Trabajos/eliminar/:id`         | JWT  | Eliminar oferta          |

### Categorías — `/Categoria`

| Método | Ruta                        | Auth | Descripción              |
| ------ | --------------------------- | ---- | ------------------------ |
| POST   | `/Categoria/registrar`      | —    | Crear categoría          |
| GET    | `/Categoria/obtener`        | —    | Listar categorías        |
| GET    | `/Categoria/obtener/:id`    | JWT  | Obtener categoría por ID |
| PUT    | `/Categoria/actualizar/:id` | JWT  | Actualizar categoría     |
| DELETE | `/Categoria/eliminar/:id`   | JWT  | Eliminar categoría       |

### Health Check

| Método | Ruta | Descripción           |
| ------ | ---- | --------------------- |
| GET    | `/`  | Mensaje de bienvenida |

## Autenticación

1. `POST /Usuarios/login` con `{ email, password }` devuelve `{ token, user }`.
2. Incluir el token en el header `Authorization: Bearer <token>` para rutas protegidas.
3. El token expira en **24 horas**.

## Tests

```bash
pnpm test
```

Usa **Jest 30** con `--experimental-vm-modules` para soporte ESM. Los tests simulan la base de datos con mocks; no requieren MariaDB corriendo.

## Base de datos

Los modelos se sincronizan automáticamente al iniciar el servidor (`sync({ alter: true })`). Para crear la base de datos manualmente:

```sql
CREATE DATABASE IF NOT EXISTS vallejobs CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
