var sql = require('../helpers/connect.mysql');

const detailProductService = (idProduct) => {
    return new Promise((resolve, reject) => {
        sql.query(`Select product.id as idProduct,promotion.id as promotionId, product.name as name, product.description as description, quantity, soldQuantity, sku, price,thumbnail, idCategory, idPromotion, cpu, ram, hardDrive, screen, card ,Format((price-((price * percent) / 100)),0) AS newPrice
        from product join promotion on product.idPromotion=promotion.id  where product.id = '${idProduct}'`, (err, product) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(product)
            }
        });
    })
}

const getListRelateProductService = (idCategory) => {
    return new Promise((resolve, reject) => {
        sql.query(`Select id,name, description, quantity, soldQuantity, sku, FORMAT(price,0)as price,thumbnail, idCategory, idPromotion, cpu, ram, hardDrive, screen, card from product where idCategory = '${idCategory}' ORDER BY RAND() LIMIT 5`, (err, product) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(product)
            }
        });
    })
}

module.exports = {
    detailProductService,
    getListRelateProductService
}