const ErrorHandler = require("../utils/errorhandler");
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resource not found.Invalid:${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  //Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  } 
  //wrong JWT error  
  if (err.code === "JsonWebTokenError") 
  {
     const message = `Json Web Token is Invalid, Try again`;
     err = new ErrorHandler(message, 400);
  } 
  //JWT expire error  
  if (err.code === "JsonExpiredError")
   { 
    const message = `Json Web Token is Expired, Try again`;
     err = new ErrorHandler(message, 400);
    }
  res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
};
