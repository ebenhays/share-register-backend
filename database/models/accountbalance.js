"use strict";
module.exports = (sequelize, DataTypes) => {
  const AccountBalance = sequelize.define(
    "AccountBalance",
    {
      accountNumber: DataTypes.STRING,
      totalDebit: DataTypes.DECIMAL(10, 2),
      totalCredit: DataTypes.DECIMAL(10, 2),
      totalBalance: {
        type: DataTypes.VIRTUAL,
        get() {
          return (
            this.getDataValue("totalCredit") - this.getDataValue("totalDebit")
          );
        },
      },
    },
    {}
  );
  AccountBalance.associate = function (models) {
    // associations can be defined here
  };
  return AccountBalance;
};
