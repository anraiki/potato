let express          = require('express'),
    passport         = require('passport'),
    jwt              = require('express-jwt'),
    authentication   = require("./authentication.js"),
    router           = express.Router();

router.post ('/api/register/'           , authentication.register_user);
router.post ('/api/login/'              , authentication.login_user);

module.exports = router;