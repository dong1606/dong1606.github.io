
const { getListOrderController,
    deleteOrderController,
    activeOrderController, 
    cancelOrderController,
    detailOrderController} = require('../controllers/admin_order.controller')
const express = require('express');
const route = express.Router();

route.get('/list', getListOrderController)

route.get('/detailOrder/:id',detailOrderController)

route.get('/active/:id', activeOrderController)

route.get('/cancel/:id', cancelOrderController)

// route.post('/create', addCustomerController)

route.post('/delete', deleteOrderController)


module.exports = route;