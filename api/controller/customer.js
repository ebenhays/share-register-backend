const {
  CreateCustomer,
  AuthorizeCustomer,
  UpdateCustomer,
  getUnAuthorizeCustomers,
  getCustomers,
  getCustomer,
  deleteCustomer,
} = require("../repository/customer");

const createCustomerController = async (req, res) => {
  await CreateCustomer(req, res);
};
const authorizeCustomerController = async (req, res) => {
  await AuthorizeCustomer(req, res);
};

const UpdateCustomerController = async (req, res) => {
  await UpdateCustomer(req, res);
};
const getUnAuthorizeCustomersController = async (req, res) => {
  await getUnAuthorizeCustomers(req, res);
};
const getCustomersController = async (req, res) => {
  await getCustomers(req, res);
};
const getCustomerController = async (req, res) => {
  await getCustomer(req, res);
};
const deleteCustomerController = async (req, res) => {
  await deleteCustomer(req, res);
};
module.exports = {
  createCustomerController,
  authorizeCustomerController,
  UpdateCustomerController,
  getUnAuthorizeCustomersController,
  getCustomersController,
  getCustomerController,
  deleteCustomerController,
};
