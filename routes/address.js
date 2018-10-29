const express = require('express');
const router = express.Router();
const passport = require('passport');
const Address = require('../models/Address');

router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {  
    User.findOne({ _id: req.user.id }).then(user=>{
        if(user){
            Address.findOne({user:req.user.id}).then(data=>{
                if(!data){
                    const newAddress = {
                        user:user.id,
                        
                         street: req.body.street,
                         zip: req.body.zip,
                         city: req.body.city,
                      country : req.body.country
                      }
                      new  Address(newAddress).save().then( Address=>res.json( Address))
                }else{res.json({msg:'the  Address alredy exist!'})}
            })
        }
    })
     
    }
  );

module.exports = router;
