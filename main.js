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
    con.query("INSERT INTO tasks (taskname, taskstatus) VALUES (?, ?);", [req.body.taskname, req.body.taskstatus], function (err, result) {
        if (err) throw err;
        console.log("Saved");
        console.log(result);
        res.status(200).send("Saved");
      });
})

// List Route
app.post("/list", (req, res) => {
    console.log("Req:", req.body);
    // sql query um alles aus dem table tasks aufzurufen
    con.query("SELECT * FROM tasks;", function (err, result) {
        if (err) throw err;
        console.log("Loaded List.");
        console.log(result);
        // sql Ergebnis in json umwandeln
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify?retiredLocale=de
        var jsonobj = JSON.stringify(result);
        res.status(200).send(jsonobj);
      });
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

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("SELECT * FROM tasks", function (err, result) {
      if (err) throw err;
      console.log("Database created");
      console.log(result);
    });
  });