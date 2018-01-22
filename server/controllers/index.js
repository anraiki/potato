let express          = require('express'),
    passport         = require('passport'),
    jwt              = require('express-jwt'),
    authentication   = require("./authentication.js"),
    series           = require("./series.js"),
    users            = require("./users.js"),
    router           = express.Router();

//Versioning
router.use('/api/v1',router);
    
//Middleware
//-Token Check for Creating, Deleting, and Updating.
//-Read is Free!

//Authentication Block
router.post ('/register/'           , authentication.register_user);
router.post ('/login/'              , authentication.login_user);

//Series Block
router.get  ('/series/'             , series.get_list_of_series);
router.get  ('/series/:id'          , series.get_series_by_id);

router.get  ('/user/:id'            , users.get_users_info_by_id);

router.get  ('/scanlators/'         , authentication.login_user);
router.get  ('/scanlators/:id'      , authentication.login_user);

module.exports = router;