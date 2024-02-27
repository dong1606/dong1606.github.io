var sql = require('../helpers/connect.mysql');
const STATUS_DELETE = 0;
const STATUS_ACTIVE = 1;

const getListProductService = () => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT
        product.id,
        product.name,
        product.thumbnail,
        FORMAT(product.price,0) as price,
        product.status,
        product.quantity,
        promotion.name AS promotionName,
        categories.name AS categoryName
      FROM
        product
        INNER JOIN
        promotion
        ON
        product.idPromotion = promotion.id
        INNER JOIN
        categories
        ON
        product.idCategory = categories.id
        `, (err, product) => {
            if (err) {
                reject(err);
            } else {
                resolve(product);
            }
        });
    })
}

const addProductService = (infoProduct) => {
    return new Promise((resolve, reject) => {
        sql.query(`INSERT INTO product (name, description, quantity, soldQuantity, thumbnail, sku, price, status, idCategory, idPromotion, cpu, ram, hardDrive, screen, card) 
        VALUES ('${infoProduct.name}', '${infoProduct.description}', '${infoProduct.quantity}',0,'${infoProduct.thumbnail}','${infoProduct.sku}','${infoProduct.price}','${STATUS_ACTIVE}','${infoProduct.idCategory}','${infoProduct.idPromotion}'
        ,'${infoProduct.cpu}','${infoProduct.ram}','${infoProduct.hardDrive}','${infoProduct.screen}','${infoProduct.cart}')`, (err, product) => {
            if (err) {
                reject(err);
            } else {
                resolve(product)
            }
        });
    })
}

const editProductService = (id) => {
    return new Promise((resolve, reject) => {
        sql.query(`Select * from product where id = '${id}'`, (err, product) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(product)
            }
        });
    })
}

const updateProductService = (infoProduct) => {
    return new Promise((resolve, reject) => {
        sql.query(`UPDATE product SET name = '${infoProduct.name}', description = '${infoProduct.description}', quantity = '${infoProduct.quantity}' ${infoProduct.thumbnail ? ', thumbnail = ' + `'${infoProduct.thumbnail}'` + ', ' : ', '}
         sku = '${infoProduct.sku}', price = '${infoProduct.price}', idCategory = '${infoProduct.idCategory}'
        , idPromotion = '${infoProduct.idPromotion}' , cpu = '${infoProduct.cpu}', ram = '${infoProduct.ram}', 
        hardDrive = '${infoProduct.hardDrive}' , screen = '${infoProduct.screen}', card = '${infoProduct.card}'WHERE id = '${infoProduct.id}'`, (err, product) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(product)
            }
        });
    })
}

const updateProductQuantityService = (id,quantity) => {
    return new Promise((resolve, reject) => {
        sql.query(`UPDATE product SET  quantity = ${quantity} WHERE id = '${id}'`, (err, product) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(product)
            }
        });
    })
}

const productActiveStatusService = (id) => {
    return new Promise((resolve, reject) => {
        sql.query(`UPDATE product SET status ='${STATUS_ACTIVE}' WHERE id = '${id}'`, (err, product) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(product)
            }
        });
    })
}

const deleteProductService = (id) => {
    return new Promise((resolve, reject) => {
        sql.query(`UPDATE product  SET status = '${STATUS_DELETE}' WHERE id = '${id}'`, (err, product) => {
            if (err) {
                reject(err);
            } else {
                resolve(product);
            }
        });
    });
};

const hotProductService = () => {
    return new Promise((resolve, reject) => {
        sql.query(`Select product.id as idProduct, product.name as name,FORMAT(product.price,0) as price, product.description as description,
        product.thumbnail as thumbnail, promotion.percent as percent, categories.name as categoryName,Format(((price * percent) / 100),0) AS tietkiem,Format((price-((price * percent) / 100)),0) AS newPrice
        FROM product join promotion on product.idPromotion = promotion.id join categories on product.idCategory = categories.id ORDER BY soldQuantity DESC
        LIMIT 8`, (err, product) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(product)
            }
        });
    })
}

const categoryProductService = (idCategory) => {
    return new Promise((resolve, reject) => {
        sql.query(`Select product.id as idProduct, product.name as name, FORMAT(product.price,0) as price, product.description as description,
        product.thumbnail as thumbnail, categories.thumbnail as categoryThumbnail, categories.name as categoryName
        from product join categories on product.idCategory = categories.id where idCategory = '${idCategory}'`, (err, categoryProduct) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(categoryProduct)
            }
        });
    })
}

module.exports = {
    getListProductService,
    addProductService,
    editProductService,
    updateProductService,
    deleteProductService,
    hotProductService,
    categoryProductService,
    updateProductQuantityService,
    productActiveStatusService
}
