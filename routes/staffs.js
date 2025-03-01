const express = require("express");
const router = express.Router();
const pool = require("../config/db");

//Get all staffs
router.get("/", async(req, res) => {
    try{
        const results = await pool.query("SELECT * FROM tbl_staffs_a187793");
        res.json(results.rows);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

module.exports = router;