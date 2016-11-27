var User = require('../models/user');

// CRUD logic for users endpoint

var users = {

    // GET users list
    getAll: function(req, res, next) {
        User.find(
        function(err, items) {
            if (err) {
                next(err);
            } else {
                res.json({users: items});
            }
        });
    },

    // GET user details
    getOne: function(req, res, next) {
        User.findById(req.params.id,
        function(err, item) {
            if (err) {
                next(err);
            } else {
                res.json({user: item});
            }
        });
    },

    // POST contact details
    create: function(req, res, next) {
        var newUser = new User({
            email: req.body.email,
            password: req.body.password
            // isAdmin: req.body.isAdmin
        });

        newUser.save(
        function(err) {
            if (err) {
                next(err);
            } else {
                res.json({
                    success: true,
                    message: 'New user successfully created: ' + req.body.email
                });
            }
        });
    },

    // PUT contact details
    update: function(req, res, next) {
        User.findById(req.params.id, 
        function(err, item) {
            if (err) {
                next(err);
            } else {
                item.email = req.body.email;
                item.password = req.body.password;
                item.contacts = req.body.contacts
                // item.isAdmin = req.body.isAdmin;

                item.save(function(err) {
                    if (err) {
                        next(err);
                    } else {
                        // After the update, save to request for use in other routes
                		req.decoded = item;
                        res.json({
                            success: true,
                            message: 'User successfully created: ' + req.body.email
                        });
                    }
                });
            }
        });
    },

    // DELETE user
    delete: function(req, res, next) {
        User.findByIdAndRemove(req.params.id,
        function(err, item) {
            if (err) {
                next(err);
            } else {
                res.json({user: item});
            }
        });
    }
    
}

module.exports = users;
