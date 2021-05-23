const path = require('path');

const projectRoot = path.join(__dirname, '..');

module.exports = {
  ENVIRONMENT: 'development',
  PROJECT_ROOT: projectRoot,
  PROJECT_NAME: 'NOTIFICATION_SERVICE',
  PORT: 8692,
  MONGODB_URL: 'mongodb://127.0.0.1:27017/notification_service',
  ENABLE_CRON: true,
  SENDGRID_API_KEY: '',
  NO_REPLY_EMAIL: '',
  CONTACT_US_EMAIL: '',
  ACTIVITY_REQ_EMAIL: '',
  API_URL: 'http://localhost:8692',
};
