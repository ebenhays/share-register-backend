const {
  Account,
  Shares,
  Customer,
  AccountBalance,
  AccountStatement,
} = require("../database/models");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const moment = require("moment");
const numeral = require("numeral");

const fetchCustomersWithAccount = async () => {
  const findCust = await Account.findAll({
    where: {
      isAuthorized: true,
    },
    include: [
      {
        model: Customer,
        key: "customerNo",
        order: [["fullName", "ASC"]],
        attributes: ["fullName", "primaryPhone"],
      },
      {
        model: AccountBalance,
        key: "accountNumber",
      },
    ],
    // raw: true,
  });
  return findCust;
};
const fetchCustomersWithAccountByAccountNumber = async (accountNumber) => {
  const findCust = await Account.findAll({
    where: {
      isAuthorized: true,
      accountNumber,
    },
    attributes: ["accountNumber", "customerNo"],
    include: [
      {
        model: Customer,
        key: "customerNo",
        order: [["fullName", "ASC"]],
        attributes: ["fullName"],
      },
    ],
    raw: true,
  });
  return findCust;
};

const fetchUnauthorizedAccount = async () => {
  const findCust = await Account.findAll({
    where: {
      isAuthorized: false,
    },
    include: [
      {
        model: Customer,
        key: "customerNo",
        attributes: ["fullName", "primaryPhone"],
        order: [["fullName", "ASC"]],
        where: {
          isAuthorized: true,
        },
      },
    ],
  });
  return findCust;
};

const fetchSharesWithAccounts = async (accountNo) => {
  const findCust = await Shares.findAll({
    where: {
      accountNumber: accountNo,
      isAuthorized: true,
    },
    raw: true,
  });
  return findCust;
};

const fetchSharesWithAccountsBalBF = async (accountNo, startDate) => {
  const findCust = await Shares.findAll({
    where: {
      [Op.and]: [{ accountNumber: accountNo }, { isAuthorized: true }],
      postingDate: {
        [Op.lt]: moment(startDate).format("YYYY-MM-DD"),
      },
    },
    attributes: [[Sequelize.fn("SUM", Sequelize.col("shareQty")), "balBF"]],
    raw: true,
  });
  return findCust;
};

const consolidateSharesWithAccounts = async (startDate, endDate) => {
  const findCust = await Shares.findAll({
    where: {
      isAuthorized: true,
      postingDate: {
        [Op.between]: [
          moment(startDate).format("YYYY-MM-DD"),
          moment(endDate).format("YYYY-MM-DD"),
        ],
      },
    },
    attributes: [
      "shareNo",
      "accountNumber",
      "shareQty",
      "sharePrice",
      "postingDate",
    ],
    raw: true,
  });
  return findCust;
};

const fetchStatements = async (accountNo, startDate, endDate) => {
  const findCust = await AccountStatement.findAll({
    where: {
      accountNumber: accountNo,
      postingDate: {
        [Op.between]: [
          moment(startDate).format("YYYY-MM-DD"),
          moment(endDate).format("YYYY-MM-DD"),
        ],
      },
    },
    order: [["postingDate", "ASC"]],
    attributes: [
      "shareNo",
      "accountNumber",
      "debit",
      "credit",
      "narration",
      "postingDate",
    ],
    raw: true,
  });
  return findCust;
};

const getSharePrice = async (shareNo, accountNo) => {
  const getPrice = await Shares.findOne({
    where: {
      accountNumber: accountNo,
      shareNo,
    },
    raw: true,
    attributes: ["sharePrice"],
  });
  return getPrice.sharePrice;
};
const runAccountStatements = async (startDate, endDate, accountNumber) => {
  //first get all customers with account
  const records = await fetchCustomersWithAccountByAccountNumber(accountNumber);
  const openingBal = await fetchSharesWithAccountsBalBF(
    accountNumber,
    startDate
  );
  const bf = +openingBal[0].balBF || 0;
  let totalBalance = bf;
  let totalValue = 0;

  //get statement records

  const stmtRecords = await fetchStatements(accountNumber, startDate, endDate);
  const stmt = [];
  const data = {};
  const details = [
    {
      fullName: records[0]["Customer.fullName"],
      customerNo: records[0].customerNo,
      accountNumber: records[0].accountNumber,
      openingBal: numeral(bf).format("0,0.00"),
    },
  ];

  if (stmtRecords) {
    await Promise.all(
      stmtRecords.map(async (el) => {
        const price = await getSharePrice(el.shareNo, el.accountNumber);
        totalBalance += +el.credit - +el.debit;
        totalValue += +el.credit / +price;
        data.postingDate = moment(el.postingDate).format("YYYY-MM-DD");
        data.shareNo = el.shareNo;
        data.narration = el.narration;
        data.credit = numeral(el.credit).format("0,0.00");
        data.debit = numeral(el.debit).format("0,0.00");
        data.sharePrice = price;
        data.shareValue = numeral(el.credit / +price).format("0,0.00");
        data.totalSharesValue = numeral(totalValue).format("0,0.00");
        data.total = numeral(totalBalance).format("0,0.00");
        stmt.push({ ...data });
      })
    );

    return [stmt, details];
  }
  return null;
};

const fetchTopHigherShares = async (topN) => {
  const findCust = await Account.findAll({
    where: {
      isAuthorized: true,
    },
    attributes: ["customerNo", "accountNumber"],
    include: [
      {
        model: Customer,
        key: "customerNo",
        order: [["fullName", "ASC"]],
        attributes: ["fullName"],
      },
      {
        model: AccountBalance,
        key: "accountNumber",
        order: [["totalCredit", "DESC"]],
        attributes: ["totalCredit"],
      },
    ],
    limit: Number(topN),
    raw: true,
  });
  return findCust;
};

module.exports = {
  fetchCustomersWithAccount,
  fetchUnauthorizedAccount,
  fetchSharesWithAccounts,
  fetchSharesWithAccountsBalBF,
  fetchCustomersWithAccountByAccountNumber,
  runAccountStatements,
  fetchStatements,
  fetchTopHigherShares,
  consolidateSharesWithAccounts,
};
