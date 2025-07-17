# Proyecto NestJS - Módulo de Autenticación y Gestión de Usuarios

## Objetivo

Crear un sistema de autenticación robusto con JWT que permita a los usuarios:

- Registrarse.
- Iniciar sesión.
- Ser autenticados y autorizados mediante roles (`USER`, `ADMIN`).
- Ser gestionados mediante operaciones CRUD.
- Asegurar la aplicación con middleware, guards, interceptores y eventos.

---

## Tecnologías y dependencias utilizadas

- **NestJS**: Framework backend principal.
- **Prisma**: ORM para el acceso a base de datos PostgreSQL.
- **JWT**: Autenticación con tokens.
- **class-validator / class-transformer**: Validación de DTOs.
- **bcrypt**: Hash de contraseñas.
- **Passport**: Middleware de autenticación.
- **@nestjs/config**: Manejo de variables de entorno.
- **@nestjs/schedule**: Uso de cron jobs.

---

## Estructura del proyecto

Se adoptó una arquitectura modular clara y estandar:
### `auth`

Encargado de toda la lógica de autenticación:

- Login y registro de usuarios.
- Validación de credenciales.
- Generación y verificación de JWT.
- Guards y estrategias de autenticación.
- Decoradores personalizados.

### `users`

Módulo para gestión de usuarios:

- Listar usuarios.
- Editar información personal.
- Eliminar usuarios.
- Restringir acceso según rol (`ADMIN` o `USER`).

### `prisma`

Módulo que encapsula la lógica de conexión y acceso a la base de datos a través del cliente de Prisma.

---

## Base de datos y Prisma

Se utiliza PostgreSQL como sistema de base de datos.

El modelo de usuario se definió en el archivo `schema.prisma` con los campos necesarios: `id`, `email`, `password` y `role`. Se migró la base de datos y se generó el cliente de Prisma.

Además, se añadieron variables de entorno en `.env` para configurar la conexión (`DATABASE_URL`).

---

## Flujo de autenticación

1. El usuario se registra enviando su email y contraseña.
2. La contraseña se encripta con `bcrypt`.
3. Al iniciar sesión, se valida la contraseña y se genera un JWT.
4. Las rutas protegidas utilizan `Guards` para validar el token JWT.
5. Se restringe el acceso a ciertas rutas usando `Roles` y decoradores.

---

## Validación de datos

Se utilizaron **DTOs** (Data Transfer Objects) para validar y transformar los datos de entrada en las rutas públicas:

- `RegisterUserDto`
- `LoginUserDto`
- `UpdateUserDto`

Se validan campos como email, contraseña, y formato de entrada, utilizando decoradores como `@IsEmail`, `@MinLength`, `@IsOptional`.

---

## Seguridad

Para asegurar la aplicación se implementaron:

- **JWT Guard**: Protege rutas que requieren autenticación.
- **Role Guard**: Restringe acceso a rutas según el rol del usuario.
- **Middleware de logging**: Registra información de cada request.
- **Interceptors**: Manipulación de respuestas y tiempos de ejecución.
- **Eventos**: Registro o auditoría ante ciertas acciones (opcional).
- **Cron jobs**: Tareas programadas con `@nestjs/schedule` (opcional).

---

## Pruebas

Se realizaron pruebas de los siguientes escenarios:

- Registro con datos válidos e inválidos.
- Login con credenciales correctas e incorrectas.
- Acceso a rutas protegidas sin y con JWT válido.
- Acciones restringidas a ADMIN verificadas correctamente.
- Validaciones de datos en los DTOs.
- Interacción con la base de datos usando Prisma.

---

## Cómo correr el proyecto

1. Clonar el repositorio.
2. Instalar dependencias con `npm install`.
3. Configurar variables de entorno en `.env`.
4. Ejecutar migraciones con `npx prisma migrate dev`.
5. Levantar el proyecto con `npm run start:dev`.

---

## Estado del proyecto
- Registro y login funcional  
- Gestión de usuarios  
- Roles y autorización  
- Validación de datos  
- Seguridad mediante guards y middleware  
- Interceptores y eventos  

---

## A tener en cuenta:
- Es un proyecto parte de una practica con backend, no tiene integrando frontend.
