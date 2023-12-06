var mysql = require('mysql');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    console.log("Req:", req);
    res.send("Hello World");
})

app.post("/hello", (req, res) => {
    console.log("Req:", req.body);
    res.status(200).send(req.body);
})

 // Save Route
app.post("/save", (req, res) => {
    console.log("Req:", req.body);
    // sql query um Daten zu speichern
    var saveSql = `INSERT INTO tasks (taskname, taskstatus) VALUES (?, ?);`
    con.query(saveSql, [req.body.taskname, req.body.taskstatus], (err, result) => {
        res.status(200).send("Saved");
      });
})

// List Route
app.post("/list", (req, res) => {
    console.log("Req:", req.body);
    // sql query um alles aus dem table tasks aufzurufen
    con.query("SELECT * FROM tasks;", (err, result) => {
        // sql Ergebnis in json umwandeln
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify?retiredLocale=de
        var jsonobj = JSON.stringify(result);
        res.status(200).send(jsonobj);
      });
    });

// Update Route
app.post("/update", (req, res) => {
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
        res.status(200).send("taskstatus updated");
      });
    });

// delete route
app.post('/delete', (req, res) => {
  const { id } = req.body;
  const deleteSql = 'DELETE FROM tasks WHERE id = ?';
  con.query(deleteSql, [id])
  res.status(200).send("Deleted");
});

app.listen(port, () => {
    console.log(`ToDo App started on Port ${port}`);
    //or console.log("ToDo App started on Port" + ${port});
})

var con = mysql.createConnection({
    host: "localhost",
    user: "ToDoUser",
    password: "bmns",
    database: "todoexpress"
  });

// Connection zu mysql
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });