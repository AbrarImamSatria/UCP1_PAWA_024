const express = require('express');
const router = express.Router();
const db = require('../database/db'); // Pastikan path sesuai dengan file koneksi database Anda

// Route untuk halaman utama: Melihat Data
router.get('/', (req, res) => {
  const query = 'SELECT * FROM pengunjung';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).send('Internal Server Error');
    }

    res.render('index', {
      layout: 'layouts/main-layout',
      pengunjung: results, // Kirim data pengunjung ke index.ejs
    });
  });
});

// Route untuk menambahkan data pengunjung
router.post('/add', (req, res) => {
  const { nama, jumlah_pengunjung } = req.body;

  const query = 'INSERT INTO pengunjung (nama, jumlah_pengunjung) VALUES (?, ?)';
  db.query(query, [nama, jumlah_pengunjung], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Internal Server Error');
    }

    console.log('Data pengunjung berhasil ditambahkan:', result);
    res.redirect('/');
  });
});

// Route untuk menampilkan form edit
router.get('/edit/:id', (req, res) => {
  const id = req.params.id;

  const query = 'SELECT * FROM pengunjung WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).send('Internal Server Error');
    }

    if (results.length === 0) {
      return res.status(404).send('Data not found');
    }

    res.render('edit', {
      layout: 'layouts/main-layout',
      pengunjung: results[0], // Kirim data pengunjung ke form edit
    });
  });
});

// Route untuk mengupdate data pengunjung
router.post('/update/:id', (req, res) => {
  const id = req.params.id; // Mengambil id dari URL parameter
  const { nama, jumlah_pengunjung } = req.body; // Mengambil data dari body request

  // Query untuk mengupdate data pengunjung berdasarkan ID
  const query = 'UPDATE pengunjung SET nama = ?, jumlah_pengunjung = ? WHERE id = ?';
  
  // Menjalankan query update ke database
  db.query(query, [nama, jumlah_pengunjung, id], (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      return res.status(500).send('Internal Server Error');
    }

    // Jika update berhasil, redirect ke halaman utama
    console.log('Data pengunjung berhasil diupdate:', result);
    res.redirect('/');
  });
});

// Route untuk menghapus data pengunjung
router.post('/delete/:id', (req, res) => {
  const id = req.params.id;

  const query = 'DELETE FROM pengunjung WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting data:', err);
      return res.status(500).send('Internal Server Error');
    }

    console.log('Data pengunjung berhasil dihapus:', result);
    res.redirect('/');
  });
});

module.exports = router;
