"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("AccountStatements", {
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
      debit: {
        type: Sequelize.DECIMAL(10, 2),
      },
      credit: {
        type: Sequelize.DECIMAL(10, 2),
      },
      narration: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable("AccountStatements");
  },
};
