"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Shares", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      shareNo: {
        type: Sequelize.STRING,
      },
      accountNumber: {
        type: Sequelize.STRING,
      },
      shareQty: {
        type: Sequelize.DECIMAL(10, 2),
      },
      sharePrice: {
        type: Sequelize.DECIMAL(10, 2),
      },
      isAuthorized: {
        type: Sequelize.BOOLEAN,
      },
      postingDate: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Shares");
  },
};
