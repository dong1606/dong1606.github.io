
const { showLoginFormController,
    customerLoginController,
    showRegisterFormController,
    customerRegisterController,
    customerLoggoutController
     } = require('../controllers/customer_login.controller')

const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');

const route = express.Router();

route.get("/login", authMiddleware.isAuth, showLoginFormController)

route.post('/login', customerLoginController)

route.get('/register', authMiddleware.isAuth, showRegisterFormController)

route.post('/register', customerRegisterController)

route.get('/logout', authMiddleware.loggedin, customerLoggoutController )



module.exports = route;