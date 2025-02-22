const express = require("express");
const router = express.Router();
const db = require("../config/db");

//Get all products
router.get("/", (req, res) => {
    db.query("SELECT * FROM tbl_products_a187793", (err, results) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

//Add a product
router.post("/", (req, res) => {
    const {fld_product_id, fld_product_name, fld_price, fld_brand, fld_tyre_size, fld_stock_left, fld_warranty_length, fld_product_image} = req.body;
    if (!fld_product_id || !fld_product_name || !fld_price || !fld_brand || !fld_tyre_size || !fld_stock_left || !fld_warranty_length || !fld_product_image) {
        return res.status(400).json({message: "All fields are required"});
    }

    const sql = "INSERT INTO tbl_products_a187793 (fld_product_id, fld_product_name, fld_price, fld_brand, fld_tyre_size, fld_stock_left, fld_warranty_length, fld_product_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(sql, [fld_product_id, fld_product_name, fld_price, fld_brand, fld_tyre_size, fld_stock_left, fld_warranty_length, fld_product_image], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({message: "Database error", error: err.message});
        }
        res.json({message: "Product added successfully"});
    });
});

//Get last ID product
router.get("/last-id", (req, res) => {
    const sql = "SELECT fld_product_id FROM tbl_products_a187793 ORDER BY fld_product_id DESC LIMIT 1";

    db.query(sql, (err, results) => {
        if(err) {
            return res.status(500).json({message: "Databases error", error: err});
        }
        if(results.length === 0) {
            return res.json({nextID: "A01"});
        }

        const lastID = results[0].fld_product_id;
        const match = lastID.match(/([A-Za-z]+)(\d+)/);

        if (match) {
            const prefix = match[1];
            const number = parseInt(match[2]) + 1;
            const nextID = prefix + number;
            res.json({nextID});
        } else {
            res.json({nextID:"A01"});
        }
    });
});

//Delete a product ID
router.delete("/:id", (req, res) => {
    const productID = req.params.id;
    db.query("DELETE FROM tbl_products_a187793 WHERE fld_product_id =?", [productID], (err, results) => {
        if(err) {
            return res.status(500).json({error: "Failed to delete product"});
        }
        if(results.affectedRows === 0) {
            return res.status(404).json({error: "Product not found"});
        }
        res.json({message: "Product deleted successfully"});
    });
});


module.exports = router;