const User = require('../models/User')
const Role = require('../models/Role')
const {validationResult} = require('express-validator')
const ShoppingList = require('../models/ShoppingList')
const Item = require('../models/Item')

class shopController {

    async create(req, res) {
        try {
            const {owner, name, created, items} = req.body
            const shoppingList = new ShoppingList({owner, name, created, items});
            await shoppingList.save()
            return res.json({message: 'ShoppingList was created successfully'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Vy už mate nakupný seznam'})
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
        let id = req.body.id;
        const item = await ShoppingList.findOne({"id": id}).exec();
        if (item === null) {
            res.json({message: 'Shopping list is not exists'})
        } else {
            console.log(e)
            res.json(item)
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

    //push item to list
    async update(req, res) {
        let id = req.body.id;
        console.log(req.body)

        try {
            const list = await ShoppingList.findOne({"id": id}).exec();
            if (list === null) {
                res.json({message: 'list is not exists'})
            } else {
                await ShoppingList.findOneAndUpdate({"id": id}, {
                    $push: {
                        items: {
                            "value": req.body.value
                        }
                    }
                })
                res.json({message: 'New item has been added'})
            }
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Something error'})
        }
    }

    //delete item from list
    async deleteItem(req, res) {
        let id = req.body.id;
        console.log(req.body)

        try {
            const list = await ShoppingList.findOne({"id": id}).exec();
            if (list === null) {
                res.json({message: 'list is not exists'})
            } else {
                await ShoppingList.findOneAndUpdate({"id": id}, {
                    $pull: {
                        items: {
                            "value": req.body.value
                        }
                    }
                })
                res.json({message: 'Item has been deleted from shoppingList'})
            }
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Something error'})
        }
    }
}

module.exports = new shopController()