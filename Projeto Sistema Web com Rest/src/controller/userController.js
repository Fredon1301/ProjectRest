const user = require('../models/User');
const jwtService = require('jsonwebtoken');

module.exports = {
    getUsers: (req, res) => {
        user.find({}).select(["-__v", "-_id"]).then((result) => {
            res.status(200).json(result);
        }).catch(() => {
            res.status(500).json({ message: "Não foi possível recuperar os usuários" })
        });
    },
    deleteUser: async (req, res) => {
        try {
            const result = await user.deleteOne({ cpf: req.body.cpf });
            if (result.deletedCount > 0) {
                res.status(200).json({ message: "Usuario removido com sucesso" });
            } else {
                res.status(404).json({ message: "Usuario não encontrado para remoção" });
            }
        } catch (err) {
            res.status(500).json({ message: "Não foi possível remover o usuario" });
        }
    },
    getUser: async (req, res) => {
        try {
            const result = await user.findOne({ cpf: req.body.cpf });
            if (!result) {
                res.status(404).json({ message: "Usuário não encontrado" });
            } else {
                res.status(200).json(result);
            }
        } catch (err) {
            res.status(500).json({ message: "Não foi possível recuperar o usuário no momento" });
        }
    },
    updateUser: async (req, res) => {
        try {
            const result = await user.updateOne({ cpf: req.body.cpf }, req.body);
            if (result.modifiedCount > 0) {
                res.status(200).json({ message: "Usuário atualizado com sucesso" });
            } else {
                res.status(404).json({ message: "Usuário não encontrado para atualização" })
            }
        } catch (err) {
            res.status(500).json({ message: "Não foi possível atualizar os dados" })
        }
    },
    createUser: async (req, res) => {
        try {
            const result = await user.create(req.body);
            res.status(201).json({ message: `The user ${result._doc.name} was created with sucess` });
        } catch (err) {
            res.status(500).json({ message: `Unable to create user ${req.body.name}` });
        }
    },
    login: async (req, res) => {
        const result = await user.findOne({ email: req.body.email, password: req.body.password })
        if (!result) {
            res.status(401).json({ message: "Credenciais inválidas" });
        } else {
            
            const secret = process.env.SECRET;
            jwtService.sign(req.body, secret, (err, token) => {
                if (err) {
                    res.status(401).json({ message: "Não foi possível autenticar" })
                } else {
                    res.status(201).json({"Access-Token": token})
                }
            });
        }
    }
};
