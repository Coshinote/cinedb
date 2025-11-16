# API REST Express para administración de películas favoritas de empleados de IPLACEX

API REST desarrollada con Express.js y MongoDB para la gestión de películas favoritas y actores.

## Características

- CRUD completo para películas
- CRUD completo para actores
- Validación de datos
- Conexión a MongoDB Atlas
- Manejo de errores

## Tecnologías

- Node.js
- Express.js
- MongoDB
- CORS

## Instalación

```bash
npm install
```

## Uso

```bash
npm start
```

El servidor se iniciará en `http://localhost:3000`

## Endpoints

### Películas
- `GET /api/peliculas` - Obtener todas las películas
- `GET /api/peliculas/:id` - Obtener una película por ID
- `POST /api/peliculas` - Crear una nueva película
- `PUT /api/peliculas/:id` - Actualizar una película
- `DELETE /api/peliculas/:id` - Eliminar una película

### Actores
- `GET /api/actores` - Obtener todos los actores
- `GET /api/actores/:id` - Obtener un actor por ID
- `POST /api/actores` - Crear un nuevo actor
- `PUT /api/actores/:id` - Actualizar un actor
- `DELETE /api/actores/:id` - Eliminar un actor

## Autor

Felipe Millan

## Licencia

Apache License 2.0