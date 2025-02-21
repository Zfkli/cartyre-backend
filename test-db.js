const db = require("./db");

db.query("SELECT 1", (err, results) => {
  if (err) {
    console.error("Database test failed:", err);
  } else {
    console.log("✅ Database test successful:", results);
  }
  db.end();
});
