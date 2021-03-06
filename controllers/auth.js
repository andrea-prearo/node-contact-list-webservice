var jwt = require('jsonwebtoken');
var User = require('../models/user');

var auth = {
    
    // Register new user
    signUp: function(req, res, next) {
        if (!req.body.email || !req.body.password) {
            return res.status(401).json({
                success: false,
                message: 'Please enter email and password.'
            });
        }

        User.findOne({ email: req.body.email },
        function(err, user) {
            if (err) {
                next(err);
            } else {
                // Check if user exists
                if (user) {
                    res.status(409).json({
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
                            auth.getToken(res, newUser);
                        }
                    });
                }
            }
        });    
    },

    // Authenticate the user and get a JSON Web Token to include in the header of future requests.
    logIn: function(req, res, next) {
        if (!req.body.email || !req.body.password) {
            return res.status(401).json({
                success: false,
                message: 'Please enter email and password.'
            });
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
                            res.status(401).json({
                                success: false,
                                message: 'Authentication failed. Unrecognized username or password.'
                            });
                        }
                    });
                } else {
                    res.status(401).json({
                        success: false,
                        message: 'Authentication failed. Unrecognized username or password.'
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
            token: token
        });
    },

    // Route middleware to authenticate request and check token
    validateUser: function(req, res, next) {
    	// Check for token
    	var token = req.body.token || req.params.token || req.headers['x-access-token'];
    	if (token) {
    		// Decode token, verify secret and check for expiration
    		jwt.verify(token, process.env.PASSPORT_SECRET,
        function(err, decoded) {
    			if (err) {
    				res.status(401).json({
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
    		res.status(401).send({ 
    			success: false, 
    			message: 'No token provided.'
    		});
    	}
    },

    // Route middleware to verify if user is admin
    validateAdmin: function(req, res, next) {
      var user = req.decoded && req.decoded._doc; 
      if (user && user.isAdmin) {
        next()
      } else {
        res.status(403).send({ 
          success: false, 
          message: 'Unauthorized.'
        });
      }
    }
}

module.exports = auth;
