const express = require("express");
const mysql = require("mysql2");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("Public"));

// Koneksi ke database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "database_kampus"
});

db.connect((err) => {
    if (err) {
        console.error("Koneksi Gagal", err.message);
        return;
    }
    console.log("Terhubung ke databse MySql")
});

// API Endpoint sederhana
app.get("/api/mahasiswa", (req, res) => {
    db.query("SELECT * FROM mahasiswa ORDER BY id DESC", (err, results) => {
        if (err) return res.status(500).json({
            success: false,
            message: err.message
        });
        res.json(results);
    });
});


// 2. Tambah data mahasiswa
app.post("/api/mahasiswa", (req, res) => {
    const { nama, nim, jurusan, email} = req.body;
    const sql = "INSERT INTO mahasiswa (nama, nim, jurusan, email) VALUES (?, ?, ?, ?)";
    db.query(sql, [nama, nim, jurusan, email], (err, result) => {
        if (err) return res.status(500).json({
            success: false,
            message: err.message
        });

        res.json({
            success: true,
            message: "Data mahasiswa berhasil ditambahkan",
        });
    });
});

// 3. Update data mahasiswa
app.put("/api/mahasiswa/:id", (req, res) => {
    const { id } = req.params;
    const { nama, nim, jurusan, email } = req.body;
    const sql = "UPDATE mahasiswa SET nama = ?, nim = ?, jurusan = ?, email = ? WHERE id = ?";
    
    db.query(sql, [nama, nim, jurusan, email, id], (err, result) => {
        if (err) return res.status(500).json({
            success: false,
            message: err.message
        });
        res.json({
            success: true,
            message: "Data mahasiswa berhasil diperbarui"
        });
    });
});

// 4. Hapus data mahasiswa
app.delete("/api/mahasiswa/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM mahasiswa WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({
            success: false,
            message: err.message
        });
        res.json({
            success: true,
            message: "Data mahasiswa berhasil dihapus"
        });
    });
});


app.listen(PORT, () => {
    console.log(`Server berjalan pada port http://localhost:${PORT}`);
});