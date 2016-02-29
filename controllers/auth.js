var jwt = require('jsonwebtoken');
var User = require('../models/user');

var auth = {
    
    // Register new user
    signUp: function(req, res, next) {
        if (!req.body.email || !req.body.password) {
            res.json({
                success: false,
                message: 'Please enter email and password.'
            });
            return;
        }

        User.findOne({ email: req.body.email },
        function(err, user) {
            if (err) {
                next(err);
            } else {
                if (user) {
                    res.json({
                        success: false,
                        message: 'An user has already registered with this email.' 
                    });
                } else {
                    var newUser = new User({
                        email: req.body.email,
                        password: req.body.password
                    });

                    newUser.save(function(err) {
                        if (err) {
                            next(err);
                        } else {
                            auth.getToken(res, user);
                        }
                    });
                }
            }
        });    
    },

    // Authenticate the user and get a JSON Web Token to include in the header of future requests.
    login: function(req, res, next) {
        if (!req.body.email || !req.body.password) {
            res.json({
                success: false,
                message: 'Please enter email and password.'
            });
            return;
        }

        User.findOne({ email: req.body.email },
        function(err, user) {
            if (err) {
                next(err);
            } else {
                if (user) {
                    // Check if password matches
                    user.comparePassword(req.body.password, function(err, isMatch) {
                        if (isMatch && !err) {
                            // Return token if the password matched and no error was thrown
                            auth.getToken(res, user);
                        } else {
                            res.send({
                                success: false,
                                message: 'Authentication failed. Passwords did not match.'
                            });
                        }
                    });
                } else {
                    res.send({
                        success: false,
                        message: 'Authentication failed. User not found.'
                    });
                }
            }
        });
    },

    getToken: function (res, user) {
        var token = jwt.sign(user, process.env.PASSPORT_SECRET, {
            // Token expires in 24 hours
            expiresIn: 10080
        });
        res.json({
            success: true,
            token: 'JWT ' + token
        });
    },

    // Route middleware to authenticate request and check token
    validate: function(req, res, next) {
    	// Check for token
    	var token = req.body.token || req.params.token || req.headers['x-access-token'];
    	if (token) {
    		// Decode token, verify secret and check for expiration
    		jwt.verify(token, process.env.PASSPORT_SECRET,
        function(err, decoded) {			
    			if (err) {
    				return res.json({
                        success: false,
                        message: 'Failed to authenticate token.'
                    });		
    			} else {
    				// If everything is good, save to request for use in other routes
    				req.decoded = decoded;	
    				next();
    			}
    		});
    	} else {
    		return res.status(403).send({ 
    			success: false, 
    			message: 'No token provided.'
    		});
    	}
    }

}

module.exports = auth;
