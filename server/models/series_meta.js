'use strict';
module.exports = (sequelize, DataTypes) => {
  var series_meta = sequelize.define('series_meta', {
    series_id: DataTypes.INTEGER,
    meta_key: DataTypes.STRING,
    meta_value: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return series_meta;
};