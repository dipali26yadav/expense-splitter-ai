const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Babbar@123",
  database: "expense_splitter_ai"
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed");
  } else {
    console.log("Connected to MySQL");
  }
});

app.get("/", (req, res) => {
  res.send("Expense Splitter Backend Running");
});

app.get("/testAdd", (req, res) => {
  const sql = "INSERT INTO participants (name) VALUES ('Dipali')";

  db.query(sql, (err, result) => {
    if (err) {
      res.send("Error inserting");
    } else {
      res.send("Participant inserted");
    }
  });
});

app.post("/addParticipant", (req, res) => {
  const { name } = req.body;

  const sql = "INSERT INTO participants (name) VALUES (?)";

  db.query(sql, [name], (err, result) => {
    if (err) {
      res.send("Error inserting participant");
    } else {
      res.send("Participant added successfully");
    }
  });
});

app.post("/addExpense", (req, res) => {
  const { title, amount, paid_by } = req.body;

  const sql = "INSERT INTO expenses (title, amount, paid_by) VALUES (?, ?, ?)";

  db.query(sql, [title, amount, paid_by], (err, result) => {
    if (err) {
      res.send("Error inserting expense");
    } else {
      res.send("Expense added successfully");
    }
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});