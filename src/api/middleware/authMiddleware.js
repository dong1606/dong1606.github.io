exports.loggedin = (req, res, next) => {
    if (req.session.loggedin) {
        res.locals.user = req.session.userName
        res.locals.user = req.session.idCustomer
        next();
    } else {
        res.redirect('/login')
    }
}

exports.loggedinAdmin = (req, res, next) => {
    if (req.session.loggedinAdmin) {
        const fullPath = req.baseUrl + req.path;
        res.locals.isSuperAdmin = req.session.isSuperAdmin;
        if (res.locals.isSuperAdmin === 0 && fullPath.includes('admin/account')) {
            res.redirect('/auth/login')
        }
        else {
            next();
        }
    } else {
        res.redirect('/auth/login')
    }
}

exports.isAuth = (req, res, next) => {
    if (req.session.loggedin) {
        res.locals.user = req.session.userName
        res.locals.user = req.session.idCustomer
        if (req.query.redirectUrl) {
            req.session.previousUrl = req.query.redirectUrl;
        }

        // Chuyển hướng người dùng
        res.redirect(req.session.previousUrl || '/');
    } else {
        next();
    }
}

exports.isAuthAdmin = (req, res, next) => {
    if (req.session.loggedinAdmin) {
        res.locals.isSuperAdmin = req.session.isSuperAdmin
        if (req.query.redirectUrl) {
            req.session.previousUrl = req.query.redirectUrl;
        }

        // Chuyển hướng người dùng
        res.redirect(req.session.previousUrl || '/admin/product/list');
    } else {
        next();
    }
}