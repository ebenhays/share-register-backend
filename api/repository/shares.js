const numeral = require("numeral");
const {
  generateAccountNumber,
  getLastAccountBalance,
  recordAccountStatement,
} = require("../../commons/formatters");
const {
  runAccountStatements,
  fetchTopHigherShares,
  consolidateSharesWithAccounts,
  fetchCustomersWithAccountByAccountNumber,
} = require("../../commons/Queries");
const moment = require("moment");
const {
  Shares,
  AccountBalance,
  SharePrice,
} = require("../../database/models/index");

const CreateShareRecord = async (req, res) => {
  try {
    const { accountNumber, shareQty, sharePrice } = req.body;
    const record = await Shares.create({
      shareNo: "SN" + (await generateAccountNumber()),
      accountNumber,
      shareQty: +shareQty,
      sharePrice: +sharePrice,
      total: parseFloat(shareQty) * parseFloat(sharePrice),
      isAuthorized: false,
      postingDate: moment().format("YYYY-MM-DD"),
    });
    res
      .status(200)
      .json({ message: "Account Created Successfully", result: record });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occured" });
  }
};

const AuthorizeShareRecord = async (req, res) => {
  try {
    const id = req.params.shareId;
    const findShares = await Shares.findAll({
      where: {
        id,
        isAuthorized: false,
      },
    });
    if (findShares) {
      await Shares.update(
        {
          isAuthorized: true,
        },
        {
          where: {
            id,
          },
        }
      );

      await AccountBalance.update(
        {
          accountNumber: findShares[0].accountNumber,
          totalDebit: 0.0,
          totalCredit:
            (await getLastAccountBalance(findShares[0].accountNumber)) +
            +findShares[0].total,
        },
        {
          where: {
            accountNumber: findShares[0].accountNumber,
          },
        }
      );
      const data = {
        shareNo: findShares[0].shareNo,
        accountNumber: findShares[0].accountNumber,
        debit: 0,
        credit: +findShares[0].shareQty,
        narration: "SHARES PURCHASE - " + moment().format("YYYY-MM-DD"),
      };
      await recordAccountStatement(data);
    }
    res.status(200).json({ message: "Account Authorized Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occured" });
  }
};

const getUnAuthorizeShareRecord = async (req, res) => {
  try {
    const findShares = await Shares.findAll({
      where: {
        isAuthorized: false,
      },
    });
    res.status(200).json({ result: findShares });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occured" });
  }
};

const CreateOrUpdateSharePrice = async (req, res) => {
  try {
    const { sharePrice } = req.body;
    const findRecord = await SharePrice.findOne({ attributes: ["price"] });
    if (findRecord === null) {
      const record = await SharePrice.create({
        price: sharePrice,
      });
      res
        .status(200)
        .json({ message: "Share Price Created Successfully", result: record });
    } else {
      await SharePrice.update({ price: sharePrice }, { where: {} });
      res.status(200).json({ message: "Share Price Updated Successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occured" });
  }
};

const getSharePrice = async (req, res) => {
  try {
    const record = await SharePrice.findOne({ attributes: ["price"] });
    res.status(200).json({ result: record });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occured" });
  }
};

const getShareStmt = async (req, res) => {
  const { accountNumber, startDate, endDate } = req.body;
  try {
    const record = await runAccountStatements(
      startDate,
      endDate,
      accountNumber
    );
    //console.log(result);
    res.status(200).json({ result: record });
  } catch (error) {
    res.status(500).json({ message: "An error occured" });
  }
};

const getTopShares = async (req, res) => {
  try {
    const { topNo } = req.body;
    const record = await fetchTopHigherShares(topNo);
    res.status(200).json({
      result: record.map((el) => {
        return {
          customerNo: el.customerNo,
          accountNumber: el.accountNumber,
          fullName: el["Customer.fullName"],
          totalShares: numeral(el["AccountBalance.totalCredit"]).format(
            "0,0.00"
          ),
        };
      }),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occured" });
  }
};

const consolidateShares = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const record = await consolidateSharesWithAccounts(startDate, endDate);
    res.status(200).json({
      result: await Promise.all(
        record.map(async (el) => {
          const fname = await fetchCustomersWithAccountByAccountNumber(
            el.accountNumber
          );
          return {
            shareNo: el.shareNo,
            accountNumber: el.accountNumber,
            customerNo: fname[0]["Customer.customerNo"],
            shareQty: el.shareQty,
            sharePrice: el.sharePrice,
            postingDate: el.postingDate,
            fullName: fname[0]["Customer.fullName"],
            totalSharesValue: el.shareQty / el.sharePrice,
          };
        })
      ),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occured" });
  }
};

module.exports = {
  CreateShareRecord,
  AuthorizeShareRecord,
  getUnAuthorizeShareRecord,
  CreateOrUpdateSharePrice,
  getSharePrice,
  getShareStmt,
  getTopShares,
  consolidateShares,
};
