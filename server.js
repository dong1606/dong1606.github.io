const express = require('express')
const router_login = require('./src/api/routes/admin_login.route')
const router_admin = require('./src/api/routes/admin_admin.route')
const router_customer = require('./src/api/routes/admin_customer.route')
const router_error = require('./src/api/routes/error.route')
const router_upload = require('./src/api/routes/uploadImages.route')
const router_product = require('./src/api/routes/admin_product.route')
const router_category = require('./src/api/routes/admin_category.route')
const router_cart = require('./src/api/routes/admin_cart.route')
const router_order = require('./src/api/routes/admin_order.route')
const router_client = require('./src/api/routes/client.route')
const router_auth = require('./src/api/routes/customer_login.route')
const router_dashboard = require('./src/api/routes/admin_dashboard.route')
const multer = require("multer");
const session =require('express-session')

const ejs = require("ejs");

const app = express()
app.set("view engine", "ejs");
app.set("views", __dirname + '/src/public/views');
app.use(express.static( __dirname + '/src/public'));
app.use('/static/image',express.static( __dirname + '/src/public/images/laptopImages'));
const PORT = process.env.PORT || 3000;

app.use(session({
    secret: 'secret',
    resave:true,
    saveUninitialized : true,
}))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use("" , router_client);
app.use("/auth" , router_login);
app.use("/admin/account" , router_admin);
app.use("/admin/customer" , router_customer);
app.use("/error" , router_error);
app.use("/upload" , router_upload);
app.use("/admin/product" , router_product); // sao product mà /item?? /item có ý nghĩa gì ? bình thường product đặt là gì a
app.use("/admin/cart" , router_cart);
app.use("/admin/category" , router_category);
app.use("/admin/order" , router_order);
app.use("/admin/dashboard" , router_dashboard);
app.use("" , router_auth);


app.listen(PORT, () => console.log('Server is running'))

