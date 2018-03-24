const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy
    , passportLocalMongoose = require('passport-local-mongoose');
const app = express();


mongoose.connect("mongodb://localhost:27017/person");
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(require('express-session')({ 
    secret: 'Just a test secret',
    saveUninitialized: true,
    resave: true
}));


app.use(passport.initialize());
app.use(passport.session());
const User = require('../models/users');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/', function(req, res, next) {
  res.render('success');
});

router.get('/success', function(req, res, next) {
  res.render('success');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signup', function(req, res, next) {
    const username = req.body.username; 
    const password = req.body.password;
    User.register(new User({username:username}), password, function(err, user) {
        if (err) { 
            console.log(err)
            return res.render('signup');
        }
        passport.authenticate('local')(req, res, function() {              
            res.redirect('/success')
        });
    });
});



router.post('/login',function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { console.log(err);return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/success');
    });
  })(req, res, next);
});

module.exports = router;
