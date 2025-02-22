const express = require("express");
const router = express.Router();
const pool = require("../config/db");

//Get all products
router.get("/", async(req, res) => {
    try {
        const result = await pool.query("SELECT * FROM tbl_products_a187793");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

//Add a product
router.post("/", async(req, res) => {
    const {fld_product_id, fld_product_name, fld_price, fld_brand, fld_tyre_size, fld_stock_left, fld_warranty_length, fld_product_image} = req.body;
    if (!fld_product_id || !fld_product_name || !fld_price || !fld_brand || !fld_tyre_size || !fld_stock_left || !fld_warranty_length || !fld_product_image) {
        return res.status(400).json({message: "All fields are required"});
    }

    const sql = `INSERT INTO tbl_products_a187793 (fld_product_id, fld_product_name, fld_price, fld_brand, fld_tyre_size, fld_stock_left, fld_warranty_length, fld_product_image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;

    try {
        await pool.query(sql, [fld_product_id, fld_product_name, fld_price, fld_brand, fld_tyre_size, fld_stock_left, fld_warranty_length, fld_product_image]);
        res.json({ message: "Product added successfully"});
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ message: "Database error", error: err.message});
    }
});

//Get last ID product
router.get("/last-id", async(req, res) => {
    const sql = "SELECT fld_product_id FROM tbl_products_a187793 ORDER BY fld_product_id DESC LIMIT 1";

    try {
        const result = await pool.query(sql);
        if(result.rows.length === 0) {
            return res.json({ nextID: "A01"});
        }

        const lastID = result.rows[0].fld_product_id;
        const match = lastID.match(/([A-Za-z]+)(\d+)/);

        if (match) {
            const prefix = match[1];
            const number = parseInt(match[2]) + 1;
            const nextID = prefix + number;
            res.json({nextID});
        } else {
            res.json({ nextID: "A01"});
        }
    } catch (err) {
        res.status(500).json({ message: "Database error", error: err.message});
    }
});

//Delete a product ID
router.delete("/:id", async(req, res) => {
    const productID = req.params.id;
    try {
        const result = await pool.query("DELETE FROM tbl_products_a187793 WHERE fld_product_id = $1", [productID]);

        if (result.rowCount ===0) {
            return res.status(404).json({ error: "Product not found"});
        }
        res.json({ message: "Product deleted successfully"});
    } catch (err) {
        res.status(500).json({ error: "Failed to delete product", details: err.message});
    }
});


module.exports = router;