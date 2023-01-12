const bcrypt = require("bcrypt");
const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db");

const login = async (request, response) => {
    const {usuario, password} = request.body;
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    connection.query("SELECT fullname from Users where username = ? and password = ? ",
        [usuario, passwordHash],
        (error, results) => {
            if(error)
                throw error;
            response.status(200).json(results);
        });
};

//ruta
app.route("/login")
    .post(login);

module.exports = app;
