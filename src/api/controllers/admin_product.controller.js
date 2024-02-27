const { getListProductService,
    addProductService,
    editProductService,
    updateProductService,
    deleteProductService,
    productActiveStatusService,
} = require('../services/admin_product.services')
const { getListCategoryService } = require('../services/admin_category.services');
const { getListPromotionService } = require('../services/promotion.services');

const getListProductController = async (req, res) => {
    const product = await getListProductService();
    res.render('admin_product', {
        product
    });
}
const showFormCreateProduct = async (req, res, next) => {
    const category = await getListCategoryService();
    const promotion = await getListPromotionService();
    res.render('admin_addProduct', { category, promotion })
}

const addProductController = async (req, res) => {
    try {
        const { name, description, quantity, sku, price, idCategory, idPromotion, cpu, ram, hardDrive, screen, card } = req.body;
        const thumbnail = req.file.filename;
        await addProductService({ name, description, quantity, thumbnail, sku, price, idCategory, idPromotion, cpu, ram, hardDrive, screen, card });
        res.redirect('/admin/product/list')
    } catch (error) {
        var errorMessage = 'Vui lòng nhập đầy đủ thông tin';
        res.redirect(`error?message=${encodeURIComponent(errorMessage)}`);
    }
}

const errorPageController = async (req, res) => {
    const message = req.query.message;
    res.render('error.ejs', { message });
}

const editProductController = async (req, res) => {
    const { id } = req.params;
    const category = await getListCategoryService();
    const promotion = await getListPromotionService();
    var product = await editProductService(id);
    res.render('admin_editProduct', { product, category, promotion });
}

const updateProductController = async (req, res) => {
    const { id } = req.params;
    const { name, description, quantity, sku, price, status, idCategory, idPromotion, cpu, ram, hardDrive, screen, card } = req.body;
    var thumbnail = undefined;

    if (req.file) {
        thumbnail = req.file.filename;
    }
    //handles null error
    if (thumbnail) {
        await updateProductService({ id, name, description, quantity, thumbnail, sku, price, status, idCategory, idPromotion, cpu, ram, hardDrive, screen, card });
        res.redirect('/admin/product/list');
    } else {
        await updateProductService({ id, name, description, quantity, sku, price, status, idCategory, idPromotion, cpu, ram, hardDrive, screen, card });
        res.redirect('/admin/product/list');
    }
}

const productActiveStatusController = async (req, res) => {
    const { id } = req.params;
    await productActiveStatusService(id);
    res.redirect('/admin/product/list')
};

const deleteProductController = async (req, res) => {
    const { id } = req.params;

    await deleteProductService(id);
    res.redirect('/admin/product/list');
};

module.exports = {
    getListProductController,
    addProductController,
    editProductController,
    updateProductController,
    deleteProductController,
    errorPageController,
    showFormCreateProduct,
    productActiveStatusController
}