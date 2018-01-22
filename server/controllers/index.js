let express          = require('express'),
    passport         = require('passport'),
    jwt              = require('express-jwt'),
    multer           = require("multer"),
    authentication   = require("./authentication.js"),
    series           = require("./series.js"),
    chapter          = require("./chapters.js"),
    users            = require("./users.js"),
    router           = express.Router();

//Initiate Multer
let storage          = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'tmp/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });
let upload           = multer({ storage: storage });

//Versioning
router.use('/api/v1',router);

//Middleware
//-Token Check for Creating, Deleting, and Updating.
//-Read is Free!

//Authentication Block
router.post ('/register/'                   , authentication.register_user);
router.post ('/login/'                      , authentication.login_user);

//Series Block
router.get  ('/series/'                     , series.get_list_of_series);
router.get  ('/series/:id'                  , series.get_series_by_id);

router.post ('/chapter/create/byForm'       , upload.array("images"), chapter.upload_by_form);
router.post ('/chapter/create/byZip'        , upload.array("zip"),    chapter.upload_by_zip);

router.get  ('/user/:id'                    , users.get_users_info_by_id);

router.get  ('/scanlators/'                 , authentication.login_user);
router.get  ('/scanlators/:id'              , authentication.login_user);


module.exports = router;