const { getDetailCustomerService } = require('../services/customer_login.services');
const bcrypt = require('bcrypt');
const { changePasswordService } = require('../services/customer_changePassword.services');
const { getListCategoryService } = require('../services/customer_category.services');
require('dotenv');

const showChangePasswordFormController = async (req, res, next) => {
    const { userName } = req.session
    const category = await getListCategoryService();
    res.render('customer_changePassword', { category, userName })
}

const changePasswordController = async (req, res) => {

    const { idCustomer, userName } = req.session;
    var { oldPass, newPass } = req.body;
    const user = await getDetailCustomerService(userName);
    bcrypt.compare(oldPass, user[0].password, (err, result) => {
        if (result != true) {
            const errorMessage = 'Mật khẩu cũ không chính xác';
            return res.redirect(`/error?message=${encodeURIComponent(errorMessage)}`);
        }
    })
    newPass = bcrypt.hashSync(newPass, parseInt(process.env.BCRYPT_SALT_ROUND));
    await changePasswordService(idCustomer, newPass);
    res.redirect('/')
}


module.exports = {
    showChangePasswordFormController,
    changePasswordController
}