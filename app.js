const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

const expressLayouts = require('express-ejs-layouts');

// Import routes
const pengunjungRoutes = require('./routes/pengunjung');

// Middleware
app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Route untuk halaman utama: Melihat Data
app.use('/', pengunjungRoutes);

// Route untuk halaman About
app.get('/about', (req, res) => {
  res.render('about', {
    layout: 'layouts/main-layout'
  });
});

// Route untuk halaman Contact Us
app.get('/contact', (req, res) => {
  res.render('contact', {
    layout: 'layouts/main-layout'
  });
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
