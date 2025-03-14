const express = require("express");
const router = express.Router();
const pool = require("../config/db");

//Get all customer
router.get("/", async(req, res) => {
    try {
        const result = await pool.query("SELECT * FROM tbl_customers_a187793");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

//Add a customer
router.post("/", async(req, res) => {
    const {fld_customer_id, fld_customer_fname, fld_customer_lname, fld_customer_gender, fld_customer_phone} = req.body;
    if (!fld_customer_id || !fld_customer_fname || !fld_customer_lname || !fld_customer_gender || !fld_customer_phone) {
        return res.status(400).json({message: "All fields are required"});
    }

    const sql = `INSERT INTO tbl_customers_a187793 (fld_customer_id, fld_customer_fname, fld_customer_lname, fld_customer_gender, fld_customer_phone) VALUES ($1, $2, $3, $4, $5)`;

    try {
        await pool.query(sql, [fld_customer_id, fld_customer_fname, fld_customer_lname, fld_customer_gender, fld_customer_phone]);
        res.json({message: "Customer added successfully"});
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({message: "Database error", error: err.message});
    }
})

router.get("/last-id", async(req, res) => {
    const sql = "SELECT fld_customer_id FROM tbl_customers_a187793 ORDER BY fld_customer_id DESC LIMIT 1";

    try {
        const result = await pool.query(sql);
        if (result.rows.length === 0) {
            return res.json({ nextID: "C01"});
        }

        const lastID = result.rows[0].fld_customer_id;
        const match = lastID.match(/([A-Za-z]+)(\d+)/);

        if (match) {
            const prefix = match[1];
            const number = parseInt(match[2]) + 1;
            const nextID = prefix + number;
            res.json({nextID});
        } else {
            res.json({nextID: "C01"});
        }
    } catch (err) {
        res.status(500).json({ message: "Database error", error: err.message});
    }
});

//Delete a customer
router.delete("/:id", async(req, res) => {
    const customerID = req.params.id;
    try {
        const result = await pool.query("DELETE FROM tbl_customers_a187793 WHERE fld_customer_id = $1", [customerID]);

        if (result.rowCount === 0) {
            return res.status(404).json({error: "Customer not found"});
        }
        res.json({ message: "Customer deleted successfully"});
    } catch (err) {
        res.status(500).json({ error: "Failed to delete product", details: err.message});
    }
});

module.exports = router;