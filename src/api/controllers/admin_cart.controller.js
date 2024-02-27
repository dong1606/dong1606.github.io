const { getListCartService,
    deleteCartService,
    activeCartService } = require('../services/admin_cart.services')

const getListCartController = async (req, res) => {
    const { isSuperAdmin } = req.session
    const cart = await getListCartService();
    res.render('admin_cart', {
        cart,isSuperAdmin
    });
}

const activeCartController = async (req, res) => {
    const { id } = req.params;
    await activeCartService(id);
    res.redirect('/admin/cart/list')
};

const deleteCartController = async (req, res) => {
    const { id } = req.params;
    await deleteCartService(id);
    res.redirect('/admin/cart/list')
};


module.exports = {
    getListCartController,
    deleteCartController,
    activeCartController
}