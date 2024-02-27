var sql = require('../helpers/connect.mysql');
const STATUS_DELETE = 0;
const STATUS_ACTIVE = 1;

const getListCateService = () => {
    return new Promise((resolve, reject) => {
        sql.query(`Select * from categories `, (err, category) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(category)
            }
        });
    })
}

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

const addCategoryService = (inforCategory) => {
    return new Promise((resolve, reject) => {
        sql.query(`INSERT INTO categories (name, decription, thumbnail, status) 
        VALUES ('${inforCategory.name}', '${inforCategory.decription}', '${inforCategory.thumbnail}','${STATUS_ACTIVE}')`, (err, category) => {
            if (err) {
                reject(err);
            } else {
                resolve(category)
            }
        });
    })
}

const editCategoryService = (id) => {
    return new Promise((resolve, reject) => {
        sql.query(`Select * from categories where id = '${id}'`, (err, category) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(category)
            }
        });
    })
}

const updateCategoryService = (inforCategory) => {
    return new Promise((resolve, reject) => {
        sql.query(`UPDATE categories SET name = '${inforCategory.name}', description = '${inforCategory.description}' ${inforCategory.thumbnail ? ', thumbnail = ' + `'${inforCategory.thumbnail}'` : ', '}
         WHERE id = '${inforCategory.id}'`, (err, category) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(category)
            }
        });
    })
}

const categoryActiveStatusService = (id) => {
    return new Promise((resolve, reject) => {
        sql.query(`UPDATE categories SET status ='${STATUS_ACTIVE}' WHERE id = '${id}'`, (err, admin) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(admin)
            }
        });
    })
}

const deleteCategoryService = (id) => {
    return new Promise((resolve, reject) => {
        sql.query(`UPDATE categories SET status ='${STATUS_DELETE}' WHERE id = '${id}'`, (err, category) => {
            if (err) {
                reject(err);
            } else {
                resolve(category);
            }
        });
    });
};

module.exports = {
    getListCategoryService,
    getListCateService,
    addCategoryService,
    editCategoryService,
    updateCategoryService,
    deleteCategoryService,
    categoryActiveStatusService
}