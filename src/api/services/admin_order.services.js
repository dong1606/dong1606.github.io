var sql = require('../helpers/connect.mysql');
const STATUS_DELETE = 0;
const STATUS_ACTIVE = 1;
const STATUS_CANCEL = -1;

const getListOrderService = () => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT od.id, c.userName as userName, c.address as address, c.phone as phone,  od.timeOrder, od.timeShip, FORMAT(od.totalPrice,0) as totalPrice, od.status
        FROM orders od
        JOIN customer c ON od.idCustomer = c.id
        `, (err, order) => {
            if (err) {
                reject(err);
            } else {
                resolve(order);
            }
        });
    })
}

const detailOrderService = (idOrder) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT od.id, c.userName as userName, d.deliveryAddress as address, c.email as email,
        de.price as productPrice, FORMAT(de.totalPrice,0) as productTotalPrice,FORMAT(od.totalPrice,0) as orderTotalPrice, de.count as count, 
        de.idProduct as idProduct, c.fullName as fullName,
        c.phone as phone,  od.timeOrder, od.timeShip, od.totalPrice, od.status,
        p.name as name,
        p.quantity,
        p.sku,
        p.thumbnail,
        p.description
        FROM orders od
        JOIN detailorder de ON od.id = de.idOrder
        JOIN customer c ON od.idCustomer = c.id
        JOIN product p ON de.idProduct = p.id
        JOIN delivery d ON d.idOrder = od.id
        WHERE od.id=${idOrder}`, (err, order) => {
            if (err) {
                reject(err);
            } else {
                resolve(order);
            }
        });
    })
}

const cancelStatusOrderService = (id) => {
    return new Promise((resolve, reject) => {
        sql.query(`UPDATE orders SET status ='${STATUS_CANCEL}' WHERE id = '${id}'`, (err, order) => {
            if (err) {
                reject(err);
            } else {
                resolve(order);
            }
        });
    });
};

const activeOrderService = (id) => {
    return new Promise((resolve, reject) => {
        sql.query(`UPDATE orders SET status ='${STATUS_ACTIVE}', timeShip= NOW() WHERE id = '${id}'`, (err, cart) => {
            if (err) {
                reject(err);
            } else {
                resolve(cart);
            }
        });
    });
};

module.exports = {
    getListOrderService,
    activeOrderService,
    detailOrderService,
    cancelStatusOrderService
}
