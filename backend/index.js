const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

//Servidor
const app = express();

//Conectar DB
conectarDB();

//CORS
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

//Middlewares
app.use(express.json());

//Rutas
app.use('/api/answers', require('./routes/answers'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/questions', require('./routes/questions'));

app.listen(3000, () => {
    console.log('El servidor esta corriendo ')
})