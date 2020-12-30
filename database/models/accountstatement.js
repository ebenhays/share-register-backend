"use strict";
module.exports = (sequelize, DataTypes) => {
  const AccountStatement = sequelize.define(
    "AccountStatement",
    {
      shareNo: DataTypes.STRING,
      accountNumber: DataTypes.STRING,
      debit: DataTypes.DECIMAL(10, 2),
      credit: DataTypes.DECIMAL(10, 2),
      narration: DataTypes.STRING,
      postingDate: DataTypes.DATE,
    },
    {}
  );
  AccountStatement.associate = function (models) {
    // associations can be defined here
  };
  return AccountStatement;
};
