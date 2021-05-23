const mongoose = require('mongoose');
const debug = require('debug')('app:notification.helper');

const { models, enums } = require('../constants/index');
const { sendSMS } = require('./sms.helper');
const { sendEmail } = require('./email.helper');
const { sendWhatsApp } = require('./whatsApp.helper');
const NotificationLog = mongoose.model(models.NOTIFICATION_LOG);
const User = mongoose.model(models.USER);

module.exports.sendNotification = ({ data, to, notificationTypes }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { message, source } = data;

      for (const userTo of to) {
        console.log(userTo);
        const user = await User.findOne({ _id: userTo });
        console.log(user);
        if (!user) {
          continue;
        }
        for (const typesNotify of notificationTypes) {
          const notificationLog = await NotificationLog.create({
            to: user._id,
            source: source,
            message,
            notificationType: typesNotify,
          });
          switch (typesNotify) {
            case enums.NOTIFICATION_TYPES.EMAIL:
              if (user.isEmailSubscribed) {
                try {
                  const response = await sendEmail({ to: user.email, message });
                  debug('success');
                  notificationLog.status = enums.NOTIFICATION_STATUS.DELIVERED;
                  notificationLog.response = response;
                  await notificationLog.save();
                } catch (e) {
                  debug('error');
                  debug(e);
                  notificationLog.status = enums.NOTIFICATION_STATUS.FAILED;
                  notificationLog.response = e;
                  await notificationLog.save();
                }
              } else {
                notificationLog.status =
                  enums.NOTIFICATION_STATUS.NOT_SUBSCRIBED;

                await notificationLog.save();
              }
              break;
            case enums.NOTIFICATION_TYPES.SMS:
              if (user.isSMSSubscribed) {
                try {
                  const response = await sendSMS({
                    to: user.telephone,
                    message,
                  });
                  debug('success');
                  notificationLog.status = enums.NOTIFICATION_STATUS.DELIVERED;
                  notificationLog.response = response;
                  await notificationLog.save();
                } catch (e) {
                  debug('error');
                  debug(e);
                  notificationLog.status = enums.NOTIFICATION_STATUS.FAILED;
                  notificationLog.response = e;
                  await notificationLog.save();
                }
              } else {
                notificationLog.status =
                  enums.NOTIFICATION_STATUS.NOT_SUBSCRIBED;

                await notificationLog.save();
              }
              break;
            case enums.NOTIFICATION_TYPES.WHATSAPP:
              if (user.isWhatsAppSubscribed) {
                try {
                  const response = await sendWhatsApp({
                    to: user.whatsAppNumber,
                    message,
                  });
                  debug('success');
                  notificationLog.status = enums.NOTIFICATION_STATUS.DELIVERED;
                  notificationLog.response = response;
                  await notificationLog.save();
                } catch (e) {
                  debug('error');
                  debug(e);
                  notificationLog.status = enums.NOTIFICATION_STATUS.FAILED;
                  notificationLog.response = e;
                  await notificationLog.save();
                }
              } else {
                notificationLog.status =
                  enums.NOTIFICATION_STATUS.NOT_SUBSCRIBED;

                await notificationLog.save();
              }
              break;
            case enums.NOTIFICATION_TYPES.SLACK:
              if (user.isSlackSubscribed) {
                try {
                  const response = await sendSMS({
                    to: user.slackId,
                    message,
                  });
                  debug('success');
                  notificationLog.status = enums.NOTIFICATION_STATUS.DELIVERED;
                  notificationLog.response = response;
                  await notificationLog.save();
                } catch (e) {
                  debug('error');
                  debug(e);
                  notificationLog.status = enums.NOTIFICATION_STATUS.FAILED;
                  notificationLog.response = e;
                  await notificationLog.save();
                }
              } else {
                notificationLog.status =
                  enums.NOTIFICATION_STATUS.NOT_SUBSCRIBED;

                await notificationLog.save();
              }
              break;
            default:
          }
        }
      }

      console.log('sent');
      return resolve();
    } catch (e) {
      return reject(e);
    }
  });
};
