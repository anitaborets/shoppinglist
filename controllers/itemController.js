const ShoppingList = require('../models/ShoppingList')
const Item = require('../models/Item')

class itemController {

    async createItem(req, res) {
        try {
            const {list, value, quantity, isReady} = req.body
            const item = new Item({list, value, quantity, isReady});
            await item.save()
            return res.json({message: 'Item was created successfully'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Something error'})
        }
    }

    async getAll(req, res) {
        let list = req.body.list;
        try {
            const items = await Item.find({"list": list})
            res.json(items)

        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Something error'})
        }
    }

    async getOne(req, res) {
        let value = req.body.value;
        try {
            const item = await Item.findOne({"value": value}).exec();
            if (item === null) {
                res.json({message: 'item is not exists'})
            } else {
                res.json(item)
            }
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Something error'})
        }
    }

    async delete(req, res) {
        let list = req.body.list;
        let value = req.body.value;
        try {
            const item = await Item.findOne({"value": value}, {"list": list}).exec();
            if (item === null) {
                res.json({message: 'item is not exists'})
            } else {
                await Item.findOneAndDelete({"value": value});
                res.json({message: 'item was deleted'})
            }
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Something error'})
        }
    }

    async update(req, res) {
        let list = req.body.list;
        let value = req.body.value;
        let quantity = req.body.quantity;
        let isReady = req.body.isReady;
        console.log(req.body)
        try {
            const item = await Item.findOne({"value": value}, {"list": list}).exec();
            if (item === null) {
                res.json({message: 'item is not exists'})
            } else {
                await Item.findOneAndUpdate({"value": value}, {"quantity": quantity, "isReady": isReady})
                res.json({message: 'item was updated'})
            }
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Something error'})
        }
    }
}

module.exports = new itemController()