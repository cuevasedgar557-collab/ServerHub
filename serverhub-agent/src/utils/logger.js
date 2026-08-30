const fs = require("fs");
const path = require("path");

const logsDir = path.join(
    __dirname,
    "..",
    "logs"
);

const MAX_LOG_SIZE =
    5 * 1024 * 1024;

if (!fs.existsSync(logsDir)) {

    fs.mkdirSync(
        logsDir,
        { recursive: true }
    );

}

function rotateLog(file) {

    const filePath =
        path.join(logsDir, file);

    if (
        !fs.existsSync(filePath)
    ) {
        return;
    }

    const stats =
        fs.statSync(filePath);

    if (
        stats.size <
        MAX_LOG_SIZE
    ) {
        return;
    }

    const backupPath =
        `${filePath}.1`;

    if (
        fs.existsSync(backupPath)
    ) {

        fs.unlinkSync(
            backupPath
        );

    }

    fs.renameSync(
        filePath,
        backupPath
    );
}

function writeLog(
    file,
    level,
    message
) {

    const timestamp =
        new Date().toISOString();

    const line =
        `[${timestamp}] [${level}] ${message}\n`;

    rotateLog(file);

    fs.appendFileSync(
        path.join(logsDir, file),
        line
    );
}

function info(message) {

    console.log(message);

    writeLog(
        "app.log",
        "INFO",
        message
    );

}

function warn(message) {

    console.warn(message);

    writeLog(
        "app.log",
        "WARN",
        message
    );

}

function error(message) {

    console.error(message);

    writeLog(
        "error.log",
        "ERROR",
        message
    );

}

module.exports = {
    info,
    warn,
    error
};