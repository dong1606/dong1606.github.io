var sql = require('../helpers/connect.mysql');
const STATUS_DELETE = 0;
const STATUS_ACTIVE = 1;

const getListCustomerService = () => {
    return new Promise((resolve, reject) => {
        sql.query(`Select customer.id, userName, fullName, phone, address, customer.status, typeOfPayment from customer inner join payment on customer.idPayment = payment.id` , (err, customer) => {
            if (err) {
                reject(err);
            } else {
                resolve(customer);
            }
        });
    })
}

const addCustomerService = (inforCustomer) => {
    return new Promise((resolve, reject) => {
        sql.query(`INSERT INTO customer (userName, password, fullName, phone, address, status, idPayment) 
        VALUES ('${inforCustomer.userName}', '${inforCustomer.password}', '${inforCustomer.fullName}','${inforCustomer.phone}','${inforCustomer.address}','${STATUS_ACTIVE}','${inforCustomer.idPayment}')`, (err, customer) => {
            if (err) {
                reject(err);
            } else {
                resolve(customer)
            }
        });
    })
}

const editCustomerService = (id) => {
    return new Promise((resolve, reject) => {
        sql.query(`Select * from Customer where id = '${id}'`, (err, customer) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(customer)
            }
        });
    })
}

const deleteCustomerService = (id) => {
    return new Promise((resolve, reject) => {
        sql.query(`UPDATE customer SET status ='${STATUS_DELETE}' WHERE id = '${id}'`, (err, customer) => {
            if (err) {
                reject(err);
            } else {
                resolve(customer);
            }
        });
    });
};

module.exports = {
    getListCustomerService,
    addCustomerService,
    editCustomerService,
    deleteCustomerService
}
