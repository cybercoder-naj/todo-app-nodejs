const express = require('express');
const todoController = require('./controllers/todoController');

const app = express();

// Set up template engine
app.set('view engine', 'ejs');

// Static files
app.use(express.static('./public'));

// Fire controllers
todoController(app);

// Listening to port: 3000
app.listen(3000);
console.log('Listening to port 3000');