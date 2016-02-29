var Contact = require('../models/contact');

// CRUD logic for contacts endpoint

var contacts = {

    // GET contact list
    getAll: function(req, res, next) {
        Contact.find(
        function(err, contacts) {
            if (err) {
                next(err);
            } else {
                res.json(contacts);
            }
        });
    },

    // GET contact details
    getOne: function(req, res, next) {
        Contact.findById(req.params.id,
        function(err, contact) {
            if (err) {
                next(err);
            } else {
                res.json(contact);
            }
        });
    },

    // POST contact details
    create: function(req, res, next) {
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
                res.json(newContact);
            }
        });
    },

    // PUT contact details
    update: function(req, res, next) {
        Contact.findById(req.params.id, 
        function(err, contact) {
            if (err) {
                next(err);
            } else {
                contact.avatar = req.body.avatar;
                contact.firstName = req.body.firstName;
                contact.lastName = req.body.lastName;
                contact.company = req.body.company;
                contact.phone = req.body.phone;
                contact.email = req.body.email;
                contact.address = req.body.address;
                contact.city = req.body.city;
                contact.state = req.body.state;
                contact.country = req.body.country
                contact.zipCode = req.body.zipCode;

                contact.save(function(err) {
                    if (err) {
                        next(err);
                    } else {
                        res.json(contact);
                    }
                });
            }
        });
    },

    // DELETE contact
    delete: function(req, res, next) {
        Contact.findByIdAndRemove(req.params.id,
        function(err, contact) {
            if (err) {
                next(err);
            } else {
                res.json(contact);
            }
        });
    }

}

module.exports = contacts;
