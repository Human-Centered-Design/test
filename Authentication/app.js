require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');


const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: 'Our little secret.',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/cafeuserDB');

const cafeuserSchema = new mongoose.Schema({
  email: String,
  password: String
});

cafeuserSchema.plugin(passportLocalMongoose);

const Cafeuser = new mongoose.model('Cafeuser', cafeuserSchema);

passport.use(Cafeuser.createStrategy());

passport.serializeUser(Cafeuser.serializeUser());
passport.deserializeUser(Cafeuser.deserializeUser());


app.get('/', (req, res) => {
  res.send('Home Page');
});

app.get('/register', (req, res) => {
  res.send('Register Page');
});

app.get('/login', (req, res) => {
  res.send('Login Page');
});

app.get('/success', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('Successfully Login In!');
  } else res.redirect('/login');
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.post('/register', (req, res) => {
  Cafeuser.register({ username: req.body.username}, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      res.redirect('/register');
    } else {
      passport.authenticate('local')(req, res, () => {
        res.redirect('/success');
      });
    }
  });
});

app.post('/login', (req, res) => {
  const user = new Cafeuser({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, err => {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate('local')(req, res, () => {
        res.redirect('/success');
      });
    }
  });
});


app.listen(3000, () => {
  console.log('Server started on port 3000');
});
