const express = require("express");
const { addProduct, getAllProduct, getAllProductByMonth, updateProductById, getStaticsByMonth, barChart, pieChart } = require("../controller/productController");
const productRouter = express.Router();
productRouter.post('/all',getAllProduct)
productRouter.post('/add',addProduct)
productRouter.post('/barChart',barChart)
productRouter.post('/pieChart',pieChart)
productRouter.post('/monthStatics',getStaticsByMonth)
productRouter.post('/bymonth',getAllProductByMonth)
productRouter.patch('/byId',updateProductById)
module.exports = productRouter;
