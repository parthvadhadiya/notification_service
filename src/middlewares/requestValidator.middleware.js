const { messages } = require('../constants');
module.exports = (schema) => {
  return (req, res, next) => {
    const params = req.body;

    const valid = schema.validate(params);


    if (valid.error) {
      return res.status(400).send({ message: messages.INVALID_REQUEST_PARAMS, error: valid.error });
    }
    req.validatedParams = valid.value;
    console.log(valid);

    next();
  };
};
