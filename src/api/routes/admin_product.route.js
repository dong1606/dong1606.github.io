
const { getListProductController,
    addProductController,
    editProductController,
    updateProductController,
    deleteProductController,
    errorPageController,
    showFormCreateProduct,
    productActiveStatusController,
     } = require('../controllers/admin_product.controller')
const authMiddleware = require('../middleware/authMiddleware');


const express = require('express');

const middlewareUpload = require('../middleware/uploadImage');

const route = express.Router();

route.get("/error", errorPageController) // error

route.get('/list',authMiddleware.loggedinAdmin, getListProductController) // show client getList

route.get('/add',authMiddleware.loggedinAdmin, showFormCreateProduct ) // show client create

route.get('/edit/:id',authMiddleware.loggedinAdmin, editProductController) // show client update

route.post('/add',authMiddleware.loggedinAdmin, middlewareUpload.single('image'), addProductController) // api create

route.post('/update/:id',authMiddleware.loggedinAdmin, middlewareUpload.single('thumbnail'), updateProductController) // api update

route.get('/delete/:id',authMiddleware.loggedinAdmin, deleteProductController) // api delete

route.post('/active/:id',authMiddleware.loggedinAdmin, productActiveStatusController) // api delete




module.exports = route;