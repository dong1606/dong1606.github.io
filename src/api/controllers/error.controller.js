
const errorPageController = async (req, res) => {
    const message = req.query.message;
    res.render('error.ejs', { message });
}

module.exports = {
    errorPageController
}