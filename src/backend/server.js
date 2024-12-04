const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const cors = require('cors'); // Importar CORS

// Configuración de la base de datos PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'prueba',
  password: 'mg100457',
  port: 5000,
});

const app = express();

// Configurar CORS para permitir peticiones desde el puerto 4200
app.use(cors({
  origin: 'http://localhost:4200'
}));

// Configurar bodyParser para leer JSON
app.use(bodyParser.json());

const SECRET_KEY = 'your_secret_key'; // Clave secreta para JWT

// Ruta para registrar un nuevo usuario
app.post('/users/register', async (req, res) => {
  console.log('Registro recibido:', req.body); // Verifica los datos que llegan
  try {
    const { username, password, email } = req.body;

    // Verificar si el usuario ya existe
    const userExists = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (userExists.rows.length > 0) {
      return res.status(400).send('User already exists');
    }

    // Hashear la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (username, password, email) VALUES ($1, $2, $3)',
      [username, hashedPassword, email]
    );
    res.status(201).send({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Error registering user');
  }
});

// Ruta para iniciar sesión de usuario
app.post('/users/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Buscar el usuario en la base de datos
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];

    // Verificar las credenciales
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { id: user.id, username: user.username }, 
        SECRET_KEY, 
        { expiresIn: '1h' }
      );
      res.json({ token });
    } else {
      res.status(401).send('Credenciales inválidas');
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).send('Error al iniciar sesión');
  }
});

// Puerto para escuchar las solicitudes
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
