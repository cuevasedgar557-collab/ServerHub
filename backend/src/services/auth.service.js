const bcrypt = require("bcrypt");
const pool = require("../config/db");
const jwt = require("jsonwebtoken");

const {
    JWT_SECRET
} = require("../config/env");


async function register(data) {

    const { name, email, password } = data;

    if (!name || !email || !password) {
        throw new Error("Todos los campos son obligatorios");
    }

    const existingUser = await pool.query(
        "SELECT id FROM users WHERE email = $1",
        [email]
    );

    if (existingUser.rows.length > 0) {
        throw new Error("El correo ya está registrado");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
        `
        INSERT INTO users
        (name, email, password_hash)
        VALUES ($1, $2, $3)
        RETURNING id, name, email, created_at
        `,
        [name, email, passwordHash]
    );

    return result.rows[0];
}

async function login(data) {

    const { email, password } = data;

    if (!email || !password) {
        throw new Error("Correo y contraseña son obligatorios");
    }

    const result = await pool.query(
        `
        SELECT *
        FROM users
        WHERE email = $1
        `,
        [email]
    );

    const user = result.rows[0];

    if (!user) {
        throw new Error("Credenciales inválidas");
    }

    const passwordValid = await bcrypt.compare(
        password,
        user.password_hash
    );

    if (!passwordValid) {
        throw new Error("Credenciales inválidas");
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        JWT_SECRET,
        {
            expiresIn: "24h"
        }
    );

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    };
}
module.exports = {
    register,
    login
};