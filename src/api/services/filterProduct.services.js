var sql = require('../helpers/connect.mysql');

const getFilterProductService = (inforProduct) => {
    return new Promise((resolve, reject) => {
        sql.query(`Select product.name as productName, categories.name as categoryName, promotion.name as promotionName,
            product.id as idProduct, idCategory, idPromotion,percent,
           FORMAT(price,0) as price,price as pricenotformat, product.description as productDescription, product.thumbnail as thumbnail,Format(((price * percent) / 100),0) AS tietkiem,Format((price-((price * percent) / 100)),0) AS newPrice
           from product join categories on product.idCategory= categories.id join promotion on product.idPromotion=promotion.id
           ${inforProduct.productName || inforProduct.idCategory || inforProduct.idPromotion || (inforProduct.fromPrice && inforProduct.toPrice) ? 'WHERE product.status = 1 ' : ''}
        ${inforProduct.productName ? 'and product.name like "%' + inforProduct.productName + '%"' : ""} ${inforProduct.idCategory ? 'and idCategory = ' + inforProduct.idCategory : ""} ${inforProduct.idPromotion ? 'and idPromotion =' + inforProduct.idPromotion : ""} 
           ${inforProduct.fromPrice && inforProduct.toPrice ? 'and price between ' + inforProduct.fromPrice + ' and ' + inforProduct.toPrice : ""}   LIMIT ${inforProduct.size} OFFSET ${inforProduct.PAGE_SELECT} `, (err, filter) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(filter)
            }
        });
    })
}
const getTotalFilterProductService = (inforProduct) => {
    return new Promise((resolve, reject) => {
        sql.query(`Select COUNT(*) as total_product
           from product join categories on product.idCategory= categories.id join promotion on product.idPromotion=promotion.id
           ${inforProduct.productName || inforProduct.idCategory || inforProduct.idPromotion || (inforProduct.fromPrice && inforProduct.toPrice) ? 'WHERE product.status = 1 ' : ''}
        ${inforProduct.productName ? 'and product.name like "%' + inforProduct.productName + '%"' : ""} ${inforProduct.idCategory ? 'and idCategory = ' + inforProduct.idCategory : ""} ${inforProduct.idPromotion ? 'and idPromotion =' + inforProduct.idPromotion : ""} 
           ${inforProduct.fromPrice && inforProduct.toPrice ? 'and price between ' + inforProduct.fromPrice + ' and ' + inforProduct.toPrice : ""}   LIMIT ${inforProduct.size} OFFSET ${inforProduct.PAGE_SELECT} `, (err, filter) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(filter)
            }
        });
    })
}
module.exports = {
    getFilterProductService,
    getTotalFilterProductService
}