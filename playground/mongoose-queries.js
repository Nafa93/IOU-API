const { ObjectID } = require('mongodb')

// const { mongoose } = require('./../server/db/mongoose')
// const { Todo } = require('./../server/models/todo')
const { User } = require('./../server/models/user')

var _id = '61a120eabd996316249cb3240'

if (!ObjectID.isValid(_id)) {
  console.log('The id is not valid')
}

// Todo.find({_id}).then((todos) => {console.log('Todos', todos)})

// Todo.findOne({_id}).then((todo) => {console.log('Todo', todo)})

// Todo.findById(_id).then((todo) => {
//     if(!todo){
//         return console.log('Todo by id not found')
//     }
//     console.log('Todo by id', todo)
// }).catch((e) => console.log(e))

User.findById(_id).then((user) => {
  if (!user) {
    return console.log('User by id not found')
  }
  console.log('User by id', user)
}).catch((e) => console.log(e))
