const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session'); 
const fs = require('fs'); 
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');
const queries = require('./queries'); 

const sessionConfig = JSON.parse(fs.readFileSync('sessionConfig.json', 'utf8'));

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'web2',
  password: 'L1nk3d',
  port: 5432
});

const app = express();

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());
app.use(session(sessionConfig));

app.post('/users/register', async (req, res) => {
  console.log('Registro recibido:', req.body);
  try {
      const { email, password } = req.body;

      const userExists = await pool.query(queries.CHECK_USER_EXISTS, [email]);
      if (userExists.rows.length > 0) {
          return res.status(400).send('El usuario ya existe');
      }

      const personResult = await pool.query(queries.INSERT_PERSON);
      const personId = personResult.rows[0].id;
      const hashedPassword = await bcrypt.hash(password, 10);

      console.log('Contraseña hasheada antes de insertar:', hashedPassword); // Verificar el hash

      const userResult = await pool.query(queries.INSERT_USER, [email, hashedPassword, personId]);
      const userId = userResult.rows[0].id;

      // Asignar rol por defecto
      await pool.query(queries.ASSIGN_DEFAULT_ROLE, [userId]);

      res.status(201).send({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
      console.error('Error registrando usuario:', error);
      res.status(500).send('Error en el registro');
  }
});

// Ruta para obtener los módulos asignados al perfil de usuario
app.get('/users/modules', isAuthenticated, async (req, res) => {
  const userId = req.session.user.id; // El id del usuario está en la sesión

  try {
    const result = await pool.query(queries.GET_USER_MODULES, [userId]);
    const modules = result.rows;

    if (modules.length === 0) {
      return res.status(404).send('No se encontraron módulos para este usuario');
    }

    res.json({ modules });
  } catch (error) {
    console.error('Error obteniendo los módulos del usuario:', error);
    res.status(500).send('Error al obtener los módulos');
  }
});


// Login de usuario
app.post('/users/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(queries.GET_USER_BY_EMAIL, [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).send('Usuario no encontrado');
    }

    console.log('Contraseña guardada en la base de datos:', user.password); // Verificar la contraseña guardada

    if (await bcrypt.compare(password, user.password)) {
      req.session.user = { id: user.id, email: user.email };
      res.json({ message: 'Inicio de sesión exitoso' });
    } else {
      res.status(401).send('Credenciales inválidas');
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).send('Error al iniciar sesión');
  }
});

// Middleware para autenticación
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).send('No autenticado');
  }
};

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});