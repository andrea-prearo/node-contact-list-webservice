var User = require('../models/user');
var Contact = require('../models/contact');

// CRUD logic for contacts endpoint

var contacts = {

    // Get user id
    _getUserId: function(req) {
        // Check for user
    	  var user = req.decoded;
        var userId = user && user._doc && user._doc._id
        return userId
    }, 

    // GET contact list
    getAll: function(req, res, next) {
        var userId = contacts._getUserId(req) 
        if (!userId) {
            return res.status(500).json({
                success: false,
                message: 'Internal error.'
            });
        }

        // Retrieve user contacts
        User.findById(userId)
        .populate('contacts')
        .exec(
        function(err, user) {
            if (err) {
                next(err);
            } else {
                var items = user && user.contacts;
                if (!items) {
                    return res.status(500).json({
                        success: false,
                        message: 'Internal error.'
                    });
                } else {
                  res.json(items);
                }
            }
        });
    },

    // GET contact details
    getOne: function(req, res, next) {
        Contact.findById(req.params.id,
        function(err, item) {
            if (err) {
                next(err);
            } else {
                res.json(item);
            }
        });
    },

    // POST contact details
    create: function(req, res, next) {
        var userId = contacts._getUserId(req) 
        if (!userId) {
            return res.status(500).json({
                success: false,
                message: 'Internal error.'
            });
        }

        // Create and save new contact
        var newContact = new Contact({
            avatar: req.body.avatar,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            company: req.body.company,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            zipCode: req.body.zipCode
        });

        newContact.save(
        function(err) {
            if (err) {
                next(err);
            } else {
              // Update user
              User.findByIdAndUpdate(userId,
              { $push: { contacts: newContact } },
              { safe: true, upsert: true },
              function(err, user) {
                  if (err) {
                      next(err);
                  } else {
                    var items = user && user.contacts;
                    if (!items) {
                        return res.status(500).json({
                            success: false,
                            message: 'Internal error.'
                        });
                    } else {
                				// After the update, save to request for use in other routes
                				req.decoded = user;
                        return contacts.getAll(req, res, next);
                    }
                  }
              });
            }
        });
    },

    // PUT contact details
    update: function(req, res, next) {
        Contact.findById(req.params.id, 
        function(err, item) {
            if (err) {
                next(err);
            } else {
                item.avatar = req.body.avatar;
                item.firstName = req.body.firstName;
                item.lastName = req.body.lastName;
                item.company = req.body.company;
                item.phone = req.body.phone;
                item.email = req.body.email;
                item.address = req.body.address;
                item.city = req.body.city;
                item.state = req.body.state;
                item.country = req.body.country
                item.zipCode = req.body.zipCode;
                item.contacts = req.body.contacts;

                item.save(function(err) {
                    if (err) {
                        next(err);
                    } else {
                        res.json(item);
                    }
                });
            }
        });
    },

    // DELETE contact
    delete: function(req, res, next) {
        Contact.findByIdAndRemove(req.params.id,
        function(err, item) {
            if (err) {
                next(err);
            } else {
                res.json(item);
            }
        });
    }

}

module.exports = contacts;
