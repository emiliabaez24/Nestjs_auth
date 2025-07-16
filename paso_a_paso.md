# Módulo de Autenticación
Objetivo: Crear un sistema de autenticación JWT que permita la creación, inicio de  sesión, edición y eliminación de usuarios.

## 1. Entidad Usuario --> hecho en la configuracion inicial!
Definir un modelo de usuario en Prisma con los siguientes campos:  
- id: número entero autoincremental.  
- email: cadena única.   
- password: cadena (almacenada de forma segura).  
- role: enumeración (USER, ADMIN).  

### Archivos involucrados

|Archivo         |     Proposito                                  |
|----------------|------------------------------------------------|
|schema.prisma   |Definir los esquemas de datos para la BD        |
|.env            |Configuracion de la BD; Url de conexion a la BD |

## 2. Data Transfer Objects (DTOs)

Crear DTOs para las operaciones de:
- Registro (RegisterUserDto).
- Inicio de sesión (LoginUserDto).
- Actualización de usuario (UpdateUserDto).
- Utilizar class-validator y class-transformer para la validación y transformación de datos.

Esta parte es un poco mas compleja. Requiere la creacion de multiples archivos con multiples propositos. Seguire la estructura tipica de node.js y para eso debere de crear src/auth, src/user.  

1. Instalamos las dependencias necesarias
> npm install class-validator class-transformer
- class-validator: aplica validaciones como que un mail sea un mail
- class-transformer: transforma el JSON recibido en una instancia de clase

2. Creacion del modulo 'auth'
> nest g module auth
> nest g controller auth
> nest g service auth
> npx nest g service prisma

3. Creacion del modulo 'users'
> nest g module users
> nest g controller users
> nest g service users

3. Creacion de los DTOs
> src/auth/dto/RegisterUser.dto.ts
> src/auth/dto/LoginUser.dto.ts
> src/users/dto/UpdateUser.dto.ts 

|Archivo         |     Proposito                                  |
|----------------|------------------------------------------------|
|schema.prisma   |Definir los esquemas de datos para la BD        |
|.env            |Configuracion de la BD; Url de conexion a la BD |
| main.ts        |                                                |
|/users          |                                                |
|/auth           |                                                |
|prisma.service.ts|                                               |


## 3. Controladores y Servicios
**AuthController:**:  
- POST /auth/register: Registrar un nuevo usuario.  
- POST /auth/login: Iniciar sesión y devolver un token JWT.  

**UsersController:**  
- GET/users/id: Obtener información de un usuario protegido por JWT).  
- PATCH /users/:id: Actualizar información de un usuario  (protegido por JWT).  
- DELETE /users/:id: Eliminar un usuario (solo para roles ADMIN).  

|Archivo         |     Proposito                                  |
|----------------|------------------------------------------------|
|auth.controller.ts   |Definir los esquemas de datos para la BD        |
|auth.service.ts          |Configuracion de la BD; Url de conexion a la BD |
|users.controller.ts        |                                                |
|users.service.ts         |                                                |
|/decorators/get-user.decorator.ts           |                                                |
|prisma.service.ts|                                               |
|prisma.module.ts|                                               |


## 4. Guards y Decoradores Personalizados
- Implementar un Guard de JWT que valide el token en las rutas protegidas.  
- Crear un Guard de roles para restringir ciertas acciones a usuarios con rol ADMIN.  
- Utilizar el decorador @SetMetadata para establecer los roles requeridos en los controladores.  

## 5. Pipes y Validación
- Aplicar Pipes globales para la validación de datos de entrada.  
- Manejar errores de validación y devolver respuestas claras al cliente.  
