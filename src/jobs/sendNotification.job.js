const mongoose = require('mongoose');
const debug = require('debug')('app:expireOtp');
const { sendNotification } = require('../helpers/notification.helper');

const { models, enums } = require('../constants/index');

const User = mongoose.model(models.USER);

module.exports.sendNotification = async ({} = {}) => {
  return new Promise(async (resolve) => {
    const message = 'this is daily notification';
    try {
      const query = { isDeleted: false };

      const count = await User.countDocuments(query);
      if (count > 0) {
        console.log(`Sending notification to ${count} user.`);
        const user = await User.find(query);
        for (const obj of user) {
          const notificationTypes = [];
          if (obj.isEmailSubscribed) {
            notificationTypes.push(enums.NOTIFICATION_TYPES.EMAIL);
          }
          if (obj.isSMSSubscribed) {
            notificationTypes.push(enums.NOTIFICATION_TYPES.SMS);
          }
          if (obj.isWhatsAppSubscribed) {
            notificationTypes.push(enums.NOTIFICATION_TYPES.WHATSAPP);
          }
          if (obj.isSlackSubscribed) {
            notificationTypes.push(enums.NOTIFICATION_TYPES.SLACK);
          }
          console.log(notificationTypes);
          sendNotification({ data: { message, source: enums.NOTIFICATION_SOURCE.CRON_JON }, to: [obj._id], notificationTypes });
        }
      }
    } catch (e) {
      console.log(e);
      debug(e);
    }

    return resolve();
  });
};
