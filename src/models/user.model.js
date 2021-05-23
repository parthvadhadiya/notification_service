const { Schema, model, Model } = require('mongoose');
const { models } = require('../constants/index');

const schema = new Schema(
  {
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    telephone: { type: String, default: '' },
    whatsAppNumber: { type: String, default: '' },
    slackId: { type: String, default: '' },
    // Add more connect details needed for other services
    isEmailSubscribed: { type: Boolean, default: true },
    isSMSSubscribed: { type: Boolean, default: true },
    isWhatsAppSubscribed: { type: Boolean, default: true },
    isSlackSubscribed: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

class User extends Model {}

schema.loadClass(User);

module.exports = model(models.USER, schema, models.USER);
