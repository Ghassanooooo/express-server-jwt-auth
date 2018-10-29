const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/Users');
const Contact = require('../models/Contact');

router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      
    User.findOne({ _id: req.user.id }).then(user=>{
        if(user){
            Contact.findOne({user:req.user.id}).then(data=>{
                if(!data){
                    const newContact = {
                        user:user.id,
                        name:user.name,
                        email: req.body.email.split(',') ,
                        birthday: req.body.birthday,
                        phonenumber: req.body.phonenumber.split(',')
                      }
                      new Contact(newContact).save().then(contact=>res.json(contact))
                }else{res.json({msg:'the contact alredy exist!'})}
            })
        }
    }) 
    }
  );

module.exports = router;

