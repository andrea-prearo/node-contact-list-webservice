var User = require('../models/user');

// CRUD logic for users endpoint

var users = {

    // GET users list
    getAll: function(req, res, next) {
        User.find(
        function(err, users) {
            if (err) {
                next(err);
            } else {
                res.json(users);
            }
        });
    },

    // GET user details
    getOne: function(req, res, next) {
        User.findById(req.params.id,
        function(err, user) {
            if (err) {
                next(err);
            } else {
                res.json(user);
            }
        });
    },

    // POST contact details
    create: function(req, res, next) {
        var newUser = new User({
            email: req.body.email,
            password: req.body.password,
            isAdmin: req.body.isAdmin
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
        function(err, user) {
            if (err) {
                next(err);
            } else {
                user.email = req.body.email;
                user.password = req.body.password;
                user.isAdmin = req.body.isAdmin;

                user.save(function(err) {
                    if (err) {
                        next(err);
                    } else {
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
        function(err, user) {
            if (err) {
                next(err);
            } else {
                res.json(user);
            }
        });
    }
    
}

module.exports = users;
