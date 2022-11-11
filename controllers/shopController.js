const User = require('../models/User')
const Role = require('../models/Role')
const {validationResult} = require('express-validator')
const ShoppingList = require('../models/ShoppingList')
const Item = require('../models/Item')

class shopController {
    async create(req, res) {
        try {
            const {owner, name, created, items} = req.body
            const shoppingList = new ShoppingList({owner, name, created});
            await shoppingList.save()

            return res.json({message: 'ShoppingList was created successfully'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Something error'})
        }
    }

    async getAll(req, res) {
        try {
            const lists = await ShoppingList.find()
            res.json(lists)

        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Shopping list is not exists'})
        }
    }

    async getOne(req, res) {
        let name = req.body.name;
        try {
            const item = await ShoppingList.findOne({"name": name}).exec();
            if (item === null) {
                res.json({message: 'Shopping list is not exists'})
            } else {
                res.json(item)
            }
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Shopping list is not exists'})
        }
    }

    async delete(req, res) {
        let name = req.body.name;
        try {
            await ShoppingList.findOneAndDelete({"name": name});
            res.json({message: 'Shopping List was deleted'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Shopping list is not exists'})
        }
    }
}

module.exports = new shopController()