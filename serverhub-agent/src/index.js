const {
    registerAgent
} = require("./services/register.service");

async function main() {

    try {

        const result = await registerAgent(
            "SHUB-9262-B556"
        );

        console.log(
            "✅ Agente registrado"
        );

        console.log(result);

    } catch (error) {

        console.error(
            "❌ Error:",
            error.response?.data || error.message
        );

    }
}

main();