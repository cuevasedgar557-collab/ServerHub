const express = require("express");
const cors = require("cors");

const serverRoutes = require("./routes/server.routes");
const authRoutes = require("./routes/auth.routes");
const registrationKeyRoutes =
    require("./routes/registration-key.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/server", serverRoutes);
app.use("/api/auth", authRoutes);
app.use(
    "/api/registration-keys",
    registrationKeyRoutes
);

module.exports = app;