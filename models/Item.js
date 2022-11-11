const {Schema,model} = require('mongoose')

const Item = new Schema({
    list:{type: Schema.Types.ObjectId, ref: 'ShoppingList'},
    value: {type:String,required:true},
    quantity: {type:Number,min:1,default:1},
    isReady:{type:Boolean,default:false}
})

module.exports = model('Item',Item)