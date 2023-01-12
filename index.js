const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(require('./routes/user'));

app.listen(3300,() => {
    console.log("Servidor corriendo en el puerto 3300");
});

module.exports = app;
