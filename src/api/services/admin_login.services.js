var sql = require('../helpers/connect.mysql');
const STATUS_DELETE = 0;
const STATUS_ACTIVE = 1;
const IS_SUPER_ADMIN = 0;

const getDetailAdminService = (userName) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM admin WHERE userName='${userName}'`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res)
            }
        });
    })
}

const adminRegisterService = (inforAdmin) => {
    return new Promise((resolve, reject) => {
        sql.query(`INSERT INTO admin (userName, password, fullName, phone, address, status, isSuperAdmin) 
            VALUES ('${inforAdmin.userName}', '${inforAdmin.password}', '${inforAdmin.fullName}','${inforAdmin.phone}','${inforAdmin.address}','${STATUS_ACTIVE}',${IS_SUPER_ADMIN})`, (err, admin) => {
            if (err) {
                reject(err);
            } else {
                resolve(admin)
            }
        });
    })
}

module.exports = {
    getDetailAdminService,
    adminRegisterService
}
