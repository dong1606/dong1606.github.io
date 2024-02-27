const { getFilterProductService, getTotalFilterProductService } = require('../services/filterProduct.services')
const { getListCategoryService } = require('../services/customer_category.services');
const { getListPromotionService } = require('../services/promotion.services');
const { hotProductService, categoryProductService } = require("../services/admin_product.services");


const getFilterProductController = async (req, res) => {
    const { userName } = req.session
    var { page, size, productName, idCategory, idPromotion, fromPrice, toPrice } = req.query;

    page = parseInt(page);
    size = parseInt(size);

    const PAGE_SELECT = page - 1;

    const category = await getListCategoryService();
    const promotion = await getListPromotionService();
    // const product = await hotProductService();

    const infoFilter = {
        PAGE_SELECT, size, productName, idCategory, idPromotion, fromPrice, toPrice
    }
    if (page && size) {
        var totalProduct = await getTotalFilterProductService(infoFilter)
        var filter = await getFilterProductService(infoFilter);
        res.render('listProduct', { filter, category, promotion, userName,totalProduct });
        
    }
}

module.exports = {
    getFilterProductController
}