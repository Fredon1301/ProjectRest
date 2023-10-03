'use strict'


const express = require('express')
const ProductRouter = express.Router()

const ProductController = require('../controller/productController')


ProductRouter.route('/api/product')
.get((req, res) => ProductController.getProduct(req, res))
.post((req, res) => ProductController.createProduct(req, res))
.put((req, res) => ProductController.updateProduct(req, res))


ProductRouter.route('/api/product/:id')
//.get((req, res) => ProductController.getProduct(req, res))
.delete((req, res) => ProductController.deleteProductById(req, res))



module.exports = ProductRouter
