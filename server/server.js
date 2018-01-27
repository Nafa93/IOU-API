require('./config/config.js')

const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')
const { ObjectID } = require('mongodb')
var { mongoose } = require('./db/mongoose.js') // eslint-disable-line

var { Todo } = require('./models/todo.js')
var { Spending } = require('./models/spending.js')
var { User } = require('./models/user.js')
var { authenticate } = require('./middleware/authenticate')

var app = express()
const port = process.env.PORT

app.use(bodyParser.json())

app.post('/todos', authenticate, (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  })

  todo.save().then((doc) => {
    res.status(201).send(doc)
  }, (e) => {
    res.status(400).send(e)
  })
})

app.post('/spendings', authenticate, (req, res) => {
  var spending = new Spending({
    text: req.body.text,
    _creator: req.user._id
  })

  todo.save().then((doc) => {
    res.status(201).send(doc)
  }, (e) => {
    res.status(400).send(e)
  })
})

app.get('/todos', authenticate, (req, res) => {
  Todo.find({ _creator: req.user._id }).then((todos) => {
    res.send({ todos })
  }, (e) => {
    res.status(400).send(e)
  })
})

app.get('/todos/:id', authenticate, (req, res) => {
  var _id = req.params.id

  if (!ObjectID.isValid(_id)) {
    return res.status(400).send({ errorMessage: 'This is an invalid ID' })
  }

  Todo.findOne({ _id, _creator: req.user._id }).then((todo) => {
    if (!todo) {
      return res.status(404).send({ errorMessage: 'Todo not found' })
    }
    res.status(200).send({ todo })
  }).catch((e) => res.status(400).send())
})

app.delete('/todos/:id', authenticate, (req, res) => {
  var _id = req.params.id

  if (!ObjectID.isValid(_id)) {
    return res.status(400).send({ errorMessage: 'This is an invalid ID' })
  }

  Todo.findOneAndRemove({ _id, _creator: req.user._id }).then((todo) => {
    if (!todo) {
      return res.status(404).send({ errorMessage: 'Todo not found' })
    }
    res.status(200).send({ todo })
  }).catch((e) => res.status(400).send())
})

app.patch('/todos/:id', authenticate, (req, res) => {
  var _id = req.params.id
  var body = _.pick(req.body, ['text', 'completed'])

  if (!ObjectID.isValid(_id)) {
    return res.status(400).send({ errorMessage: 'This is an invalid ID' })
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime()
  } else {
    body.completed = false
    body.completedAt = null
  }

  Todo.findOneAndUpdate({ _id, _creator: req.user._id }, { $set: body }, { new: true }).then((todo) => {
    if (!todo) {
      return res.status(404).send()
    }

    res.send({ todo })
  }).catch((e) => res.status(400).send())
})

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password', 'name', 'lastName'])

  var user = new User(body)

  user.save().then(() => {
    return user.generateAuthToken()
  }).then((token) => {
    res.header('x-auth', token).status(201).send(user)
  }).catch((e) => res.status(400).send(e))
})

app.get('/users/me', authenticate, (req, res) => {
  var token = req.header('x-auth')

  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject(new Error('User not found'))
    }

    res.send(user)
  }).catch((e) => res.status(401).send({}))
})

app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password'])

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).status(200).send(user)
    })
  }).catch((e) => {
    res.status(400).send(`${e}`)
  })
})

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send({})
  }).catch((e) => {
    res.status(400).send({ e })
  })
})

app.listen(port, () => {
  if (port) {
    console.log(`Started up at port ${port}`)
  } else {
    console.log('The application started')
  }
})

module.exports = { app }
