const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
// }).catch();

// Todo.findOneAndRemove

Todo.findByIdAndRemove('5a13804da5ddaa4b827c2675').then((todo) => {
    console.log(todo);
});