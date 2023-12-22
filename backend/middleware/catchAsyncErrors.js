module.exports = (theFunc) => (req, res, next) => {
  //try catch function for async
  Promise.resolve(theFunc(req, res, next)).catch(next);
};
