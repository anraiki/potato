let bcrypt          = require('bcrypt'),
    jwt             = require('jsonwebtoken'),
    validator       = require('validator'),
    saltRounds      = 16;

module.exports = function(passport, models) {

    var User = models.users;
    var Op = models.Sequelize.Op
    var LocalStrategy = require('passport-local').Strategy;

    //Local Signup
    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        (req, email, password, done) => {
            var post = req.body;

            if(!validator.isEmail(post.email)) {
                return done({
                    message: "Invalid Email input",
                }, false);
            }

            if(!validator.isLength(post.password,{min: 8, max: undefined})) {
                return done({
                    message: "Password minimum length is 8 characters",
                }, false);
            }

            bcrypt.hash(post.password, saltRounds).then(function(hash) {
                User.findOne({
                    where: {
                        email: post.email
                    }
                }).then(function(user) {
                    if (user) {
                        return done({
                            message: 'An account exists with this email',
                        }, false );
                    } else {
                        var userPassword = hash;
                        var data =
                            {
                                email: post.email,
                                password: userPassword,
                            };

                        User.create(data).then(function(newUser, created) {
                            if (newUser) {
                                var token = jwt.sign({id: newUser.id, action: "verify"}, process.env.JWT_SECRET_KEY);
                                return done(null, newUser);
                            } else {
                                return done({
                                    message: "This account already exists",
                                }, false);
                            }
                        });
                    }
                });
            });
        }
    ));

    passport.use('local-signin', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {
            var data = req.body;
            User.findOne({
                where: {
                    email: data.email
                }
            }).then(function(user) {
                if (user) {
                    bcrypt.compare(data.password, user.password, function(err, res) {
                        if(res == true)
                            return done(null, user);
                        else
                            return done({
                                message: 'Incorrect Login or Password',
                            }, false);
                    });
                } else {
                    return done({
                        message: 'Incorrect Login or Password',
                    }, false);
                }
            });
        }
    ));


};