const { getDetailCustomerService,
    customerRegisterService } = require('../services/customer_login.services');
const {
    checkCartService,
    addCartService } = require('../services/customer_cart.services');
const { getListPaymentService } = require('../services/admin_payment.services');

const bcrypt = require('bcrypt');
require('dotenv');

const showLoginFormController = async (req, res, next) => {
    if(req.session.loggedin)
    {
        // req.session.loggedin=undefined;
    }
    res.render('customer_login')
}

const customerLoginController = async (req, res) => {

    const { userName, password } = req.body;

    if (userName, password) {
        const user = await getDetailCustomerService(userName);
        if (user.length < 1) {
            const errorMessage = 'Tài khoản không tồn tại';
            res.redirect(`/error?message=${encodeURIComponent(errorMessage)}`);
        } else {
            const idCustomer = user[0].id;
            const cart = await checkCartService(idCustomer);
            if (cart.length < 1) {
                await addCartService(idCustomer)
            }
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result == true) {
                    // Đăng nhập thành công
                    req.session.loggedin = true;
                    req.session.userName = userName;
                    req.session.idCustomer= idCustomer;
                    res.redirect('/')
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

const customerRegisterController = async (req, res) => {

    var { userName, password, fullName, phone, address, idPayment ,email} = req.body;

    if (userName && password && fullName && phone && address && idPayment) {
        const user = await getDetailCustomerService(userName);
        if (user.length>0) {
            const errorMessage = 'Tài khoản đã tồn tại';
            return res.redirect(`/error?message=${encodeURIComponent(errorMessage)}`);
        }
        password = bcrypt.hashSync(password, parseInt(process.env.BCRYPT_SALT_ROUND));
        await customerRegisterService({ userName, password, fullName, phone, address, idPayment,email });
        res.redirect(`/register`);
    }
}

const customerLoggoutController = async (req, res) => {

    req.session.destroy((err) => {
        if (err) res.redirect('/500');
        res.redirect('/')
    })
};

module.exports = {
    showLoginFormController,
    customerLoginController,
    showRegisterFormController,
    customerRegisterController,
    customerLoggoutController
}