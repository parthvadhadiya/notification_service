const Joi = require('@hapi/joi');
const { enums } = require('../constants/index');
const messages = require('../constants/messages');


module.exports.sendNotification = Joi.object({
  userIds: Joi.array().items(Joi.string().required().trim().error(new Error(messages.INVALID_USER)) ),
  message: Joi.string().required().trim().error(new Error(messages.INVALID_MESSAGE)),
  notificationTypes: Joi.array().items(Joi.string()
    .required()
    .valid(...Object.values(enums.NOTIFICATION_TYPES))
    .error(new Error(messages.INVALID_NOTIFICATION_TYPE))),
});

