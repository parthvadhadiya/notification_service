
const { messages, enums } = require('../constants');
const { sendNotification } = require('../helpers/notification.helper');

module.exports.sendNotification = async (req, res) => {
  try {
    const { userIds, message, notificationTypes } = req.validatedParams;

    sendNotification({ data: { message, source: enums.NOTIFICATION_SOURCE.ADMIN_API }, to: userIds, notificationTypes });
    return res.send({ message: messages.NOTIFICATION_SENT });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: messages.INTERNAL_SERVER_ERROR });
  }
};
