const app = require("./app");
const { PORT } = require("./config/env");
const pool = require("./config/db");

async function startServer() {
    try {
        // Verificar conexión con PostgreSQL
        await pool.query("SELECT NOW()");

        console.log("✅ Base de datos conectada");

        // Iniciar servidor Express
        app.listen(PORT, () => {
            console.log(`🚀 Servidor iniciado en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("❌ Error conectando a PostgreSQL");
        console.error(error);

        process.exit(1);
    }
}

startServer();