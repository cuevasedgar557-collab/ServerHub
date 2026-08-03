const {
    crearLock
} = require("./utils/lock");

const {
    iniciarAgente
} = require("./agente");

crearLock();

iniciarAgente();