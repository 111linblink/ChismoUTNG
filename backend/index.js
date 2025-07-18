const express = require('express');
const conectarDB = require('./config/db');
//Servidor
const app = express();

//Conectar DB
conectarDB();

//Rutas
app.use('/api/answers', require('./routes/answers'));

app.use(express.json());
app.listen(3000, () => {
    console.log('El servidor esta corriendo ')
})