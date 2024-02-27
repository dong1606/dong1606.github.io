const express = require('express');
const { homeProductController } = require('../controllers/home.controller');
const { getFilterProductController } = require('../controllers/filterProduct.controller');
const { detailProductController } = require('../controllers/customer_detailProduct.controller');
const { getCartItemController,
    addCartItemController,
    deleteCartItemController,
    updateCartItemController, 
    updateQuantityProductInCartController
} = require('../controllers/customer_cart.controller');
const authMiddleware = require('../middleware/authMiddleware');
const { addOrderController, showOrderController, listOrderCustomerController, cancelOrderController, detailOrderCustomerController } = require('../controllers/customer_order.controller');
const { changePasswordController, showChangePasswordFormController } = require('../controllers/customer_changePassword.controller');


const route = express.Router();

route.get('/', homeProductController)

route.get('/filter-product', getFilterProductController)

route.get('/cart', authMiddleware.loggedin, getCartItemController)

route.post('/addItem/:id', addCartItemController)

route.get('/detailProduct/:id', detailProductController)

route.post('/updateItem/:idCart/:idProduct', updateQuantityProductInCartController)

route.get('/deleteItem/:id', deleteCartItemController) // api delete

route.get('/showOrder/:idCart', authMiddleware.loggedin, showOrderController)

route.post('/addOrder', addOrderController)

route.get('/cancel/:id', cancelOrderController)

route.get('/detailOrder/:id', detailOrderCustomerController)

route.get('/changePassword', showChangePasswordFormController)

route.post('/change', changePasswordController)

route.get('/listOrder',  listOrderCustomerController)

module.exports = route;