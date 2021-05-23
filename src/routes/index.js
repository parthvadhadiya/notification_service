const { Router } = require('express');
const router = new Router();

const controller = require('./../controllers/notification.controller');
const validator = require('./../validators/notification.validator');
const requestValidator = require('../middlewares/requestValidator.middleware');

router.get('/', async (req, res) => {
  return res.send({
    name: 'API',
    status: 'IT_WORKS',
    message: 'Yes, this is the correct basePath!',
  });
});

router.post('/notification', requestValidator(validator.sendNotification), controller.sendNotification);

module.exports = router;
