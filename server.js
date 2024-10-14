const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  password: "",
  database: "Pertemuan6",
  user: "root",
});

connection.connect((err) => {
  if (err) {
    console.error("Terjadi kesalahan...", err.stack);
    return;
  }
  console.log("koneksi berhasil");
});

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const query = "select * FROM Mahasiswa";
  connection.query(query, (err, results) => {
    res.render("idex", { Mahasiswa: results });
  });
});

//Create, input, insert

app.post("/add", (req, res) => {
  const { Nama, Prodi, Angkatan, Email } = req.body;
  const query =
    "INSERT INTO Mahasiswa (Nama, Prodi, Angkatan, Email) VALUES (?, ?, ?, ?)";

  connection.query(query, [Nama, Prodi, Angkatan, Email], (err, results) => {
    if (err) throw err;
    res.redirect("/");
  });
});

//update
//akses halaman

app.get("/edit/:id", (req, res) => {
  const query = "select * FROM Mahasiswa WHERE ID = ?";
  connection.query(query, [req.params.id], (err, result) => {
    if (err) throw err;
    res.render("edit", { Mahasiswa: result[0] });
  });
});
app.post("/update/:id", (req, res) => {
  const { Nama, Prodi, Angkatan, Email } = req.body;
  const query =
    "UPDATE Mahasiswa SET Nama = ?, Prodi = ?, Angkatan = ?, Email = ? WHERE id = ? ";

  connection.query(
    query,
    [Nama, Prodi, Angkatan, Email, req.params.id],
    (err, results) => {
      if (err) throw err;
      res.redirect("/");
    }
  );
});

//hapus
app.get("/delete/:id", (req, res) => {
  const query = "DELETE FROM Mahasiswa WHERE ID = ?";
  connection.query(query, [req.params.id], (err, result) => {
    if (err) throw err;
    res.redirect("/");
  });
});

app.listen(3000, () => {
  console.log("server ready...");
});
