const { getListCategoryService } = require("../services/customer_category.services");
const { hotProductService, categoryProductService } = require("../services/admin_product.services");
const { getDetailCustomerService } = require('../services/customer_login.services');

const homeProductController = async (req, res) => {
    const {userName} = req.session
    const product = await hotProductService();
    const category = await getListCategoryService();
    let lengthCategory = category.length;
    var arrayProduct = [];

    for (let i = 0; i < lengthCategory; i++) {
        var products = await categoryProductService(category[i].id);
        arrayProduct.push(products);
    }
    res.render('home.ejs', {
        product, category, arrayProduct,userName
    });
}

module.exports = {
    homeProductController
}