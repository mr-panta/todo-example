const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const config = require('./config.js');
const user = require('./user.js');
const todo = require('./todo.js');

const app = express();
const conn = mysql.createConnection({
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
});

app.use((req, res, next) => {
    req.dbConn = conn;
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// Example API
app.post('/example', (req, res) => {
    const data = {
        body: req.body,
        query: req.query,
    }
    res.send(data);
});

// User API
app.post('/login', user.login);

// Todo API
app.post('/addtodo', todo.addTodo);

// Edit todo
app.post('/edittodo', todo.editTodo);

// Done todo
app.post('/donetodo', todo.doneTodo);

// Undo todo
app.post('/undotodo', todo.undoTodo);

// Delete todo
app.post('/deletetodo', todo.deleteTodo);

// Get todo
app.get('/gettodo', todo.getTodo);

app.listen(config.port, () => {
    console.log(`Example app listening at http://localhost:${config.port}`);
})
