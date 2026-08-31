# ServerHub

Sistema centralizado para administrar y monitorear servidores Linux (VPS) desde una interfaz web intuitiva.

## 🎯 Características Principales

- ✅ **Autenticación segura** con JWT
- ✅ **Monitoreo en tiempo real** de recursos (CPU, RAM, Disco)
- ✅ **Sistema de alertas automáticas** cuando recursos excedan umbrales (>90%)
- ✅ **Dashboard unificado** con estadísticas agregadas
- ✅ **Agentes ligeros** que se instalan en servidores Linux
- ✅ **Claves de registro temporales** para vincular agentes de forma segura
- ✅ **Historial de auditoría** de operaciones críticas
- ✅ **Detección automática** de agentes offline

## 🏗️ Arquitectura

```
Frontend (React)  ←→  Backend API (Node.js/Express)  ←→  PostgreSQL
                        ↑
                  Agentes (Node.js)
                  en servidores
```

## 🛠️ Tecnologías

| Componente | Tecnología |
|---|---|
| **Frontend** | React 19 + Vite |
| **Backend** | Node.js + Express 5 |
| **Database** | PostgreSQL 12+ |
| **Agente** | Node.js + systeminformation |
| **Auth** | JWT + bcrypt |
| **Validación** | Joi |

## 📦 Instalación Rápida

### Backend
```bash
cd backend
npm install
npm run dev  # o npm start para producción
```

### Frontend
```bash
cd frontend
npm install
npm run dev  # o npm run build para producción
```

### Agente (en cada servidor)
```bash
cd serverhub-agent
npm install
node src/index.js SHUB-XXXX-XXXX  # Reemplazar con clave de registro
```

## 📋 Requisitos

- Node.js 18+
- PostgreSQL 12+
- npm o yarn

## 🔐 Configuración

### Variables de entorno requeridas (Backend)
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=serverhub
DB_USER=usuario
DB_PASSWORD=contraseña
JWT_SECRET=tu-secreto-muy-seguro
```

Ver [DOCUMENTACION.md](DOCUMENTACION.md) para lista completa de variables y configuración detallada.

## 📚 Documentación

Para documentación técnica completa, ver **[DOCUMENTACION.md](DOCUMENTACION.md)** que incluye:

- Arquitectura del sistema
- Estructura del proyecto
- API completa (25+ endpoints)
- Base de datos (ER diagram)
- Autenticación y seguridad
- Reglas de negocio
- Guía de desarrollo
- Limitaciones conocidas
- Mejoras futuras

## 🚀 Flujo Principal

1. **Usuario registra cuenta** en el sitio web
2. **Crea un servidor** desde el dashboard
3. **Genera clave de registro temporal** (24h)
4. **Instala agente en servidor Linux** con la clave
5. **Agente comienza a reportar** métricas cada 10 segundos
6. **Dashboard se actualiza** con estados y alertas en tiempo real

## 🔔 Sistema de Alertas

Alertas automáticas cuando:
- CPU > 90%
- RAM > 90%
- Disco > 90%
- Agente sin heartbeat por más de 2 minutos

Las alertas se resuelven automáticamente cuando el recurso baja de umbral.

## 📊 API Endpoints Principales

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/api/auth/register` | Registrar usuario |
| POST | `/api/auth/login` | Iniciar sesión |
| GET | `/api/server` | Listar servidores |
| POST | `/api/server` | Crear servidor |
| GET | `/api/dashboard` | Obtener estadísticas |
| POST | `/api/registration-keys` | Generar clave de agente |
| POST | `/api/agent/register` | Registrar agente |

Ver [DOCUMENTACION.md - Sección 9](DOCUMENTACION.md#9-api--endpoints) para documentación completa de todos los endpoints.

## 🛡️ Seguridad

- ✅ Contraseñas hasheadas con bcrypt
- ✅ Autenticación con JWT (24h de validez)
- ✅ Agentes autenticados con token + HMAC-SHA256
- ✅ Validación de timestamp y nonce (previene replay attacks)
- ✅ Rate limiting por agente
- ✅ Control de acceso basado en usuario
- ✅ Queries parametrizadas (SQL injection safe)
- ✅ Audit logs de operaciones críticas

## 📈 Estado del Proyecto

🚧 **En desarrollo**

- MVP funcional con funcionalidades principales
- Necesita: HTTPS en prod, logging centralizado, migr.SQL, tests

## 📝 Licencia

ISC

## 🤝 Contribuir

Ver sección "Mantenimiento y Desarrollo" en [DOCUMENTACION.md](DOCUMENTACION.md) para guía de cómo agregar nuevas funcionalidades.

---

**Para más detalles, consulta la [documentación técnica completa](DOCUMENTACION.md)**
