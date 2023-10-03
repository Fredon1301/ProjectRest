'use strict'


const express = require('express')
const promotionRouter = express.Router()

const promotionController = require('../controller/promotionController')


promotionRouter.route('/api/promotion')
.get((req, res) => promotionController.getPromotion(req, res))
.post((req, res) => promotionController.createPromotion(req, res))
.put((req, res) => promotionController.updatePromotion(req, res))


promotionRouter.route('/api/promotion/:id')
.get((req, res) => promotionController.getPromotion(req, res))
.delete((req, res) => promotionController.deletePromotionById(req, res))



module.exports = promotionRouter
