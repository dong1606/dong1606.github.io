const Chart = require('chart.js')
const fs = require('fs');
const ejs = require('ejs');
const exceljs = require('exceljs');
const { gettotalOrderService, getTotalPriceService, getTotalPriceMonthService, getTotalPriceQuarterService } = require("../services/admin_dashboard.services");
const { getListProductService } = require("../services/admin_product.services");
const { json } = require('express');

const showDashboardController = async (req, res, next) => {
  const { isSuperAdmin } = req.session
  const product = await getListProductService();
  var totalProduct = 0;
  for (let i = 0; i < product.length; i++) {
    totalProduct++
  }
  const order = await gettotalOrderService();
  const totalPriceOrder = await getTotalPriceService();
  const priceByMonth = await getTotalPriceMonthService();
  const January = priceByMonth[0].totalPriceByMonth;
  const February = priceByMonth[1].totalPriceByMonth;
  const March = priceByMonth[2].totalPriceByMonth;
  const April = priceByMonth[3].totalPriceByMonth;
  const May = priceByMonth[4].totalPriceByMonth;
  const June = priceByMonth[5].totalPriceByMonth;
  const July = priceByMonth[6].totalPriceByMonth;
  const August = priceByMonth[7].totalPriceByMonth;
  const September = priceByMonth[8].totalPriceByMonth;
  const October = priceByMonth[9].totalPriceByMonth;
  const November = priceByMonth[10].totalPriceByMonth;
  const December = priceByMonth[11].totalPriceByMonth;
  const priceByQuarter = await getTotalPriceQuarterService();
  const Q1 = priceByQuarter[0].totalPriceByQuarter;
  const Q2 = priceByQuarter[1].totalPriceByQuarter;
  const Q3 = priceByQuarter[2].totalPriceByQuarter;
  const Q4 = priceByQuarter[3].totalPriceByQuarter;
  res.render('admin_dashboard', {
    totalProduct, order, totalPriceOrder, January, February, March, April, May, June, July
    , August, September, October, November, December, Q1, Q2, Q3, Q4,isSuperAdmin
  })
}

const exportReportPriceByMonthController = async (req, res, next) => {

  const priceByMonth = await getTotalPriceMonthService();

  const workbook = new exceljs.Workbook();
  const worksheet = workbook.addWorksheet('My Data');

  // Add headers
  worksheet.addRow(['Tháng', 'Tiền']);

  // Add data rows
  for (const dataRow of priceByMonth) {
    var totalPriceByMonth = parseInt(dataRow.totalPriceByMonth).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
    worksheet.addRow([dataRow.month,totalPriceByMonth]) ;
  }

  workbook.xlsx.writeBuffer()
    .then((buffer) => {
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=mydata.xlsx');
      res.send(buffer);
    })
    .catch((error) => {
      console.error(error);
      // Handle errors
    });
}

module.exports = {
  showDashboardController,
  exportReportPriceByMonthController,
}