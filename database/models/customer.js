"use strict";
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "Customer",
    {
      customerNo: {
        type: DataTypes.STRING,
      },
      fullName: DataTypes.STRING,
      primaryPhone: {
        type: DataTypes.STRING,
        validate: {
          len: [10, 10],
        },
      },
      secondaryPhone: DataTypes.STRING,
      authorizedBy: DataTypes.STRING,
      createdBy: DataTypes.STRING,
      authorizedAt: DataTypes.DATE,
      isAuthorized: DataTypes.BOOLEAN,
      emailAddress: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
      address: DataTypes.STRING,
    },
    {}
  );
  Customer.associate = function (models) {
    // associations can be defined here
  };
  return Customer;
};
