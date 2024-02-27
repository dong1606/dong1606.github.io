const { getListCategoryService } = require('../services/customer_category.services');
const { getCartItemService,
    addCartItemService,
    checkCartService,
    addCartService,
    checkItemCartService,
    updateCartItemService,
    deleteCartItemService
} = require('../services/customer_cart.services');
const { getListPaymentService } = require('../services/payment.services');

const getCartItemController = async (req, res) => {
    const { userName } = req.session
    const category = await getListCategoryService();
    const { idCustomer } = req.session;
    const payment = await getListPaymentService();
    const cart = await getCartItemService(idCustomer);
    if (cart[0]) {

        req.session[`cart-${cart[0].idCart}`] = [{
            ...cart[0],
            cartPrice: cart[0].cartPrice,
            formatCartPrice: (cart[0].cartPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
            formatTotalPrice: (cart[0].productTotalPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
        }]

        return res.render('customer_cart', {
            cart: req.session[`cart-${cart[0].idCart}`], payment, category, userName
        });
    }
    return res.redirect("/")
}

const addCartItemController = async (req, res) => {
    const idProduct = req.params.id;
    const { price } = req.body;
    const { idCustomer } = req.session;
    if (!idCustomer) {
        return res.redirect('/login')
    }
    const CART = await checkCartService(idCustomer);
    const CART_ITEM = await checkItemCartService(idCustomer, idProduct)
    if (CART_ITEM.length < 1) {
        const idCart = CART[0].id
        await addCartItemService(price, idCart, idProduct, idCart);
        res.redirect('/cart')
    } else {
        res.redirect('/cart')
    }
}

const updateQuantityProductInCartController = async (req, res) => {
    const { idCustomer } = req.session;
    const { count } = req.body;
    const { idCart } = req.params // id cart
    const { idProduct } = req.params // id product
    const INDEX = Array.from(req.session[`cart-${idCart}`]).findIndex(c => c.idProduct == idProduct);
    req.session[`cart-${idCart}`][INDEX] = {
        ...req.session[`cart-${idCart}`][INDEX],
        count: parseInt(count),
        productTotalPrice: count * req.session[`cart-${idCart}`][INDEX].productPrice,
        cartPrice: req.session[`cart-${idCart}`][INDEX].cartPrice,
        formatCartPrice: (req.session[`cart-${idCart}`][INDEX].cartPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
        formatTotalPrice: (count * req.session[`cart-${idCart}`][INDEX].productPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
    };
    res.render('customer_cart', {
        cart: req.session[`cart-${idCart}`], payment: null, category: null, userName: null
    });
}

const updateCartItemController = async (req, res) => {
    const { idCustomer } = req.session;
    const { count } = req.body;
    const { id } = req.params
    const { idCart } = req.params // id cart
    const { idProduct } = req.params // id product
    req.session[`cart-${idCart}`]
    const CART = await getCartItemService(idCustomer)
    for (let i = 0; i < CART.length; i++) {
        var quantity = (CART[i].quantity - count);
        if (quantity >= 0) {
            await updateCartItemService(count, id);
        } else {
            var errorMessage = 'Số lượng sản phẩm không đủ';
            return res.redirect(`/error?message=${encodeURIComponent(errorMessage)}`);
        }
    }
    res.redirect('/cart')
}

const deleteCartItemController = async (req, res) => {
    const { id } = req.params;
    await deleteCartItemService(id);
    res.redirect('/cart');
};

module.exports = {
    getCartItemController,
    addCartItemController,
    deleteCartItemController,
    updateCartItemController,
    updateQuantityProductInCartController
}