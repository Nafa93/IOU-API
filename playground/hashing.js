const bcrypt = require('bcryptjs')
// const {SHA256} = require('crypto-js')
// const jwt = require('jsonwebtoken')

var password = '123abc!'

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     });
// });

var hashedPassword = '$2a$10$Iy594ap9uJ1.zDF57pl9XekqoHac27k.qZa5Tu.iGnex9NjIzO73y'

// var data = {
//     id: 10
// }

// var token = jwt.sign(data, '123abc');

// console.log(token);

// var decoded = jwt.verify(token, '123abc');

// console.log(decoded);

// var message = 'I am user number 3';

// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);

// console.log(`Hash: ${hash}`);

// var data = {
//     id: 4
// }

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// token.data.id = 5;

// token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if(resultHash === token.hash){
//     console.log('data was not changed');
// } else {
//     console.log('data was changed')
// }

bcrypt.compare(password, hashedPassword, (err, res) => {
  if (err) {
    return console.log('Something happened', err)
  }
  console.log(res)
})
