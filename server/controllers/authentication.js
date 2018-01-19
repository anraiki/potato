let validator       = require('validator'),
    passport        = require('passport'),
    bcrypt          = require('bcrypt'),
    models          = require("~/models"),
    jwt             = require("jsonwebtoken");
    'use strict';

exports.register_user = function(req, res) {
    
    passport.authenticate('local-signup', function(error, user, info) {
        if(user) {
            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY);
            return res.status(200).json({token: token});
        } else if(error) {
            return res.status(409).json(error);
        }
    })(req, res);
    
};

exports.login_user = function(req, res) {
    
    passport.authenticate('local-signin', function(error, user, info) {
        if(user) {
            var token = jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY);
            return res.status(200).json({token: token});
        } else if(error) {
            return res.status(409).json(error);
        }
    })(req, res);
    
};

exports.refresh_login = function(req, res) {
    
};
