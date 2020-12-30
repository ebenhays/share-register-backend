const { generateCustomerNumber } = require("../../commons/formatters");
const moment = require("moment");
const { Customer } = require("../../database/models/index");

const CreateCustomer = async (req, res) => {
  try {
    const {
      fullName,
      primaryPhone,
      secondaryPhone,
      emailAddress,
      address,
      createdBy,
    } = req.body;
    await Customer.findOrCreate({
      where: {
        emailAddress: req.body.emailAddress,
      },
      attributes: ["emailAddress"],
      defaults: {
        customerNo: await generateCustomerNumber(),
        fullName,
        primaryPhone,
        secondaryPhone,
        emailAddress,
        address,
        isAuthorized: false,
        createdBy: createdBy || "",
      },
    });
    res.status(200).json({ message: "Record Created Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occured" });
  }
};
const AuthorizeCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const findCust = await Customer.findOne({
      where: {
        id,
        isAuthorized: false,
      },
      attributes: ["id", "isAuthorized"],
    });
    if (findCust) {
      //update the record
      await Customer.update(
        {
          isAuthorized: true,
          authorizedAt: moment(),
        },
        {
          where: {
            id: findCust.id,
          },
        }
      );
      res.status(200).json({ message: "Record Authorized Successfully" });
    } else {
      res.status(404).json({ message: "No Record Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occured" });
  }
};
const UpdateCustomer = async (req, res) => {
  try {
    const {
      fullName,
      primaryPhone,
      secondaryPhone,
      emailAddress,
      address,
      id,
    } = req.body;
    const findCust = await Customer.findOne({
      where: {
        customerNo: id,
      },
      attributes: ["id"],
    });
    if (findCust) {
      //update the record
      await Customer.update(
        {
          fullName,
          primaryPhone,
          secondaryPhone,
          emailAddress,
          address,
          isAuthorized: false,
        },
        {
          where: {
            id: findCust.id,
          },
        }
      );
      res.status(200).json({
        message: "Record Updated Successfully. Pending Authorization",
      });
    } else {
      res.status(404).json({ message: "No Record Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occured" });
  }
};

const getUnAuthorizeCustomers = async (req, res) => {
  try {
    const findCust = await Customer.findAll({
      where: {
        isAuthorized: false,
      },
    });
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
const getCustomers = async (req, res) => {
  try {
    const findCust = await Customer.findAll({
      where: {
        isAuthorized: true,
      },
      order: [["fullName", "ASC"]],
    });
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
const getCustomer = async (req, res) => {
  try {
    const id = req.params.cid;
    const findCust = await Customer.findOne({
      where: {
        isAuthorized: true,
        id,
      },
      order: [["fullName", "ASC"]],
    });
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

const deleteCustomer = async (req, res) => {
  try {
    const id = req.params.cid;
    const findCust = await Customer.findOne({
      where: {
        id,
      },
    });
    if (findCust) {
      await Customer.destroy({ where: { id } });
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
  CreateCustomer,
  AuthorizeCustomer,
  UpdateCustomer,
  getUnAuthorizeCustomers,
  getCustomers,
  getCustomer,
  deleteCustomer,
};
