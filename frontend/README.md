# Frontend de ServerHub

Interfaz React 19 servida y construida con Vite 8.

## Desarrollo

```bash
npm install
npm run dev
```

La API se configura con `VITE_API_URL`. El valor predeterminado es `http://localhost:3000`.

## Scripts

- `npm run dev`: inicia el servidor de desarrollo Vite.
- `npm run build`: genera la compilación de producción.
- `npm run preview`: sirve localmente la compilación generada.
- `npm run lint`: ejecuta ESLint.

## Rutas de la interfaz

- `/login`: inicio de sesión.
- `/register`: registro de usuario.
- `/dashboard`: dashboard protegido.
- `/servers/:id`: detalle protegido de un servidor.
- `/`: redirige a `/dashboard`.
- Cualquier otra ruta muestra la página `NotFound`.

El dashboard consulta datos cada 20 segundos. El detalle de servidor actualiza el estado del agente y la última métrica cada 15 segundos.