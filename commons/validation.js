const joi = require("joi");

const customerValidation = (req, res, next) => {
  const { body } = req;
  const customerSchema = joi.object().keys({
    fullName: joi.string().max(100).required(),
    primaryPhone: joi.string().min(10).max(10).required(),
    emailAddress: joi.string().email().required(),
    secondaryPhone: joi.string(),
    address: joi.string(),
  });
  const { error, value } = customerSchema.validate(body);
  if (error === null) {
    return next();
  } else {
    return res.status(400).json({
      message: "Invalid Request",
    });
  }
};
const accountValidation = (req, res, next) => {
  const { body } = req;
  const accountSchema = joi.object().keys({
    customerNo: joi.string().min(10).max(10).required(),
    createdBy: joi.string(),
  });
  const { error, value } = accountSchema.validate(body);
  if (error === null) {
    return next();
  } else {
    return res.status(400).json({
      message: "Invalid Request",
    });
  }
};

const shareValidation = (req, res, next) => {
  const { body } = req;
  const sharesSchema = joi.object().keys({
    accountNumber: joi.string().min(10).max(10).required(),
    shareQty: joi.number().required(),
    sharePrice: joi.number().required(),
  });
  const { error, value } = sharesSchema.validate(body);
  if (error === null) {
    return next();
  } else {
    return res.status(400).json({
      message: "Invalid Request",
    });
  }
};

const sharePriceValidation = (req, res, next) => {
  const { body } = req;
  const sharesPriceSchema = joi.object().keys({
    sharePrice: joi.number().required(),
  });
  const { error, value } = sharesPriceSchema.validate(body);
  if (error === null) {
    return next();
  } else {
    return res.status(400).json({
      message: "Invalid Request",
    });
  }
};

module.exports = {
  customerValidation,
  accountValidation,
  shareValidation,
  sharePriceValidation,
};
