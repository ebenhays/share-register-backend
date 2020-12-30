const express = require("express");
const { celebrate, Joi, errors, Segments } = require("celebrate");
const router = express.Router();
const {
  createCustomerController,
  authorizeCustomerController,
  UpdateCustomerController,
  getUnAuthorizeCustomersController,
  getCustomersController,
  deleteCustomerController,
} = require("../controller/customer");

const {
  createSharesController,
  getSharesAccountController,
  getUnAuthorizeSharesController,
  AuthorizeSharesAccountController,
  getAccountWithSharesController,
} = require("../controller/account");

const {
  createSharesRecordController,
  getUnAuthorizeSharesRecordController,
  AuthorizeSharesRecordController,
  getSharesPriceController,
  createSharesPriceController,
  getSharesStmtController,
  getTopSharesController,
  getConsolidateSharesController,
} = require("../controller/shares");

const {
  customerValidation,
  accountValidation,
  shareValidation,
  sharePriceValidation,
} = require("../../commons/validation");

router.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Share Register api" });
});

router.post(
  "/create-shares-account",
  accountValidation,
  createSharesController
);
router.get("/unauthorize-shares-account", getUnAuthorizeSharesController);
router.get("/shares-account", getSharesAccountController);
router.post("/shares-stmt", getSharesStmtController);
router.post("/top-shares", getTopSharesController);
router.post("/consolidate-shares", getConsolidateSharesController);

router.post("/create-customer", customerValidation, createCustomerController);
router.post("/update-customer", UpdateCustomerController);
router.get("/unauthorize", getUnAuthorizeCustomersController);
router.get("/customer-records", getCustomersController);

router.get("/unauthorize-shares-records", getUnAuthorizeSharesRecordController);
router.post(
  "/create-shares-record",
  shareValidation,
  createSharesRecordController
);
router.post(
  "/create-shares-price",
  sharePriceValidation,
  createSharesPriceController
);
router.get("/get-shares-price", getSharesPriceController);

router.post(
  "/authorize-customer/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  authorizeCustomerController
);
router.post(
  "/authorize-share-record/:shareId",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      shareId: Joi.number().required(),
    }),
  }),
  AuthorizeSharesRecordController
);
router.post(
  "/delete-record/:cid",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      cid: Joi.number().required(),
    }),
  }),
  deleteCustomerController
);
router.post(
  "/authorize-shares-account/:authid",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      authid: Joi.number().required(),
    }),
  }),
  AuthorizeSharesAccountController
);
router.get(
  "/account-with-shares/:acctno",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      acctno: Joi.number().required(),
    }),
  }),
  getAccountWithSharesController
);
module.exports = router;
