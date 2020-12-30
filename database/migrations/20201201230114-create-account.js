"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Accounts", {
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
      accountNumber: {
        type: Sequelize.STRING,
        unique: true,
      },
      isAuthorized: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      authorizedBy: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      authorizedDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      createdBy: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Accounts");
  },
};
