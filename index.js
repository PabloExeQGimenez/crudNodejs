const express = require('express');
const app = express();
require("dotenv").config();
const mongoose = require('mongoose');
const AutorRouter = require('./routers/AutorRouter');
const LibroRouter = require("./routers/LibroRouter");


app.use(express.json({ extended: true }));
app.use(express.urlencoded());

// enrutado
app.use("/api", AutorRouter);
app.use("/api", LibroRouter);

// coneccion BD
const URL = process.env.MONGO_DB;

mongoose.connect(URL, {})
.then(() => {
    console.log('Conectado a la base de datos')
})
.catch((err) => {
    console.log(err)
})



app.listen(5400, () => {
    console.log('Servidor en puerto 5400')
})
