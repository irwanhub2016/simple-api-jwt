const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = process.env.PORT || 3000;
const secretKey = 'your_secret_key'; // Kunci rahasia untuk JWT

app.use(bodyParser.json());

const limiter = rateLimit({
  windowMs: 10 * 1000,
  max: 1,
  message: "Too many requests from this IP, please try again later"
});

// Middleware untuk autentikasi token JWT
function authenticateToken(req, res, next) {
  // Mendapatkan header authorization dari request
  const authHeader = req.headers['authorization'];
  // Mendapatkan token JWT dari header authorization
  const token = authHeader && authHeader.split(' ')[1];
  
  // Jika token tidak ada, kirim response 401 (Unauthorized)
  if (!token) return res.sendStatus(401);

  // Verifikasi token
  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.use(limiter);

// Endpoint GET untuk halaman utama
app.get('/', (req, res) => {
  res.send('Selamat datang di API sederhana dengan JWT authentication!');
});

// Endpoint POST untuk login dan mendapatkan token JWT
app.post('/login', (req, res) => {
  // Dapatkan data login dari body request
  const { username, password } = req.body;
  
  // Simulasi pengguna yang berhasil login
  const user = { username };

  // Buat token JWT
  const token = jwt.sign(user, secretKey);
  
  // Kirim token sebagai respons
  res.json({ token });
});

// Endpoint GET yang memerlukan autentikasi token JWT
app.get('/api/data', authenticateToken, (req, res) => {
  // Hanya jika token telah diverifikasi, data akan dikirimkan
  res.json({ message: 'Data yang diambil dengan autentikasi JWT' });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan pada http://localhost:${PORT}`);
});
