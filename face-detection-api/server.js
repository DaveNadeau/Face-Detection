const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(bodyParser.json()); //must be used in order to deal with POSTs from front end
app.use(cors());    //didn't get same error as in tutorial but I added this npm package anyway

app.get('/', (req, res) => {
  res.send(database.users); //will show in postman
})

//temp variable to fill in for actual database
const database = {
  users: [
    {
      id: '123',
      name: 'John',
      password: 'cookies',
      email: 'john@gmail.com',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Sally',
      password: 'bananas',
      email: 'Sally@gmail.com',
      entries: 0,
      joined: new Date()
    }
  ],
  login: [
    {
      id: '987',
      hash: '',
      email: 'john@gmail.com'
    }
  ]
}

    ////SIGN IN CHECK////
app.post('/signin', (req, res) => {
  //res.send('signing in'); //send = html,
  //res.json('signing in');//but json is preferred, more common

      ////EXAMPLE OF COMPARING PASSWORDS (HARDCODED, NOT ACTUAL PRODUCTION CODE)////
  // bcrypt.compare("apples", '$2a$10$qJ9yQRtdxpVE5uMfpKC48urIJuI3nxYRzMHCmkXJNQArDtpZudSMG', function(err, res) {
  //   console.log('first guess', res);
  // });
  // bcrypt.compare("veggies", '$2a$10$qJ9yQRtdxpVE5uMfpKC48urIJuI3nxYRzMHCmkXJNQArDtpZudSMG', function(err, res) {
  //   console.log('second guess', res);
  // });

  if (req.body.email === database.users[0].email &&
      req.body.password === database.users[0].password) {
        res.json(database.users[0]);
        //res.json('successful match')  //referenced in SignIn.js code in onSubmitSignIn function
      }else {
        res.status(400).json('login is incorrect')
      }
})

    ////REGISTRATION////
app.post('/register', (req, res) => {

  const {email, name, password} = req.body;  //destructured (req.body.email, req.body.name, etc...)
  bcrypt.hash(password, null, null, function(err, hash) { //see bcrypt functions section below
      console.log(hash);
  });
  database.users.push({
    id: '125',
    name: name,
    email: email,
    // password: password,
    entries: 0,
    joined: new Date()
  })
  res.json(database.users[database.users.length-1]);  //must have a response
})

app.get('/profile/:id', (req, res) => {
  const {id} = req.params; //note the id is read from the params in postman
  let found = false;

  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400).json('not found');
  }
})

app.put('/image', (req, res) => {
  const {id} = req.body;  //note the id is read from the body section in postman
  let found = false;

  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(400).json('not found');
  }
})

    ////BCRYPT-NODEJS (DEPRECATED- NEED TO CHANGE TO BCRYPT.JS)////
// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//   // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//   // res = false
// });

    ////MESSAGE SHOWS IN POSTMAN FOR TESTING////
app.listen(4000, () => {
  console.log('app is currently running on port 3000'); //will show in console
})

    ////ENDPOINT PLAN////
// --> res = this is working
//signin --> POST = success/fail
//registration --> POST = user
//profile/:userId --> GET = userId
//image --> PUT --> user



      ////NOTES////

/*
- important to plan out how the APIs will look possibly with commnents?
- postman is used for testing, don't really need front end in first phase of this

*/
