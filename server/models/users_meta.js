'use strict';
module.exports = (sequelize, DataTypes) => {
  var users_meta = sequelize.define('users_meta', {
    user_id: DataTypes.INTEGER,
    meta_key: DataTypes.STRING,
    meta_value: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return users_meta;
};