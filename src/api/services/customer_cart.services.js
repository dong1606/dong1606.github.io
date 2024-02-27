var sql = require('../helpers/connect.mysql');

const STATUS_ACTIVE = 1;

const getCartItemService = (idCustomer) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT ca.id as idCart,ci.id as idCartItem, c.id as idCustomer,p.id as idProduct, userName , p.name as productName,p.description as productDescription,
        count,ci.price as cartPrice, p.price as productPrice, p.quantity as quantity,ci.totalPrice as productTotalPrice, ca.status, p.thumbnail as thumbnail
        FROM cart ca
        JOIN cart_item ci ON ca.id = ci.idCart
        JOIN customer c ON ca.idCustomer = c.id
        JOIN product p ON ci.idProduct = p.id
        WHERE c.id = '${idCustomer}' `, (err, cart) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(cart)
            }
        });
    })
}

const checkCartService = (idCustomer) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT *
        FROM cart 
        WHERE idCustomer = '${idCustomer}' `, (err, cart) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(cart)
            }
        });
    })
}

const addCartService = (idCustomer) => {
    return new Promise((resolve, reject) => {
        sql.query(`INSERT INTO cart (idCustomer, status)
        VALUES ('${idCustomer}','${STATUS_ACTIVE}') `, (err, cart) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(cart)
            }
        });
    })
}

const addCartItemService = (price, idCart, idProduct) => {
    return new Promise((resolve, reject) => {
        sql.query(`INSERT INTO cart_item (count, price,  status, idCart, idProduct) 
        VALUES (1, '${price}',${STATUS_ACTIVE},${idCart},${idProduct}) `, (err, cart) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(cart)
            }
        });
    })
}

const updateCartItemService = (count,price, id) => {
    return new Promise((resolve, reject) => {
        sql.query(`UPDATE cart_item SET count = ${count}, price=${price} WHERE id = '${id}'`, (err, cart) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(cart)
            }
        });
    })
}

const checkItemCartService = (idCustomer, idProduct) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT ca.id as idCart, c.id as idCustomer,p.id as idProduct, userName , p.name as productName,p.description as productDescription,
        count, ci.price as cartPrice, p.price as productPrice, totalPrice, ca.status, p.thumbnail as thumbnail
        FROM cart ca
        JOIN cart_item ci ON ca.id = ci.idCart
        JOIN customer c ON ca.idCustomer = c.id
        JOIN product p ON ci.idProduct = p.id
        WHERE c.id = '${idCustomer}' and p.id= '${idProduct}'`, (err, cart) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(cart)
            }
        });
    })
}

const deleteCartItemService = (id) => {
    return new Promise((resolve, reject) => {
        sql.query(`DELETE from cart_item WHERE id = ${id}`, (err, product) => {
            if (err) {
                reject(err);
            } else {
                resolve(product);
            }
        });
    });
};

module.exports = {
    getCartItemService,
    addCartItemService,
    checkCartService,
    addCartService,
    checkItemCartService,
    updateCartItemService,
    deleteCartItemService
}