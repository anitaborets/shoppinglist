const {Schema, model} = require('mongoose')
const Item = new Schema({
    list:{type: Schema.Types.ObjectId, ref: 'ShoppingList'},
    value: {type:String,required:true},
    quantity: {type:Number,min:1,default:1},
    isReady:{type:Boolean,default:false}
})

const ShoppingList = new Schema({
    name: {type: String, required: true, default: "New shopping list"},
    owner: [{type: String, required: true, ref: 'User', default: 'user'}],
    created: {type: Date, default: Date.now},
    items: [Item]
        //{ type:Object}]
})

module.exports = model('ShoppingList', ShoppingList)