const { getListCategoryService } = require('../services/customer_category.services');
const { detailProductService,
    getListRelateProductService } = require('../services/customer_detailProduct.services');
const { getDetailCustomerService } = require('../services/customer_login.services');


const detailProductController = async (req, res) => {
    const { id } = req.params;
    const { userName } = req.session
    const user = getDetailCustomerService(userName)
    const category = await getListCategoryService();
    var product = await detailProductService(id);
    var idCategory = product[0].idCategory;
    var relateProduct = await getListRelateProductService(idCategory);
    var price=product[0].newPrice;
    price = price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    res.render('detailProduct', { product, user, category, userName,price,relateProduct });
}

module.exports = {
    detailProductController
}