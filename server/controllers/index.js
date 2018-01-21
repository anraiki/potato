let express          = require('express'),
    passport         = require('passport'),
    jwt              = require('express-jwt'),
    authentication   = require("./authentication.js"),
    series           = require("./series.js"),
    users            = require("./users.js"),
    router           = express.Router();

//Authentication Block
router.post ('/api/register/'           , authentication.register_user);
router.post ('/api/login/'              , authentication.login_user);

//Middleware
//-Token Check for Creating, Deleting, and Updating.
//-Read is Free!

//Series Block
router.get  ('/api/series/'             , series.get_list_of_series);
router.get  ('/api/series/:id'          , series.get_series_by_id);

router.get  ('/api/user/:id'            , users.get_users_info_by_id);

router.get  ('/api/scanlators/'         , authentication.login_user);
router.get  ('/api/scanlators/:id'      , authentication.login_user);

module.exports = router;