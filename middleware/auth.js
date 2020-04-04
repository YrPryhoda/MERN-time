const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // get token from header
  const token = req.header('x-auth-token');

  // check if no token
  if (!token) {
    return res.status(401).json({ msg: "Token was not found" });
  } else {
    try {
      const decoded = jwt.verify(token, config.get('jwtsecret'));
      req.user = decoded.user; //get id of user
      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({msg: 'token is not valid'})
    }
  }
}; 