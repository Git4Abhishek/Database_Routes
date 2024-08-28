const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root', // MySQL username
    password: '', // MySQL password
    database: 'table_a' // Name of Database (don't confuse it with Table Name)
});

router.post('/', (req, res) => {
    // Inserting Data
    const { company_name, street, city, state, zip_code, country } = req.body;
    const query = `INSERT INTO table_a (company_name, street, city, state, zip_code, country) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(query, [company_name, street, city, state, zip_code, country], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, msg: err});
        }
        res.status(201).json({ success: true,
            msg: 'Company added successfully!',
            data: { company_name, street, city, state, zip_code, country }});
    });
});

router.get('/', (req, res) => {
    // Fetching Data
    const query = `SELECT * FROM table_a`;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, msg: err});
        }
        res.json({ success: true, data: results });
    });
});

router.put('/:id', (req, res) => {
    // Updating Data
    const { id } = req.params;
    const { company_name, street, city, state, zip_code, country } = req.body;
    const query = `UPDATE table_a SET company_name = ?, street = ?, city = ?, state = ?, zip_code = ?, country = ?, updatedAt = NOW() WHERE id = ?`;
    db.query(query, [company_name, street, city, state, zip_code, country, id], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, msg: err});
        }
        res.send({ success: true, msg: 'Company updated successfully!' });
    });
});

router.delete('/:id', (req, res) => {
    // Deleting Data
    const { id } = req.params;
    const query = `DELETE FROM table_a WHERE id = ?`;
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, msg: err});
        }
        res.json({ success: true, msg: "Company deleted successfully!" });
    });
});

module.exports = router;