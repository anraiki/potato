let express     = require('express');
    http        = require('http'),
    url         = require('url'),
    bodyParser  = require("body-parser"),
    passport    = require("passport")
    jwt         = require("jsonwebtoken"),
    env         = require('dotenv').load(),
    bearerToken = require('express-bearer-token'),
    Validator   = require('validator'),
    _           = require('lodash');

//Initiate Express
let app         = express(),
    port        = process.env.PORT || 5000;

//CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Bearer Token
app.use(bearerToken());
app.use((req, res, next) => {res.locals.token = req.token; next(); });

//Body Parser for Express
app.use(bodyParser.urlencoded({ extended: false }))

//Models
var models = require("./models");

models.sequelize
  .authenticate()
  .then(async ()=> {
      console.log("Sequelize Authenticated");
      models.sequelize.sync();
  });

//For Passport
app.use(passport.initialize());
app.use(passport.session());

//Passport Strategies
require('./controllers/passport.js')(passport, models);

//Routes
var routes = require('./controllers/');
app.use("/", routes);

//Read Together App?
app.listen(port, () => console.log(`Listening on port ${port}`));