const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb://localhost/todos');
mongoose.Promise = global.Promise;

// Create Schema
const todoSchema = new mongoose.Schema({
    item: {
        type: String,
        required: [true, 'Description of todo is required.']
    }
});

const Todo = mongoose.model('Todo', todoSchema);

const urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = app => {
    app.get('/todo', (req, res) => {
        Todo.find({}, (err, data) => {
            if (err)
                throw err;
            res.render('todo', {todos: data});
        });
    });

    app.post('/todo', urlencodedParser, (req, res) => {
        Todo.create(req.body)
            .then(data => res.send(data));
    });

    app.delete('/todo/:item', (req, res) => {
        Todo.find({item: req.params.item.replace(/\-/g, ' ')}).remove((err, data) => {
            if (err)
                throw err;
            res.json(data);
        })
    });
};