"use strict";
module.exports = (sequelize, DataTypes) => {
  const SharePrice = sequelize.define(
    "SharePrice",
    {
      price: DataTypes.DECIMAL(10, 2),
    },
    {}
  );
  SharePrice.associate = function (models) {
    // associations can be defined here
  };
  return SharePrice;
};
