const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB Server.')
  }
  console.log('Connected to MongoDB Server')

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5a0c934d72b6abb1cb565e7a')
  },
    {
      $set: {
        name: 'Ramón'
      }
    },
    {
      returnOriginal: false
    }).then((result) => {
      console.log(result)
    })
})
