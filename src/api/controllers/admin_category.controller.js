const { getListCategoryService,
    addCategoryService,
    editCategoryService,
    updateCategoryService,
    deleteCategoryService,
    getListCateService,
    categoryActiveStatusService
} = require('../services/admin_category.services')

const getListCategoryController = async (req, res) => {
    const { isSuperAdmin } = req.session
    const category = await getListCateService();
    res.render('admin_category', {
        category, isSuperAdmin
    });
}

const showFormCreateCategory = async (req, res, next) => {
    const { isSuperAdmin } = req.session
    res.render('admin_addCategory', { isSuperAdmin })
}

const addCategoryController = async (req, res) => {
    try {
        const { isSuperAdmin } = req.session
        const { name, decription } = req.body;
        const thumbnail = req.file.filename;
        await addCategoryService({ name, decription, thumbnail });
        res.redirect('/admin/category/list')
    } catch (error) {
        var errorMessage = 'Vui lòng nhập đầy đủ thông tin';
        res.redirect(`error?message=${encodeURIComponent(errorMessage)}`);
    }

}

const errorPageController = async (req, res) => {
    const message = req.query.message;
    res.render('error.ejs', { message });
}

const editCategoryController = async (req, res) => {
    const { isSuperAdmin } = req.session
    const { id } = req.params;
    var category = await editCategoryService(id);
    res.render('admin_editCategory', { category,isSuperAdmin });
}

const updateCategoryController = async (req, res) => {
    const { id } = req.params;
    const { name, description, status } = req.body;
    var thumbnail = undefined;
    if (req.file) {
        thumbnail = req.file.filename;
    }
    //handles null error
    if (thumbnail) {
        await updateCategoryService({ id, name, description, thumbnail, status });
        res.redirect('/admin/category/list');
    } else {
        await updateCategoryService({ id, name, description, thumbnail, status });
        res.redirect('/admin/category/list');
    }
}

const categoryActiveStatusController = async (req, res) => {
    const { id } = req.params;
    await categoryActiveStatusService(id);
    res.redirect('/admin/category/list')
};

const deleteCategoryController = async (req, res) => {
    const { id } = req.params;

    await deleteCategoryService(id);
    res.redirect('/admin/category/list');
};

module.exports = {
    getListCategoryController,
    addCategoryController,
    editCategoryController,
    updateCategoryController,
    deleteCategoryController,
    errorPageController,
    showFormCreateCategory,
    categoryActiveStatusController
}