"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("ShareDividends", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      shareNo: {
        type: Sequelize.STRING,
      },
      amountShared: {
        type: Sequelize.DECIMAL(10, 2),
      },
      creditAmt: {
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
    return queryInterface.dropTable("ShareDividends");
  },
};
