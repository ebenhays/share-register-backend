const Chance = require("chance");
const moment = require("moment");
const {
  AccountBalance,
  AccountStatement,
} = require("../database/models/index");
const chance = new Chance();

const generateCustomerNumber = async () => {
  const custNumber = await chance.string({
    length: 8,
    casing: "upper",
    alpha: true,
    numeric: true,
  });
  return custNumber;
};

const generateAccountNumber = async () => {
  const custNumber = await chance.string({
    length: 10,
    casing: "upper",
    alpha: false,
    numeric: true,
  });
  return custNumber;
};

const getLastAccountBalance = async (accountNumber) => {
  const findLastBal = await AccountBalance.findAll({
    where: { accountNumber },
  });
  return findLastBal[0].totalCredit - findLastBal[0].totalDebit;
};

const recordAccountStatement = async (data) => {
  const { shareNo, accountNumber, debit, credit, narration } = data;
  await AccountStatement.create({
    shareNo,
    accountNumber,
    debit: debit || 0,
    credit: credit || 0,
    narration,
    postingDate: moment().format("YYYY-MM-DD"),
  });
};

module.exports = {
  generateCustomerNumber,
  generateAccountNumber,
  getLastAccountBalance,
  recordAccountStatement,
};
