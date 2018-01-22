let models          = require("~/models"),
    _               = require("lodash"),
    extract         = require("extract-zip"),
    validator       = require("validator");


exports.upload_by_zip = async (req, res) => {

    //Disct CBR and ZIP files
    let accepted_files = [
        "gif",
        "png",
        "svg",
        "jpg"
    ];
    return res.status(400).json({message: "Zip Requested"});
};

exports.upload_by_form = async (req, res) => {

    let accepted_files = [
        "gif",
        "png",
        "svg",
        "jpg"
    ];

    console.log(req.files);

    //Rename to Date - Chapter - Page - ID
    //Unlink Original Files

    return res.status(400).json({message: "Form Request"});

};

