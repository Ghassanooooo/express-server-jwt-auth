const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/Users');

router.post('/register', (req, res) => {
  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      return res.status(400).json({errors: 'username already exists'});
    } else { 
      const newUser = new User({
        username: req.body.username,
        name:{
          firstname:req.body.firstname,
          lastname:req.body.lastname
        },
        password: req.body.password,
      })
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user =>{
              res.json(user)
            } )
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ username}).then(user => {
    if (!user) {
     return res.status(404).json({errors:'User not found'});
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, username: user.username };  
        jwt.sign(
          payload,
          'ghassanhhdhuhfijifuhushjjjlsoel',
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        return res.status(400).json({errors: 'Password incorrect'});
      }
    });
  });
});


module.exports = router;

