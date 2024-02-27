const { getListOrderService,
    activeOrderService,
    detailOrderService,
    cancelStatusOrderService } = require('../services/admin_order.services');
const mailer = require('../utils/mailer')

const getListOrderController = async (req, res) => {
    const { isSuperAdmin } = req.session
    const order = await getListOrderService();
    res.render('admin_order', {
        order,isSuperAdmin
    });
}

const detailOrderController = async (req, res) => {
    const { id } = req.params;
    const order = await detailOrderService(id);
    return res.render('admin_detailOrder', {
        order
    });
}

const cancelOrderController = async (req, res) => {
    const { id } = req.params;
    await cancelStatusOrderService(id);
    res.redirect('/admin/order/list')
};


const activeOrderController = async (req, res) => {
    const { id } = req.params;
    const orders = await detailOrderService(parseInt(id));
    let mailContent = `
    <h1>Thông tin đơn hàng</h1>
    <p>Mã đơn hàng: ${orders[0].id}</p>
    <p>Tên khách hàng: ${orders[0].fullName}</p>
    <p>Tổng tiền: ${orders[0].orderTotalPrice}</p>
    <p>Địa chỉ: ${orders[0].address}</p>
    <p>Ngày đặt hàng: ${orders[0].timeOrder}</p>
    <p>Ngày giao hàng: ${orders[0].timeShip}</p>
    <h1>Chi tiết sản phẩm</h1>
    `;
    for (let i = 0; i < orders.length; i++) {
        mailContent += `
        
        <p>Tên sản phẩm: ${orders[i].name}</p>
        <p>Giá tiền: ${orders[i].productPrice}</p>
        <p>Số lượng: ${orders[i].count}</p>
        <p>Tổng tiền: ${orders[i].productTotalPrice}</p>
      `;
    }
    await activeOrderService(id);
    mailer.sendMail(orders[0].email, "Đặt hàng thành công", mailContent)
    res.redirect('/admin/order/list')
};

const deleteOrderController = async (req, res) => {
    const { id, status } = req.query;
    await updateStatusOrderService(id, status);
    res.redirect('/admin/order/list')
};

module.exports = {
    getListOrderController,
    deleteOrderController,
    activeOrderController,
    detailOrderController,
    cancelOrderController
}