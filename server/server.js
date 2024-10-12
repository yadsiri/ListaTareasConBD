const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());

//conectar a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'servidores', 
    database: 'listatareas'  
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
    } else {
        console.log('Conexión exitosa a la base de datos MySQL.');
    }
});

// Crear tabla si no existe
const createTableQuery = `CREATE TABLE IF NOT EXISTS tareasagregadas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion TEXT NOT NULL,
    completada BOOLEAN DEFAULT 0
)`;

db.query(createTableQuery, (err, result) => {
    if (err) {
        console.error('Error al crear la tabla:', err.message);
    }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Rutas
app.post('/listatareas', (req, res) => {
    const { descripcion } = req.body;
    const query = `INSERT INTO tareasagregadas (descripcion) VALUES (?)`;
    db.query(query, [descripcion], (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ id: result.insertId, descripcion, completada: 0 });
    });
});

app.get('/listatareas', (req, res) => {
    const query = `SELECT * FROM tareasagregadas`;
    db.query(query, (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ tareas: rows });
    });
});

app.delete('/listatareas/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM tareasagregadas WHERE id = ?`;
    db.query(query, [id], (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'Tarea eliminada correctamente' });
    });
});
//ruta para actualizar el estado de la tarea (completada o no)
app.put('/listatareas/:id/completar', (req, res) => {
    const { id } = req.params;
    const { completada } = req.body; //esperamos recibir si la tarea está completada o no

    const query = `UPDATE tareasagregadas SET completada = ? WHERE id = ?`;
    db.query(query, [completada, id], (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'Tarea actualizada correctamente' });
    });
});
