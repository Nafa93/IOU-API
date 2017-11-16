const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDB Server.');
    }
    console.log('Connected to MongoDB Server');

    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result)=>{
    //     console.log(result);
    // });

    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result)=>{
    //     console.log(result);
    // });

    db.collection('Users').deleteMany({name: 'Andrew'}).then((result) => {
        console.log(result);
    });

    // db.collection('Users').find({name: 'Mike'}).toArray().then((doc) => {
    //     console.log('Finding doc...');

    //     console.log(`Doc found: ${doc[0]._id}`);

    //     var idFound = doc[0]._id;

    //     db.collection('Users').findOneAndDelete({_id: new ObjectID(idFound)});
    // }).then((result) => {
    //     console.log('Deleting doc...');

    //     console.log(result);

    //     console.log('Doc deleted');
    // });

});