const { getDetailAdminService
} = require('../services/admin_login.services');

const bcrypt = require('bcrypt');
require('dotenv');

const showLoginFormController = async (req, res, next) => {
    if(req.session.loggedinAdmin)
    {
        req.session.loggedinAdmin=undefined;
    }
    res.render('admin_login')
}

const adminLoginController = async (req, res) => {

    const { userName, password } = req.body;

    if (userName, password) {
        const user = await getDetailAdminService(userName);
        if (user.length < 1) {
            const errorMessage = 'Tài khoản không tồn tại';
            res.redirect(`/error?message=${encodeURIComponent(errorMessage)}`);
        } else {
            const isSuperAdmin = user[0].isSuperAdmin;
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result == true) {
                    // Đăng nhập thành công
                    req.session.loggedinAdmin = true;
                    req.session.isSuperAdmin = isSuperAdmin;
                    res.redirect('/admin/product/list')
                } else {
                    const errorMessage = 'Mật khẩu không chính xác';
                    res.redirect(`/error?message=${encodeURIComponent(errorMessage)}`);
                }
            })
        }
    } else {
        const errorMessage = 'Hãy nhập đầy đủ thông tin';
        // res.redirect(`/error?message=${encodeURIComponent(errorMessage)}`);
    }
}

const showRegisterFormController = async (req, res, next) => {

    const payment = await getListPaymentService();

    res.render('customer_register', { payment })
}

const adminRegisterController = async (req, res) => {

    var { userName, password, fullName, phone, address, idPayment, email } = req.body;

    if (userName && password && fullName && phone && address && idPayment) {
        const user = await getDetailCustomerService(userName);
        if (user) {
            const errorMessage = 'Tài khoản đã tồn tại';
            res.redirect(`/error?message=${encodeURIComponent(errorMessage)}`);
        }
        password = bcrypt.hashSync(password, parseInt(process.env.BCRYPT_SALT_ROUND));
        await customerRegisterService({ userName, password, fullName, phone, address, idPayment,email });
        const showMessage = 'Đăng kí thành công';
        res.redirect(`/error?message=${encodeURIComponent(showMessage)}`);
    }
}

module.exports = {
    showLoginFormController,
    adminLoginController,
    showRegisterFormController,
    adminRegisterController
}
