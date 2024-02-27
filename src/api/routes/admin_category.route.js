
const { getListCategoryController,
    addCategoryController,
    editCategoryController,
    updateCategoryController,
    deleteCategoryController,
    errorPageController,
    showFormCreateCategory,
    categoryActiveStatusController
} = require('../controllers/admin_category.controller')

const express = require('express');

const middlewareUpload = require('../middleware/uploadImage');

const route = express.Router();

route.get("/error", errorPageController) // error

route.get('/list', getListCategoryController) // show client getList

route.get('/add',  showFormCreateCategory)  // show client create

route.get('/edit/:id', editCategoryController) // show client update

route.post('/add', middlewareUpload.single('image'), addCategoryController) // api create

route.post('/update/:id', middlewareUpload.single('thumbnail'), updateCategoryController) // api update

route.post('/delete/:id', deleteCategoryController) // api delete

route.post('/active/:id', categoryActiveStatusController) // api delete




module.exports = route;