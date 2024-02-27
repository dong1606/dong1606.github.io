var sql = require('../helpers/connect.mysql');
const STATUS_DELETE = 0;
const STATUS_ACTIVE = 1;

const gettotalOrderService = () => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT COUNT(*) AS totalOrder
        FROM orders
        WHERE status = 1;`, (err, order) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(order)
            }
        });
    })
}

const getTotalPriceService = () => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT FORMAT(SUM(totalPrice),0) AS totalPriceOrder
        FROM orders
        WHERE status = 1;`, (err, order) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(order)
            }
        });
    })
}

const getTotalPriceMonthService = () => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT MONTH(timeOrder) AS month, SUM(totalPrice) AS totalPriceByMonth
        FROM orders where status = 1
        GROUP BY month;`, (err, order) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(order)
            }
        });
    })
}

const getTotalPriceQuarterService = () => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT QUARTER(timeOrder) AS quarter, SUM(totalPrice) AS totalPriceByQuarter
        FROM orders where status = 1
        GROUP BY quarter;`, (err, order) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(order)
            }
        });
    })
}

module.exports = {
    gettotalOrderService,
    getTotalPriceService,
    getTotalPriceMonthService,
    getTotalPriceQuarterService
}