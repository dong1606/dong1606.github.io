const { showLoginFormController,
    adminLoginController
} = require('../controllers/admin_login.controller')

const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');

const route = express.Router();

route.get("/login",  showLoginFormController)

route.post('/login', adminLoginController)




module.exports = route;