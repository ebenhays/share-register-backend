"use strict";
module.exports = (sequelize, DataTypes) => {
  const ShareDividend = sequelize.define(
    "ShareDividend",
    {
      shareNo: DataTypes.STRING,
      amountShared: DataTypes.DECIMAL,
      creditAmt: DataTypes.DECIMAL,
      narration: DataTypes.STRING,
      postingDate: DataTypes.DATE,
    },
    {}
  );
  ShareDividend.associate = function (models) {
    // associations can be defined here
  };
  return ShareDividend;
};
