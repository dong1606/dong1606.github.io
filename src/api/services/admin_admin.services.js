var sql = require('../helpers/connect.mysql');
const STATUS_DELETE = 0;
const STATUS_ACTIVE = 1;

const getListAdminService = () => {
    return new Promise((resolve, reject) => {
        sql.query(`Select id, userName, fullName, phone, address, status from admin ` , (err, admin) => {
            if (err) {
                reject(err);
            } else {
                resolve(admin);
            }
        });
    })
}

const addAdminService = (inforAdmin) => {
    return new Promise((resolve, reject) => {
        sql.query(`INSERT INTO admin (userName, password, fullName, phone, address, status) 
        VALUES ('${inforAdmin.userName}', '${inforAdmin.password}', '${inforAdmin.fullName}','${inforAdmin.phone}','${inforAdmin.address}','${STATUS_ACTIVE}')`, (err, admin) => {
            if (err) {
                reject(err);
            } else {
                resolve(admin)
            }
        });
    })
}

const editAdminService = (id) => {
    return new Promise((resolve, reject) => {
        sql.query(`Select * from admin where id = '${id}'`, (err, admin) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(admin)
            }
        });
    })
}


const updateAdminService = (id, userName, password, fullName, phone, address) => {
    return new Promise((resolve, reject) => {
        sql.query(`UPDATE admin SET userName = '${userName}', password = '${password}', fullName = '${fullName}', phone = '${phone}',
        address = '${address}' WHERE id = '${id}'`, (err, admin) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(admin)
            }
        });
    })
}

const updateActiveStatusService = (id) => {
    return new Promise((resolve, reject) => {
        sql.query(`UPDATE admin SET status ='${STATUS_ACTIVE}' WHERE id = '${id}'`, (err, admin) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(admin)
            }
        });
    })
}



const deleteAdminService = (id) => {
    return new Promise((resolve, reject) => {
        sql.query(`UPDATE admin SET status ='${STATUS_DELETE}' WHERE id = '${id}'`, (err, admin) => {
            if (err) {
                reject(err);
            } else {
                resolve(admin);
            }
        });
    });
};

module.exports = {
    getListAdminService,
    addAdminService,
    editAdminService,
    updateAdminService,
    deleteAdminService,
    updateActiveStatusService
}
