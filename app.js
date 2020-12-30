const createError = require("http-errors");
const express = require("express");
const bodyParser = require("body-parser");
const { errors } = require("celebrate");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();
require("./database/models");
const indexRouter = require("./api/routes");
const winston = require("./commons/winston");

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(helmet());
app.use(morgan("combined", { stream: winston.stream }));

app.use("/api", indexRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(errors({ statusCode: 400 }));
app.use(function (err, req, res, next) {
  winston.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  );
  res.status(err.status || 500);
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server Started on port ", process.env.PORT);
});
module.exports = app;
