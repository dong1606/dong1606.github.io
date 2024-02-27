const { getListAdminService,
    addAdminService,
    editAdminService,
    updateAdminService,
    deleteAdminService, 
    updateActiveStatusService} = require('../services/admin_admin.services');
const { adminRegisterService } = require('../services/admin_login.services');
const { getDetailCustomerService } = require('../services/customer_login.services');

const bcrypt = require('bcrypt');
require('dotenv');

const getListAdminController = async (req, res) => {
    const admin = await getListAdminService();
    res.render('admin_admin', {
        admin
    });
}

const addAdminController = async (req, res, next) => {
    var { userName, password, fullName, phone, address } = req.body;

    if (userName && password && fullName && phone && address) {
        const user = await getDetailCustomerService(userName);
        if (user.length>0) {
            const errorMessage = 'Tài khoản đã tồn tại';
            return res.redirect(`/error?message=${encodeURIComponent(errorMessage)}`);
        }
        password = bcrypt.hashSync(password, parseInt(process.env.BCRYPT_SALT_ROUND));
        await adminRegisterService({ userName, password, fullName, phone, address});
        return res.redirect('/admin/account/list')
    }
}

const errorPageController = async (req, res) => {
    const message = req.query.message;
    res.render('error.ejs', { message });
}

const editAdminController = async (req, res) => {
    const { id } = req.params;

    var admin = await editAdminService(id);
    res.render('admin_editAdmin', { admin });
}

const updateAdminController = async (req, res) => {
    const { id } = req.params;
    const { userName, password, fullName, phone, address } = req.body;

    //handles null error
    if (!id || !userName || !password || !fullName || !phone || !address) {
        const errorMessage = 'Vui lòng nhập đầy đủ thông tin';
        res.redirect(`error?message=${encodeURIComponent(errorMessage)}`);
    } else {
        await updateAdminService(id, userName, password, fullName, phone, address);
        res.redirect('/admin/account/list');
    }
}

const updateActiveStatusController = async (req, res) => {
    const { id } = req.params;
    await updateActiveStatusService(id);
    res.redirect('/admin/account/list')
};

const deleteAdminController = async (req, res) => {
    const { id } = req.params;
    await deleteAdminService(id);
    res.redirect('/admin/account/list')
};

module.exports = {
    getListAdminController,
    addAdminController,
    editAdminController,
    updateAdminController,
    deleteAdminController,
    errorPageController,updateActiveStatusController
}