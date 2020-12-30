const {
  CreateShareRecord,
  getUnAuthorizeShareRecord,
  AuthorizeShareRecord,
  getSharePrice,
  CreateOrUpdateSharePrice,
  getShareStmt,
  getTopShares,
  consolidateShares,
} = require("../repository/shares");

const createSharesRecordController = async (req, res) => {
  await CreateShareRecord(req, res);
};

const getUnAuthorizeSharesRecordController = async (req, res) => {
  await getUnAuthorizeShareRecord(req, res);
};

const AuthorizeSharesRecordController = async (req, res) => {
  await AuthorizeShareRecord(req, res);
};

const getSharesPriceController = async (req, res) => {
  await getSharePrice(req, res);
};

const createSharesPriceController = async (req, res) => {
  await CreateOrUpdateSharePrice(req, res);
};
const getSharesStmtController = async (req, res) => {
  await getShareStmt(req, res);
};
const getTopSharesController = async (req, res) => {
  await getTopShares(req, res);
};
const getConsolidateSharesController = async (req, res) => {
  await consolidateShares(req, res);
};

module.exports = {
  createSharesRecordController,
  getUnAuthorizeSharesRecordController,
  AuthorizeSharesRecordController,
  getSharesPriceController,
  createSharesPriceController,
  getSharesStmtController,
  getTopSharesController,
  getConsolidateSharesController,
};
