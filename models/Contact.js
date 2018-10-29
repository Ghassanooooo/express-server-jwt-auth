const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
  name: {
    firstname:{
        type: String,
        required: true
      },
      lastname:{
        type: String,
        required: true
      }
  },
  email: {
    type: [String],
    required: true
  },
 phonenumber: {
    type: [String],
    required: true
  },
  birthday: {
    type: Date,
    required: true
  }
});

module.exports = Contact = mongoose.model('contact', ContactSchema);
