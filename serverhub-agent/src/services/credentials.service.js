const fs = require("fs");
const path = require("path");
const os = require("os");

function getCredentialsPath() {

    if (process.platform === "win32") {

        return path.join(
            process.env.ProgramData ||
            "C:\\ProgramData",
            "ServerHub",
            "credentials.json"
        );

    }

    return "/etc/serverhub/credentials.json";
}

function ensureDirectory() {

    const credentialsPath =
        getCredentialsPath();

    const directory =
        path.dirname(credentialsPath);

    fs.mkdirSync(
        directory,
        { recursive: true }
    );
}

function loadCredentials() {

    const credentialsPath =
        getCredentialsPath();

    if (!fs.existsSync(credentialsPath)) {

        return {
            agentToken: "",
            agentSecret: ""
        };

    }

    return JSON.parse(
        fs.readFileSync(
            credentialsPath,
            "utf8"
        )
    );
}

function saveCredentials(
    agentToken,
    agentSecret
) {

    ensureDirectory();

    fs.writeFileSync(
        getCredentialsPath(),
        JSON.stringify(
            {
                agentToken,
                agentSecret
            },
            null,
            4
        )
    );
}

function clearCredentials() {

    saveCredentials("", "");

}

function migrateFromConfig(config) {

    const credentials =
        loadCredentials();

    if (
        credentials.agentToken &&
        credentials.agentSecret
    ) {

        return;
    }

    if (
        !config.agentToken ||
        !config.agentSecret
    ) {

        return;
    }

    saveCredentials(
        config.agentToken,
        config.agentSecret
    );
}

module.exports = {
    loadCredentials,
    saveCredentials,
    clearCredentials,
    getCredentialsPath,
    migrateFromConfig
};