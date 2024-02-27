var sql = require('../helpers/connect.mysql');
const getListPromotionService = () => {
    return new Promise((resolve, reject) => {
        sql.query(`Select * from promotion`, (err, promotion) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(promotion)
            }
        });
    })
}
module.exports = {
    getListPromotionService
}
