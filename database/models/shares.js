"use strict";
const numeral = require("numeral");
module.exports = (sequelize, DataTypes) => {
  const Shares = sequelize.define(
    "Shares",
    {
      shareNo: DataTypes.STRING,
      accountNumber: DataTypes.STRING,
      shareQty: DataTypes.DECIMAL(10, 2),
      sharePrice: DataTypes.DECIMAL(10, 2),
      isAuthorized: DataTypes.BOOLEAN,
      postingDate: DataTypes.DATE,
      total: {
        type: DataTypes.VIRTUAL,
        get() {
          return numeral(
            this.getDataValue("shareQty") / this.getDataValue("sharePrice")
          ).format("0,0.00");
        },
      },
    },
    {}
  );
  Shares.associate = function (models) {
    // associations can be defined here
    // Shares.belongsTo(models.Account, {
    //   foreignKey: { name: "accountNumber" },
    //   targetKey: "accountNumber",
    // });
  };
  return Shares;
};
