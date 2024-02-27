
const { getListAdminController,
    addAdminController,
    editAdminController,
    updateAdminController,
    deleteAdminController,
    errorPageController, 
    updateActiveStatusController} = require('../controllers/admin_admin.controller')
const authMiddleware = require('../middleware/authMiddleware');

const express = require('express');
const route = express.Router();

route.get("/error", errorPageController)
route.get('/list', authMiddleware.loggedinAdmin, getListAdminController)
route.get('/showCreate', authMiddleware.loggedinAdmin, (req, res) => {
    res.render('admin_addAdmin')
})
route.post('/create', authMiddleware.loggedinAdmin, addAdminController)
route.get('/edit/:id', authMiddleware.loggedinAdmin, editAdminController)
route.post('/update/:id', authMiddleware.loggedinAdmin, updateAdminController)
route.post('/active/:id', authMiddleware.loggedinAdmin, updateActiveStatusController)
route.post('/delete/:id', authMiddleware.loggedinAdmin, deleteAdminController)


module.exports = route;