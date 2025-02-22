const express = require("express");
const router = express.Router();
const db = require("../config/db");

//Get all staffs
router.get("/", (req, res) => {
    db.query("SELECT * FROM tbl_staffs_a187793", (err, results) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

module.exports = router;