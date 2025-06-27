# Seek Tasks

Gestor de tareas fullstack con React y FastAPI.

## URLs de Producción

- **Frontend:** [https://seek-tasks.vercel.app/](https://seek-tasks.vercel.app/)
- **Backend (API Docs):** [https://54.166.26.43/docs](https://54.166.26.43/docs)

Gestor de tareas fullstack con autenticación, API REST en FastAPI (Python), frontend en React + Vite + MUI y base de datos MongoDB.

## Requisitos
- Docker y Docker Compose
- Node.js 20+ (solo para desarrollo local frontend)

## Estructura del Proyecto
```
seek-tasks/
├── backend/        # API FastAPI + MongoDB
├── frontend/       # React + Vite + MUI
├── docker-compose.yml
├── Readme.md
└── ...
```

## Levantar el entorno (desarrollo)

```bash
git clone https://github.com/danielhuamani/seek-tasks.git
cd seek-tasks
cp .env.example .env 
docker-compose up --build
```
- Backend: [http://localhost:8000/docs](http://localhost:8000/docs)
- Frontend: [http://localhost:5173](http://localhost:5173)

## Servicios

### Backend (FastAPI)
- Código en `backend/`
- Documentación interactiva en `/docs`
- Variables de entorno en `.env`

#### Arquitectura del Backend

El backend sigue una arquitectura limpia (Clean Architecture) y DDD (Domain-Driven Design), separando responsabilidades en distintas capas:

```
backend/src/
├── auth/                  # Autenticación y autorización
│   ├── application/       # Lógica de aplicación (casos de uso)
│   ├── domain/            # Entidades y value objects de dominio
│   └── infrastructure/    # Web (rutas, dependencias)
├── core/                  # Utilidades y base común
├── tasks/                 # Módulo de gestión de tareas
│   ├── application/       # Servicios de aplicación (casos de uso)
│   ├── domain/            # Entidades yrepositorios
│   ├── infrastructure/    # Persistencia y web (rutas, esquemas)
│   └── ...
└── ...
```

**Capas principales:**
- **domain:** Define entidades (`TaskEntity`), value objects (`TaskStatus`), interfaces de repositorios.
- **application:** Casos de uso y servicios de negocio (`TaskService`). Orquesta la lógica entre dominio e infraestructura.
- **infrastructure:** Implementaciones concretas (repositorios MongoDB, rutas FastAPI, esquemas Pydantic).

**Rutas y controladores:**
- Definidas en `infrastructure/web/routes.py` usando FastAPI.
- Exponen endpoints RESTful para tareas y autenticación.

**Ventajas:**
- Facilita el testing y la mantenibilidad.
- Permite desacoplar la lógica de negocio de la tecnología usada para exponer la API o persistir datos.

### Frontend (React + Vite)
- Código en `frontend/`
- Hot reload en desarrollo
- Variables de entorno en `.env`

### Base de datos (MongoDB)
- Persistencia en `./mongo_data`
- Imagen oficial de Docker

## Comandos útiles
- Levantar todo: `docker-compose up --build`
- Parar todo: `docker-compose down`
- Ejecutar tests backend: `docker-compose exec seek_web pytest`

## Autenticación
- JWT Bearer token en endpoints protegidos.

## CRUD de tareas
- Crear, listar, actualizar y eliminar tareas desde el frontend.

---

## TODO

### Backend
- [ ] Agregar sistema de tableros (boards) para que cada usuario pueda crear múltiples tableros.
- [ ] Asociar tareas a tableros (cada tablero tendrá sus propias tareas).
- [ ] Endpoints para CRUD de tableros y para obtener tareas por tablero.

### Frontend
- [ ] Implementar drag and drop para mover tareas entre estados (por ejemplo, de "To Do" a "In Progress").
- [ ] Visualizar tableros y permitir cambiar entre ellos.
- [ ] Crear, editar y eliminar tableros desde la interfaz.

