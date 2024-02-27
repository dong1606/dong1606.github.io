const { getListCategoryService } = require('../services/customer_category.services');
const { getListOrderService, cancelStatusOrderService } = require('../services/admin_order.services');
const { updateProductQuantityService } = require('../services/admin_product.services');
const { getCartItemService, deleteCartItemService, updateCartItemService
} = require('../services/customer_cart.services');
const { getDetailCustomerService } = require('../services/customer_login.services');
const { addOrderService, checkOrderService, addOrderProductService, listOrderCustomerService, detailOrderCustomerService, addDeliveryService } = require('../services/customer_order.services');
const { getListPaymentService } = require('../services/payment.services');

const showOrderController = async (req, res) => {
    const { idCart } = req.params;
    req.session[`cart-${idCart}`]
    const DETAIL_CART = req.session[`cart-${idCart}`];
    var lengthDetailCart = DETAIL_CART.length
    for (let i = 0; i < lengthDetailCart; i++) {
        await updateCartItemService(parseInt(DETAIL_CART[i].count), DETAIL_CART[i].cartPrice, DETAIL_CART[i].idCartItem);
    }
    const category = await getListCategoryService();
    const { userName } = req.session
    const user = getDetailCustomerService(userName)
    const { idCustomer } = req.session;
    const payment = await getListPaymentService();
    const cart = await getCartItemService(idCustomer);
    var cartPrice = cart[0].cartPrice;
    cartPrice = cartPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    var productTotalPrice = cart[0].productTotalPrice
    productTotalPrice = productTotalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    const ORDER = await checkOrderService(idCustomer);
    var totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        totalPrice = totalPrice + cart[i].productTotalPrice;

    }
    // totalPrice = totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    res.render('customer_order', {
        cart, payment, user, totalPrice, category, userName, ORDER, cartPrice, productTotalPrice
    });
}

const addOrderController = async (req, res) => {
    const { totalPrice, idPayment, deliveryAddress } = req.body;
    const { idCustomer } = req.session;
    if (!idCustomer) {
        return res.redirect('/login')
    }
    await addOrderService(totalPrice, idCustomer, idPayment);
    const ORDER = await checkOrderService(idCustomer);
    const idOrder = ORDER[0].id;
    const CART = await getCartItemService(idCustomer);
    var idCart = CART[0].idCart;
    for (let i = 0; i < CART.length; i++) {
        var count = CART[i].count;
        var quantity = (CART[i].quantity - count);
        var price = CART[i].productPrice;
        var idProduct = CART[i].idProduct;
        var totalPriceitem = CART[i].productTotalPrice
        if (quantity >= 0) {
            await updateProductQuantityService(idProduct, quantity)
        } else {
            var errorMessage = 'Số lượng sản phẩm không đủ';
            return res.redirect(`error?message=${encodeURIComponent(errorMessage)}`);
        }
        await addDeliveryService(idCustomer, idOrder, deliveryAddress)
        await addOrderProductService(count, price, totalPriceitem, idOrder, idProduct)
    }
    await deleteCartItemService(idCart);
    res.redirect('/');
}

const listOrderCustomerController = async (req, res) => {
    const { userName } = req.session
    const category = await getListCategoryService();
    const user = getDetailCustomerService(userName)
    const { idCustomer } = req.session;
    const order = await listOrderCustomerService(idCustomer);
    res.render('customer_listOrder', {
        order, category, user, userName
    });
}

const detailOrderCustomerController = async (req, res) => {
    const { userName } = req.session
    const category = await getListCategoryService();
    const user = getDetailCustomerService(userName)
    const { idCustomer } = req.session;
    const { id } = req.params;
    const order = await detailOrderCustomerService(id, idCustomer);
    return res.render('customer_detailOrder', {
        order, category, user, userName
    });
}

const cancelOrderController = async (req, res) => {
    const { id } = req.params;
    await cancelStatusOrderService(id);
    res.redirect('/listOrder')
};

module.exports = {
    showOrderController,
    addOrderController,
    listOrderCustomerController,
    detailOrderCustomerController,
    cancelOrderController
}