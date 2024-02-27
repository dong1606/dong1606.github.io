const { showDashboardController, exportReportPriceByMonthController } = require('../controllers/admin_dashboard.controller');

const express = require('express');

const route = express.Router();

route.get("/show", showDashboardController)
route.post("/export", exportReportPriceByMonthController)


module.exports = route;