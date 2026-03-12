// server.js

const express = require('express');
const { testConnection, sequelize } = require('./database');
require('dotenv').config();
const User = require('./models/User');
const OfertasTrabajo = require('./models/OfertasTrabajo');
const Categoria = require('./models/Categoria');
const app = express();
const PORT = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API!');
});


app.use('/Usuarios/', require('./routes/users')); 

app.use('/Trabajos/', require('./routes/ofertas'));

app.use('/Categoria/', require('./routes/categoria'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('¡Algo salió mal!');
});

const startServer = async () => {
    try {
        await testConnection();
        await sequelize.sync({ alter : true , force : true });
        await sequelize.sync({ alter : true /*, force : true*/ }); // Sincroniza todos los modelos
        console.log('Modelos sincronizados con la base de datos.');
        
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
};

startServer();
