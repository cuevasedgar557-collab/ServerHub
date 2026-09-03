const { exec } = require("child_process");

function listarServicios() {

    return new Promise(
        (resolve, reject) => {

            let comando;

            if (
                process.platform === "win32"
            ) {

                comando =
                    'powershell -Command "Get-Service | Select-Object Name,Status | ConvertTo-Json -Compress"';

                exec(
                    comando,
                    {
                        maxBuffer:
                            10 * 1024 * 1024
                    },
                    (
                        error,
                        stdout
                    ) => {

                        if (error) {
                            return reject(error);
                        }

                        try {

                            let services =
                                JSON.parse(
                                    stdout
                                );

                            if (
                                !Array.isArray(
                                    services
                                )
                            ) {

                                services = [
                                    services
                                ];

                            }

                            return resolve(
                                services.map(
                                    service => ({
                                        name:
                                            service.Name,
                                        status:
                                            String(service.Status).toUpperCase()
                                    })
                                )
                            );

                        } catch (
                            parseError
                        ) {

                            return reject(
                                parseError
                            );

                        }

                    }
                );

                return;

            }

            comando =
                "systemctl list-units --type=service --all --no-pager --plain --no-legend";

            exec(
                comando,
                {
                    maxBuffer:
                        10 * 1024 * 1024
                },
                (
                    error,
                    stdout
                ) => {

                    if (error) {

                        return exec(
                            "service --status-all",
                            {
                                maxBuffer:
                                    10 * 1024 * 1024
                            },
                            (
                                fallbackError,
                                fallbackStdout
                            ) => {

                                if (
                                    fallbackError
                                ) {
                                    return reject(
                                        fallbackError
                                    );
                                }

                                const services =
                                    fallbackStdout
                                        .split("\n")
                                        .filter(Boolean)
                                        .map(line => {

                                            const status =
                                                line.includes("[ + ]")
                                                    ? "RUNNING"
                                                    : "STOPPED";

                                            const name =
                                                line
                                                    .replace(
                                                        /\[.*?\]/,
                                                        ""
                                                    )
                                                    .trim();

                                            return {
                                                name,
                                                status
                                            };

                                        });

                                resolve(
                                    services
                                );

                            }
                        );

                    }

                    const services =
                        stdout
                            .split("\n")
                            .filter(Boolean)
                            .filter(line =>
                                line.includes(".service")
                            )
                            .map(line => {

                                const parts =
                                    line
                                        .trim()
                                        .split(/\s+/);

                                return {
                                    name:
                                        parts[0],

                                    load:
                                        parts[1] ||
                                        "UNKNOWN",

                                    active:
                                        parts[2] ||
                                        "UNKNOWN",

                                    status:
                                        parts[3] ||
                                        "UNKNOWN"
                                };

                            });

                    resolve(
                        services
                    );

                }
            );

        }
    );

}

module.exports = {
    listarServicios
};