const express = require('express');
const mongoose = require('mongoose');

const passport = require('passport');
const path = require('path');

const users = require('./routes/users');
const keys = require('./config/keys');


const app = express();

// Body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



mongoose
  .connect(keys.mongodbURL,{ useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


app.use(passport.initialize());


require('./passport')(passport);


app.use('/users', users);



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
