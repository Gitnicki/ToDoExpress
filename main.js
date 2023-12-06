var mysql = require('mysql');
const express = require('express');
const app = express();
const port = 3000;
require("dotenv").config();

app.use(express.json());

var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

// Connection zu mysql
/*   con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  }); */
  
// Connection zu mysql
  con.connect();


// List Route
app.get("/", (req, res) => {
    console.log("Req:", req.body);
    // sql query um alles aus dem table tasks aufzurufen
    con.query("SELECT * FROM tasks;", (err, result) => {
        if (err) {
          console.error("Error fetching data:", err);
          res.status(500).send("Error fetching data");
      } else {
        // sql Ergebnis in json umwandeln
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify?retiredLocale=de
//          var jsonobj = JSON.stringify(result);
          res.json({ tasks:result })
          res.status(200).send(jsonobj);
      }
    });
});

 // Save Route
app.post("/", (req, res) => {
    console.log("Req:", req.body);
    // sql query um Daten zu speichern
    var saveSql = `INSERT INTO tasks (taskname, taskstatus) VALUES (?, ?);`
    con.query(saveSql, [req.body.taskname, req.body.taskstatus], (err, result) => {
      if (err) {
        console.error("Error saving data:", err);
        res.status(500).send("Error saving data");
      } else {
        console.log("Data saved successfully");
        res.status(200).send("Saved");
      }
    });
})


// Update Route
app.put("/", (req, res) => {
    console.log("Req:", req.body);
    const { id } = req.body;
    console.log(id);
    // sql query um taskstatus upzudaten
    const updatesql = `
    UPDATE tasks 
    SET taskstatus = CASE 
      WHEN taskstatus = 'open' THEN 'in progress' 
      WHEN taskstatus = 'in progress' THEN 'finished' 
      ELSE taskstatus 
    END 
    WHERE id = ?;`
    con.query(updatesql, [id], (err, result) => {
      if (err) {
        console.error("Error updating task status:", err);
        res.status(500).send("Error updating task status");
      } else {
        console.log("Task status updated successfully");
        res.status(200).send("Task status updated");
      }
    });
});

// delete route
app.delete('/', (req, res) => {
  const { id } = req.body;
  const deleteSql = 'DELETE FROM tasks WHERE id = ?;';
  con.query(deleteSql, [id], (err, result) => {
    if (err) {
        console.error("Error deleting task:", err);
        res.status(500).send("Error deleting task");
    } else {
        console.log("Task deleted successfully");
        res.status(200).send("Deleted");
    }
});
});

app.listen(port, () => {
    console.log(`ToDo App started on Port ${port}`);
    //or console.log("ToDo App started on Port" + ${port});
})
