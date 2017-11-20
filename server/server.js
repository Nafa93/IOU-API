const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose.js');
const {Todo} = require('./models/todo.js');
const {User} = require('./models/user.js');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc)=>{
        res.status(201).send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos)=>{
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    var _id = req.params.id;

    if(!ObjectID.isValid(_id)){
        return res.status(400).send({errorMessage: 'This is an invalid ID'});
    }

    Todo.findById(_id).then((todo)=>{
        if(!todo){
            return res.status(404).send({errorMessage: 'Todo not found'});        
        }
        res.status(200).send({todo});
    }, (e) => {
        return res.status(400);
    });
});

app.listen(3000, () => {
    console.log('Started on port 3001');
});

module.exports = {app};