
const { getListCartController,
    deleteCartController, 
    activeCartController} = require('../controllers/admin_cart.controller')
const express = require('express');
const route = express.Router();

route.get('/list', getListCartController)
// route.get('/showCreate', (req, res) => {
//     res.render('addCustomer')
// })
// route.post('/create', addCustomerController)
route.post('/delete/:id', deleteCartController)
route.post('/active/:id', activeCartController)


module.exports = route;