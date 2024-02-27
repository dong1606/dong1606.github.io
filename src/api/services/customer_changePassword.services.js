var sql = require('../helpers/connect.mysql');
const STATUS_DELETE = 0;
const STATUS_ACTIVE = 1;

const changePasswordService = (id,password) => {
    return new Promise((resolve, reject) => {
        sql.query(`UPDATE customer SET  password = '${password}' WHERE id = '${id}'`, (err, customer) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(customer)
            }
        });
    })
}

module.exports = {
    changePasswordService
}
