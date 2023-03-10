const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  // Get token from headers
  const token = req.headers.authorization;

  if (!token)
    return res
      .status(401)
      .send({ error: true, message: "You must be logged In.", data: null });

  jwt.verify(token, process.env.JWT_KEY, (err, data) => {
    try {
      if (err) {
        return res.status(401).send({
          error: true,
          message: "You session has been expired.",
          data: null,
        });
      }

      req.dataDecode = data;

      next();
    } catch (error) {
      res.status(500).send({
        isError: true,
        message: error.message,
        data: null,
      });
    }
  });
};

module.exports = verifyToken;
