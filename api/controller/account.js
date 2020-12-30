const {
  CreateAccount,
  getAccounts,
  getUnAuthorizeAccount,
  AuthorizeAccount,
  getAccountWithShares,
} = require("../repository/account");

const createSharesController = async (req, res) => {
  await CreateAccount(req, res);
};

const getUnAuthorizeSharesController = async (req, res) => {
  await getUnAuthorizeAccount(req, res);
};

const getSharesAccountController = async (req, res) => {
  await getAccounts(req, res);
};

const getAccountWithSharesController = async (req, res) => {
  await getAccountWithShares(req, res);
};

const AuthorizeSharesAccountController = async (req, res) => {
  await AuthorizeAccount(req, res);
};
module.exports = {
  createSharesController,
  getUnAuthorizeSharesController,
  getSharesAccountController,
  AuthorizeSharesAccountController,
  getAccountWithSharesController,
};
