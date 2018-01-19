'use strict';
module.exports = (sequelize, DataTypes) => {
  var series = sequelize.define('series', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return series;
};