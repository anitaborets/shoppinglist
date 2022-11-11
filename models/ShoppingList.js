const {Schema, model} = require('mongoose')

const ShoppingList = new Schema({
    name: {type: String, required: true, default: "New shopping list"},
    owner: [{type: String, required: true, ref: 'User', default: 'user'}],
    created: {type: Date, default: Date.now},
    items: [
        { type:Object}
    ]
})

module.exports = model('ShoppingList', ShoppingList)