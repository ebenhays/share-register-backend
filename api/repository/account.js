const { generateAccountNumber } = require("../../commons/formatters");
const numeral = require("numeral");
const moment = require("moment");
const { Account, AccountBalance } = require("../../database/models/index");

const {
  fetchCustomersWithAccount,
  fetchUnauthorizedAccount,
  fetchSharesWithAccounts,
  fetchTopHigherShares,
} = require("../../commons/Queries");

const CreateAccount = async (req, res) => {
  try {
    const { customerNo, createdBy } = req.body;
    const record = await Account.create(
      {
        customerNo,
        accountNumber: await generateAccountNumber(),
        isAuthorized: false,
        createdBy: createdBy || "",
        status: true,
      },
      { attributes: ["accountNumber"] }
    );
    res
      .status(200)
      .json({ message: "Account Created Successfully", result: record });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occured" });
  }
};
const AuthorizeAccount = async (req, res) => {
  try {
    const id = req.params.authid;
    const findAcct = await Account.findOne({
      where: {
        id,
        isAuthorized: false,
      },
      attributes: ["id", "isAuthorized", "accountNumber"],
    });
    if (findAcct) {
      //update the record
      await Account.update(
        {
          isAuthorized: true,
          authorizedDate: moment(),
        },
        {
          where: {
            id,
          },
        }
      );
      //create the account balance record
      await AccountBalance.create({
        accountNumber: findAcct.accountNumber,
        totalDebit: 0.0,
        totalCredit: 0.0,
      });
      res.status(200).json({ message: "Record Authorized Successfully" });
    } else {
      res.status(404).json({ message: "No Record Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occured" });
  }
};

const getUnAuthorizeAccount = async (req, res) => {
  try {
    const findCust = await fetchUnauthorizedAccount();
    if (findCust) {
      res.status(200).json({
        result: findCust.map((el) => {
          return {
            id: el.id,
            customerNo: el.customerNo,
            fullName: el.Customer.fullName,
            accountNumber: el.accountNumber,
            createdBy: el.createdBy,
            createdAt: moment(el.createdAt).format("YYYY-MM-DD HH:mm:ss"),
          };
        }),
      });
    } else {
      res.status(404).json([]);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occured" });
  }
};
const getAccounts = async (req, res) => {
  try {
    const findCust = await fetchCustomersWithAccount();
    // const f = await fetchTopHigherShares(5);
    // console.log(f);
    if (findCust) {
      res.status(200).json({
        result: findCust.map((el) => {
          return {
            id: el.id,
            customerNo: el.customerNo,
            fullName: el.Customer.fullName,
            primaryPhone: el.Customer.primaryPhone,
            accountNumber: el.accountNumber,
            totalBalance:
              numeral(el.AccountBalance.totalCredit).format("0,0.00") ||
              0 -
                (numeral(el.AccountBalance.totalDebit).format("0,0.00") || 0.0),

            createdBy: el.createdBy,
            createdAt: moment(el.createdAt).format("YYYY-MM-DD HH:mm:ss"),
          };
        }),
      });
    } else {
      res.status(404).json([]);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occured" });
  }
};
const getAccountWithShares = async (req, res) => {
  try {
    const accountNo = req.params.acctno;
    const findCust = await fetchSharesWithAccounts(accountNo);
    if (findCust) {
      res.status(200).json({ result: findCust });
    } else {
      res.status(404).json([]);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occured" });
  }
};

module.exports = {
  CreateAccount,
  AuthorizeAccount,
  getAccounts,
  getUnAuthorizeAccount,
  getAccountWithShares,
};
