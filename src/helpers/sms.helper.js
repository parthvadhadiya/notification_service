const debug = require('debug')('app:smsHelper');
// const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_FROM } = require('./../appConfig');
// const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

module.exports.sendSMS = async ({ to, message }) => {
  return new Promise((resolve, reject)=>{
    try {
      // const options = {
      //   body: message,
      //   from: `whatsapp:${TWILIO_WHATSAPP_FROM}`,
      //   to: `whatsapp:${to}`,
      // };
      // let result = await client.messages.create(options);
      resolve('result');
    } catch (e) {
      console.log(e);
      debug(e);
      reject(e);
    }
  });
};
