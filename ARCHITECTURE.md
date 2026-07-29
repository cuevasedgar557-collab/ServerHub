ServerHub

Objetivo:
Administrar VPS mediante agentes instalados en cada servidor.

Componentes:

1. Frontend React
2. Backend Principal
3. ServerHub Agent

# Entidades MVP

## users
Usuarios del sistema.

## servers
Servidores registrados por un usuario.

## agents
Instalaciones del agente.

## registration_keys
Claves de vinculación temporales.

Funciones MVP:

- Login
- Registro de VPS
- Monitoreo CPU
- Monitoreo RAM
- Monitoreo Disco

# Base de Datos V1

## users
- id
- name
- email
- password_hash
- is_active
- created_at
- updated_at

## servers
- id
- user_id
- name
- description
- status
- created_at
- updated_at

## agents
- id
- server_id
- agent_token
- version
- last_seen
- created_at

## registration_keys
- id
- user_id
- key
- is_used
- expires_at
- created_at

Futuras tablas

- refresh_tokens
- server_metrics
- audit_logs

