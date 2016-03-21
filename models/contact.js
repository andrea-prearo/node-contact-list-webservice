var mongoose = require('mongoose');

// Contact schema
var ContactSchema = new mongoose.Schema({
  avatar: String,
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true        
  },
  company: String,
  phone: [{
    label: String,
    number: String
  }],
  email: [{
    label: String,
    address: String
  }],
  location: [{
    label: String,
    data: {
      address: String,
      city: String,
      state: String,
      country: String,
      zipCode: String
    }
  }]
});

module.exports = mongoose.model('Contact', ContactSchema);
