const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Conectar a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Cambia esto por tu usuario de MySQL
    password: 'servidores',  // Cambia esto por tu contraseña de MySQL
    database: 'listatareas'  // Cambia esto por tu base de datos
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
    const query = `SELECT * FROM tareasagregadas`; // Asegúrate de que aquí también esté el nombre correcto
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
    const query = `DELETE FROM tareasagregadas WHERE id = ?`; // Cambia esto
    db.query(query, [id], (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'Tarea eliminada correctamente' });
    });
});
