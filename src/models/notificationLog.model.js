const { Schema, model, Model } = require('mongoose');
const { models, enums } = require('../constants/index');

const schema = new Schema(
  {
    to: { type: Schema.Types.ObjectId, ref: models.USER },
    source: {
      type: String,
      enum: Object.values(enums.NOTIFICATION_SOURCE),
      default: enums.NOTIFICATION_SOURCE.CRON_JON,
    },
    notificationType: {
      type: String,
      enum: Object.values(enums.NOTIFICATION_TYPES),
      default: enums.NOTIFICATION_TYPES.MISCELLANEOUS,
    },
    status: {
      type: String,
      enum: Object.values(enums.NOTIFICATION_STATUS),
      default: enums.NOTIFICATION_STATUS.WAITING_FOR_DELIVERY,
    },
    message: { type: String, default: '' },
    __v: { type: Number, select: false },
  },
  { timestamps: true, strict: false },
);

class NotificationLog extends Model {}

schema.loadClass(NotificationLog);

module.exports = model(
  models.NOTIFICATION_LOG,
  schema,
  models.NOTIFICATION_LOG,
);
