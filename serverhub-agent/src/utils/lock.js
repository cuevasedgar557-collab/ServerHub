const fs = require("fs");
const path = require("path");

const lockPath = path.join(
    __dirname,
    "..",
    "runtime",
    "serverhub-agent.lock"
);

function crearLock() {

    if (fs.existsSync(lockPath)) {

        console.log(
            "⚠️ ServerHub Agent ya está ejecutándose"
        );

        process.exit(1);

    }

    fs.writeFileSync(
        lockPath,
        process.pid.toString()
    );

    const limpiarLock = () => {

        if (fs.existsSync(lockPath)) {
            fs.unlinkSync(lockPath);
        }

    };

    process.on("exit", limpiarLock);

    process.on("SIGINT", () => {

        limpiarLock();

        process.exit();

    });

    process.on("SIGTERM", () => {

        limpiarLock();

        process.exit();

    });

}

module.exports = {
    crearLock
};