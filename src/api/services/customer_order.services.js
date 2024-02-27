var sql = require('../helpers/connect.mysql');
const STATUS_DELETE = 0;
const STATUS_ACTIVE = 1;
const STATUS_CANCEL = -1;

const addOrderService = (totalPrice, idCustomer, idPayment) => {
    return new Promise((resolve, reject) => {
        sql.query(`INSERT INTO orders (timeOrder, totalPrice, status, idCustomer, idPayment) 
        VALUES (NOW(),'${totalPrice}', '${STATUS_DELETE}',${idCustomer},${idPayment})`, (err, order) => {
            if (err) {
                reject(err);
            } else {
                resolve(order);
            }
        });
    })
}

const checkOrderService = (idCustomer) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT *
        FROM orders 
        WHERE idCustomer = '${idCustomer}'
        ORDER BY id DESC LIMIT 1 `, (err, order) => {
            if (err) {
                reject(err);
            } else {
                resolve(order);
            }
        });
    })
}

const addOrderProductService = (count, price, totalPrice, idOrder, idProduct) => {
    return new Promise((resolve, reject) => {
        sql.query(`INSERT INTO detailorder (count, price, totalPrice, idOrder, idProduct) 
        VALUES ('${count}', '${price}','${totalPrice}',${idOrder},${idProduct})`, (err, order) => {
            if (err) {
                reject(err);
            } else {
                resolve(order);
            }
        });
    })
}

const listOrderCustomerService = (idCustomer) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT od.id, c.userName as userName, c.address as address, c.phone as phone,  od.timeOrder, od.timeShip, FORMAT(od.totalPrice,0) as totalPrice, od.status
        FROM orders od
        JOIN customer c ON od.idCustomer = c.id where idCustomer=${idCustomer}`, (err, order) => {
            if (err) {
                reject(err);
            } else {
                resolve(order);
            }
        });
    })
}

const detailOrderCustomerService = (idOrder,idCustomer) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT od.id, c.userName as userName, c.address as address, c.email as email,
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
        WHERE od.id=${idOrder} and c.id=${idCustomer}`, (err, order) => {
            if (err) {
                reject(err);
            } else {
                resolve(order);
            }
        });
    })
}

const addDeliveryService = (idCustomer,idOrder,deliveryAddress) => {
    return new Promise((resolve, reject) => {
        sql.query(`INSERT INTO delivery (idCustomer,idOrder,deliveryAddress) 
        VALUES (${idCustomer}, ${idOrder},'${deliveryAddress}')`, (err, order) => {
            if (err) {
                reject(err);
            } else {
                resolve(order);
            }
        });
    })
}

module.exports = {
    addOrderService,
    addOrderProductService,
    checkOrderService,
    listOrderCustomerService,
    detailOrderCustomerService,
    addDeliveryService
}
