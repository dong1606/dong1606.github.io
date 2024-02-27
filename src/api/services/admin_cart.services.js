var sql = require('../helpers/connect.mysql');
const STATUS_DELETE = 0;
const STATUS_ACTIVE = 1;

const getListCartService = () => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT ca.id , c.userName , p.name,   ci.count, FORMAT(ci.price,0) as price, FORMAT(ci.totalPrice,0)as totalPrice, ca.status
        FROM cart ca
        JOIN cart_item ci ON ca.id = ci.idCart
        JOIN customer c ON ca.idCustomer = c.id
        JOIN product p ON ci.idProduct = p.id
        `, (err, cart) => {
            if (err) {
                reject(err);
            } else {
                resolve(cart);
            }
        });
    })
}

const activeCartService = (id) => {
    return new Promise((resolve, reject) => {
        sql.query(`UPDATE cart SET status ='${STATUS_ACTIVE}' WHERE id = '${id}'`, (err, cart) => {
            if (err) {
                reject(err);
            } else {
                resolve(cart);
            }
        });
    });
};

const deleteCartService = (id) => {
    return new Promise((resolve, reject) => {
        sql.query(`UPDATE cart SET status ='${STATUS_DELETE}' WHERE id = '${id}'`, (err, cart) => {
            if (err) {
                reject(err);
            } else {
                resolve(cart);
            }
        });
    });
};

module.exports = {
    getListCartService,
    deleteCartService,
    activeCartService
}
