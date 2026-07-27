const { Client } = require("ssh2");

function ejecutarComando(config, comando) {
    return new Promise((resolve, reject) => {

        const conexion = new Client();

        conexion
            .on("ready", () => {

                conexion.exec(comando, (error, stream) => {

                    if (error) {
                        conexion.end();
                        return reject(error);
                    }

                    let resultado = "";

                    stream.on("data", (data) => {
                        resultado += data.toString();
                    });

                    stream.stderr.on("data", (data) => {
                        console.error(data.toString());
                    });

                    stream.on("close", () => {
                        conexion.end();
                        resolve(resultado.trim());
                    });

                });

            })
            .on("error", (error) => {
                reject(error);
            })
            .connect(config);

    });
}

module.exports = {
    ejecutarComando
};