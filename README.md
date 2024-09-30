
# Postable - RESTful API para Gestión de Posts
RESTful API para una red social que permite a los usuarios interactuar con publicaciones (Posts). Esta API será capaz de manejar diferentes operaciones dependiendo de si el usuario está registrado o no.


## Tech Stack

**Lenguaje:**  TypeScript.

**Server:** Node, Express, 

**Base de Datos:** PostgreSQL, 

**Autenticación/Autorización:** JWT.

**Migraciones:**  Implementación con umzug.

**Arquitectura:** Tres capas (routers, servicios, acceso a datos). 

**Testing:** Vitest, Supertest



## Run Locally

Clonar  proyecto

```bash
  git clone https://github.com/codeableorg/postable-diana180102.git
```

Ir a directorio de proyecto

```bash
  cd postable-diana180102.git
```

Instalar dependencias

```bash
  npm install
```

```bash
  npm install ts-node typescript @types/node --save-dev
  npm install typescript --save-dev 
  tsc --init  
```

```bash
  npm i dotenv
```
```bash
  npm i pg
```

```bash
  npm install express
  npm install -D @types/express@4.16.1
 
```
```bash
  npm install --save-dev cross-env
```

```bash
   npm install bcrypt  
```

```bash
  npm install @faker-js/faker --save-dev
```

```bash
  npm install jsonwebtoken
  npm i @types/jsonwebtoken
```

```bash
 npm i zod
```

Iniciar Servidor

```bash
  npm run dev
```

Ejecutar migraciones

```bash
  npm run db:create //Para crear solo BD
  npm run db:drop //Para borrar solo BD
  npm run db:migrate // Inyectar datos
  npm run db:reset // Para ejecutar todo

```



## Environment Variables

Para ejecutar este proyecto, deberá agregar las siguientes variables de entorno a su archivo .env

`PGHOST`  Host de la base de datos

`PGPORT`  Puerto de la base de datos

`PGUSER`  Usuario de la base de datos

`PGPASSWORD`  Password de la base de datos

`PGDATABASE`  Nombre de la base de datos

`PORT`  Puesto de servidor para ejecutar proyecto

`JWT_SECRET`  Clave secreta para la autenticación 

`BDTEST`  Nombre de la base de datos para testing





# API Reference

### Visualización de Posts

#### Obtener todos los posts por Paginación y Filtración

```http
  GET /
```

| Parameter Query| Type     | Description                |
| :-------- | :------- | :------------------------- |
| `page` | `number` | Número de página |
| `limit` | `number` | Número de posts por página |
| `username` | `string` | Filtrar posts por nombre de usuario |
| `orderBy` | `string` |  Criterio de ordenación |
| `order` | `string` | Dirección de la ordenación, **opciones**: ASC, DESC |

#### Ver posts de un usuario específico

```http
  GET /:username
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | Usuario a consultar |


| Parameter Query| Type     | Description                |
| :-------- | :------- | :------------------------- |
| `page` | `number` | Número de página |
| `limit` | `number` | Número de posts por página |
| `order` | `string` | Dirección de la ordenación, **opciones**: ASC, DESC |


### Interacción de Usuarios Registrados

#### Permite a un usuario registrado crear un nuevo post.

```http
  POST /posts
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `API_KEY`      | `string` | **Requiere** API_KEY/TOKEN |

#### Permite a un usuario registrado editar un post existente.

```http
  PATCH /posts/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `API_KEY`      | `string` | **Requiere** API_KEY/TOKEN |
| `id`      | `number` | Id del Post a editar |


#### Permite a un usuario registrado dar "Like" a un post.

```http
  POST /posts/:postId/like
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `API_KEY`      | `string` | **Requiere** API_KEY/TOKEN |
| `postId`      | `number` | ID del post a dar like |

#### Permite a un usuario eliminar su "Like" de un post.

```http
  DELETE /posts/:postId/like
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `API_KEY`      | `string` | **Requiere** API_KEY/TOKEN |
| `postId`      | `number` | ID del post a remover like |


### Gestión de Perfil de Usuario

#### Muestra el perfil del usuario autenticado

```http
  GET /me
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `API_KEY`      | `string` | **Requiere** API_KEY/TOKEN |


#### Permite al usuario editar su información de perfil

```http
  PATCH /me
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `API_KEY`      | `string` | **Requiere** API_KEY/TOKEN |

**email, firstName, lastName:** Campos opcionales para actualizar.


### Permite al usuario eliminar su cuenta

```http
  DELETE /me
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `API_KEY`      | `string` | **Requiere** API_KEY/TOKEN |


### Interacción de Usuarios Registrados

### Permite a un nuevo usuario registrarse en la plataforma

```http
  POST /signup
```
 **username, password:** Campos requeridos para el registro.

 ### Permite a un usuario existente iniciar sesión.


```http
  POST /login
```
 **username, password:** Credenciales requeridas para el inicio de sesión..












## Running Tests

Para ejecutar pruebas, ejecute el siguiente comando

```bash
  npm run test
  npm run test -- --watch

```

Agregar en script ```package.json > scripts **cross-env NODE_ENV=test**``` 

```bash
 "test": "cross-env NODE_ENV=test vitest",
 "db:migrate": " cross-env NODE_ENV=test ts-node src/db/scripts/dbMigrate.ts",
 "db:create": "cross-env NODE_ENV=test ts-node src/db/scripts/dbCreate.ts",
 "db:drop": " cross-env NODE_ENV=test ts-node src/db/scripts/dbDrop.ts && rm -f src/db/migrations/migrations.json",

```


## Authors

- [@diana180102](https://www.github.com/diana180102)

