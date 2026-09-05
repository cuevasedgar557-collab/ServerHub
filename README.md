# ServerHub

Sistema web para registrar, monitorear y administrar servidores mediante un agente Node.js instalado en cada servidor.

## Características principales

- Autenticación de usuarios con JWT y contraseñas protegidas con bcrypt.
- Registro, consulta, actualización y eliminación de servidores.
- Vinculación de agentes mediante claves temporales de 24 horas.
- Heartbeats e información del sistema.
- Métricas de CPU, RAM y disco, con historial y última medición.
- Alertas para recursos por encima de 90% y agentes sin heartbeat durante más de 2 minutos.
- Dashboard agregado y consulta de alertas.
- Sesiones administrativas temporales para operaciones remotas.
- Gestión remota de servicios y archivos mediante comandos ejecutados por el agente.

## Arquitectura

```
Navegador -> Frontend React/Vite -> API REST Express -> PostgreSQL
                                      ^
                                      |
                              Agente Node.js
```

El frontend consulta la API mediante HTTP. No hay WebSocket ni SSE: el dashboard se actualiza cada 20 segundos y el detalle de un servidor actualiza su estado y última métrica cada 15 segundos. El agente envía heartbeats y métricas cada 10 segundos y consulta comandos pendientes cada 10 segundos.

## Tecnologías

| Componente | Tecnología |
|---|---|
| Frontend | React 19, React Router 7, Vite 8 |
| Backend | Node.js CommonJS, Express 5 |
| Base de datos | PostgreSQL mediante `pg` |
| Agente | Node.js, Axios, systeminformation |
| Seguridad | JWT, bcrypt, HMAC-SHA256, Joi, rate limit por agente |
| Tareas programadas | node-cron |

## Requisitos

- Node.js compatible con las dependencias instaladas.
- npm.
- PostgreSQL accesible por el backend.

No existe un `package.json` en la raíz. Las dependencias se instalan por separado en `backend`, `frontend` y `serverhub-agent`. `docker-compose.yml` está vacío y no proporciona una instalación Docker.

## Instalación y ejecución

### Backend

Configura las variables de entorno indicadas en [DOCUMENTACION.md](DOCUMENTACION.md) y asegúrate de que PostgreSQL esté disponible. El backend comprueba la conexión a PostgreSQL antes de iniciar.

```bash
cd backend
npm install
npm run dev
```

Para ejecutar sin `nodemon`:

```bash
npm start
```

El puerto predeterminado es `3000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

La URL de la API se configura con `VITE_API_URL`; si no se define, el frontend usa `http://localhost:3000`.

### Agente

```bash
cd serverhub-agent
npm install
node src/index.js SHUB-XXXX-XXXX
```

Sustituye la clave por una generada desde la API o el dashboard. El agente soporta Windows y sistemas Unix; la ubicación de sus credenciales depende del sistema operativo.

## API principal

| Método | Ruta | Uso |
|---|---|---|
| POST | `/api/auth/register` | Registrar usuario |
| POST | `/api/auth/login` | Iniciar sesión |
| GET | `/api/auth/profile` | Consultar perfil autenticado |
| GET/POST | `/api/server` | Listar o crear servidores |
| GET/PUT/DELETE | `/api/server/:id` | Consultar, actualizar o eliminar un servidor |
| GET | `/api/dashboard` | Obtener estadísticas agregadas |
| POST | `/api/registration-keys` | Crear una clave de agente |
| POST | `/api/agent/register` | Registrar un agente |
| POST | `/api/agent/heartbeat` | Recibir heartbeat del agente |
| POST | `/api/agent/stats` | Recibir métricas |

La lista completa está en [DOCUMENTACION.md](DOCUMENTACION.md).

## Limitaciones actuales

- No hay migraciones ni scripts SQL incluidos; las tablas requeridas deben existir en PostgreSQL.
- No hay configuración Docker implementada.
- El frontend expone login, registro, dashboard, listado/detalle de servidores y generación de claves; la API contiene además operaciones remotas para servicios, archivos y comandos.
- No hay scripts de pruebas en backend ni frontend. El script `test` del agente termina con error porque es el placeholder del `package.json`.

## Licencia

ISC