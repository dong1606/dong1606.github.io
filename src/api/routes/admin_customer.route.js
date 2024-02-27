
const { getListCustomerController,
    addCustomerController,
    deleteCustomerController,
    errorPageController, 
    showFormCreateCustomer} = require('../controllers/admin_customer.controller')
const express = require('express');
const route = express.Router();

route.get("/error", errorPageController)
route.get('/list', getListCustomerController)
route.get('/showCreate', showFormCreateCustomer)
route.post('/create', addCustomerController)
route.post('/delete/:id', deleteCustomerController)


module.exports = route;