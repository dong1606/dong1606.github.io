var sql = require('../helpers/connect.mysql');

const STATUS_DELETE = 0;
const STATUS_ACTIVE = 1;

const getDetailCustomerService = (userName) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM customer WHERE userName='${userName}'`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res)
            }
        });
    })
}

const customerRegisterService = (inforCustomer) => {
    return new Promise((resolve, reject) => {
        sql.query(`INSERT INTO customer (userName, password, fullName, phone, address, status, idPayment,email) 
            VALUES ('${inforCustomer.userName}', '${inforCustomer.password}', '${inforCustomer.fullName}','${inforCustomer.phone}','${inforCustomer.address}','${STATUS_ACTIVE}','${inforCustomer.idPayment}','${inforCustomer.email}')`, (err, customer) => {
            if (err) {
                reject(err);
            } else {
                resolve(customer)
            }
        });
    })
}

module.exports = {
    getDetailCustomerService,
    customerRegisterService
}
