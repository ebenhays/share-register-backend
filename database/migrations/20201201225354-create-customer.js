"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Customers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      customerNo: {
        type: Sequelize.STRING,
        unique: true,
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      primaryPhone: {
        type: Sequelize.STRING,
      },
      secondaryPhone: {
        type: Sequelize.STRING,
      },
      emailAddress: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      authorizedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      authorizedBy: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      isAuthorized: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      createdBy: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Customers");
  },
};
