const promotion = require('../models/Promotion');
const jwtService = require('jsonwebtoken');

module.exports = {
    getPromotions: (req, res) => {
        promotion.find({}).select(["-__v", "-_id"]).then((result) => {
            res.status(200).json(result);
        }).catch(() => {
            res.status(500).json({ message: "Não foi possível recuperar as promoções" });
        });
    },
    deletePromotionById: async (req, res) => {
        try {
            const result = await promotion.deleteOne({ codPromo: req.params.id });
            if (result.deletedCount > 0) {
                res.status(200).json({ message: "Promoção removida com sucesso" });
            } else {
                res.status(404).json({ message: "Promoção não encontrada para remoção" });
            }
        } catch (err) {
            res.status(500).json({ message: "Não foi possível remover a promoção" });
        }
    },
    getPromotion: async (req, res) => {
        try {
            const result = await promotion.findOne({ codPromo: req.body.codPromo });
            if (!result) {
                res.status(404).json({ message: "Promoção não encontrada" });
            } else {
                res.status(200).json(result);
            }
        } catch (err) {
            res.status(500).json({ message: "Não foi possível recuperar a promoção no momento" });
        }
    },
    updatePromotion: async (req, res) => {
        try {
            const result = await promotion.updateOne({ codPromo: req.body.codPromo }, req.body);
            if (result.nModified > 0) {
                res.status(200).json({ message: "Promoção atualizada com sucesso" });
            } else {
                res.status(404).json({ message: "Promoção não encontrada para atualização" });
            }
        } catch (err) {
            res.status(500).json({ message: "Não foi possível atualizar os dados" });
        }
    },
    createPromotion: async (req, res) => {
        try {
            const result = await promotion.create(req.body);
            res.status(201).json({ message: `A promoção ${result._doc.name} foi criada com sucesso` });
        } catch (err) {
            res.status(500).json({ message: `Não foi possível criar a promoção ${req.body.name}` });
        }
    },
};