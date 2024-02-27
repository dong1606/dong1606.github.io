
const {errorPageController } = require('../controllers/admin_admin.controller')
const express = require('express');
const route = express.Router();

route.get("", errorPageController)

module.exports = route;