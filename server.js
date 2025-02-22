/*require("dotenv").config();  //load environment variables
const express = require("express"); //a web framework to create backend server
const cors = require("cors"); //allows requests from a different origin
const db = require("./config/db");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //allows backend to read JSON from frontend
app.use(cors()); //allows frontend to communicate with backend

//MYSQL Database Connection
//const db = mysql.createConnection({
//    host: "localhost",
//    user: "root",
//    password: "#Zulfikli2002",
//    database: "cartyredb",
//});

db.connect((err) => {
    if(err) {
        console.error("Database connection failed", err);
        return;
    }
    console.log("Connected to MySQL Database");
});

const productRoutes = require("./routes/products"); //Import products route
const customerRoutes = require("./routes/customers");
const staffsRoutes = require("./routes/staffs");

app.use("/products", productRoutes);
app.use("/customers", customerRoutes);
app.use("/staffs", staffsRoutes);


//Sample API Route
app.get("/", (req, res) => {
    res.send("Cartyre Backend is Running");
});

app.listen(port, () => console.log(`Server running on port ${port}`));*/

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

//Sample query to check if PostgreSQL is working
app.get("/test-db", async (req, res) => {
    try {
        const results = await db.query("SELECT NOW()");
        res.json({ success: true, time: results.rows[0]});
    } catch (err) {
        res.status(500).json({ success:false, error: err.message});
    }
});

const productRoutes = require("./routes/products"); //Import products route
const customerRoutes = require("./routes/customers");
const staffsRoutes = require("./routes/staffs");

app.use("/products", productRoutes);
app.use("/customers", customerRoutes);
app.use("/staffs", staffsRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));