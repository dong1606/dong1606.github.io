const { getListCustomerService,
    addCustomerService,
    editCustomerService,
    deleteCustomerService } = require('../services/admin_customer.services');
const { getListPaymentService } = require('../services/admin_payment.services');

const getListCustomerController = async (req, res) => {
    const { isSuperAdmin } = req.session
    const customer = await getListCustomerService();
    res.render('admin_customer', {
        customer,isSuperAdmin
    });
}

const showFormCreateCustomer = async (req, res, next) => {
    const payment = await getListPaymentService();
    res.render('admin_addCustomer', { payment })
}

const addCustomerController = async (req, res, next) => {
    try {
    const { userName, password, fullName, phone, address,idPayment } = req.body;  
            await addCustomerService({userName, password, fullName, phone, address,idPayment});
            res.redirect('/admin/customer/list')
        } catch (error) {
            const errorMessage = 'Customer is already exist';
            res.redirect(`error?message=${encodeURIComponent(errorMessage)}`);
        }
}

const errorPageController = async (req, res) => {
    const message = req.query.message;
    res.render('error.ejs', { message });
}

const editCustomerController = async (req, res) => {
    const { id } = req.params;

    var customer = await editCustomerService(id);
    res.render('admin_editCustomer', { customer });
}

const deleteCustomerController = async (req, res) => {
    const { id } = req.params;
    await deleteCustomerService(id);
    res.redirect('/admin/customer/list')
};


module.exports = {
    getListCustomerController,
    addCustomerController,
    editCustomerController,
    deleteCustomerController,
    errorPageController,
    showFormCreateCustomer
}