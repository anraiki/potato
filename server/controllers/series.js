let models          = require("~/models"),
    _               = require("lodash"),
    validator       = require("validator");

exports.get_list_of_series = async (req, res) => {

    let series_db = models.series;
    let results = await series_db.findAll({limit: 10, raw: true});
    let response =  results.map(result => _.omit(result,["createdAt","updatedAt"]));

    return res.status(200).json(response);
};

exports.get_series_by_id = async (req, res) => {

    if(validator.isInt(req.params.id)){
        let series_db = models.series;
        let result = await series_db.findOne({where: { id: req.params.id }, raw: true});
        let response = _.omit(result,["createdAt","updatedAt"]);
        return res.status(200).json(response);
    } else {
        return res.status(400).json({message: "Invalid Request"});
    }

};

exports.update_series_by_id = async (req, res) => {


};

