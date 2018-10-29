const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const users = require('./routes/users');
const contact = require('./routes/contact');
const address = require('./routes/address');
const keys = require('./config/keys');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose
  .connect(keys.mongodbURL,{ useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(passport.initialize());
require('./passport')(passport);

app.use('/users', users);
app.use('/contact', contact);
app.use('/address', address);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
