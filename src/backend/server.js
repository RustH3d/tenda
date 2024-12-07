const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

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

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configurar bodyParser para leer JSON
app.use(bodyParser.json());

// Configuración de multer para subir imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Función para filtrar los archivos por tipo
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Solo se permiten archivos de imagen');
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

const SECRET_KEY = 'your_secret_key'; // Clave secreta para JWT

// Ruta para registrar un nuevo usuario
app.post('/users/register', async (req, res) => {
  console.log('Registro recibido:', req.body);
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

// Ruta para subir una imagen
app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }
  const imageUrl = `http://localhost:3000/uploads/${file.filename}`;
  res.json({ imageUrl });
});

// Crear un nuevo producto
app.post('/products', async (req, res) => {
  const { name, description, price, category, user_id, imageUrl } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO products (name, description, price, category, user_id, imageUrl) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, description, price, category, user_id, imageUrl]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).send('Error creating product');
  }
});

// Obtener productos con filtrado por categoría o término de búsqueda
app.get('/products', async (req, res) => {
  const { category, search } = req.query;
  let query = 'SELECT * FROM products';
  const queryParams = [];

  if (category) {
    queryParams.push(category);
    query += ` WHERE category = $${queryParams.length}`;
  } else if (search) {
    queryParams.push(`%${search}%`);
    query += ` WHERE name ILIKE $${queryParams.length}`;
  }

  try {
    const result = await pool.query(query, queryParams);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Error fetching products');
  }
});

// Ruta para obtener 5 productos aleatorios
app.get('/products/random', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY RANDOM() LIMIT 5');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching random products:', error);
    res.status(500).send('Error fetching random products');
  }
});

// Actualizar un producto
app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category_id, imageUrl } = req.body; // Incluir imageUrl
  try {
    await pool.query(
      'UPDATE products SET name = $1, description = $2, price = $3, category_id = $4, imageUrl = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6',
      [name, description, price, category_id, imageUrl, id]
    );
    res.status(200).send({ message: 'Producto actualizado exitosamente' });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).send('Error updating product');
  }
});

// Eliminar un producto
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    res.status(200).send({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).send('Error deleting product');
  }
});

// Puerto para escuchar las solicitudes
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
