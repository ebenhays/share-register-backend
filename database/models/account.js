"use strict";
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define(
    "Account",
    {
      customerNo: DataTypes.STRING,
      accountNumber: DataTypes.STRING,
      createdBy: DataTypes.STRING,
      isAuthorized: DataTypes.BOOLEAN,
      authorizedBy: DataTypes.STRING,
      authorizedDate: DataTypes.DATE,
    },
    {}
  );
  Account.associate = function (models) {
    // associations can be defined here
    Account.belongsTo(models.Customer, {
      foreignKey: { name: "customerNo" },
      targetKey: "customerNo",
    });
    Account.belongsTo(models.AccountBalance, {
      foreignKey: { name: "accountNumber" },
      targetKey: "accountNumber",
    });
    // Account.belongsTo(models.Shares, {
    //   foreignKey: { name: "accountNumber" },
    //   targetKey: "accountNumber",
    // });
  };
  return Account;
};
