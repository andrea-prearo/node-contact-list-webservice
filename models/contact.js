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
    phone: [Number],
    email: [String],
    address: String,
    city: String,
    state: String,
    country: String,
    zipCode: Number
});

module.exports = mongoose.model('Contact', ContactSchema);