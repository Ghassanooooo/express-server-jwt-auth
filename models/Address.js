const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
  street: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
 city: {
    type: String,
    required: true
  },
  country : {
    type: String,
    required: true
  }
});

module.exports = Address = mongoose.model('address', AddressSchema);
