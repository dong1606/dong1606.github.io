var sql = require('../helpers/connect.mysql');
const getListCategoryService = () => {
    return new Promise((resolve, reject) => {
        sql.query(`Select * from categories where status=1`, (err, category) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(category)
            }
        });
    })
}

module.exports = {
    getListCategoryService
}