const express = require("express");
const cors = require("cors");

const serverRoutes = require("./routes/server.routes");
const authRoutes = require("./routes/auth.routes");
const registrationKeyRoutes =
    require("./routes/registration-key.routes");
const agentRoutes =
    require("./routes/agent.routes");
const dashboardRoutes =
    require("./routes/dashboard.routes");
const healthRoutes =
    require("./routes/health.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/server", serverRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/registration-keys", registrationKeyRoutes);
app.use("/api/agent", agentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/health", healthRoutes);

module.exports = app;