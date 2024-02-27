var sql = require('../helpers/connect.mysql');

const getListPaymentService = () => {
    return new Promise((resolve, reject) => {
        sql.query(`Select * from payment`, (err, payment) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(payment)
            }
        });
    })
}

module.exports = {
    getListPaymentService
}