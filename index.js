const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000
const url = 'mongodb://localhost:27017/'
const authRouter = require('./authRouter')
const app = express()
app.use(express.json())
app.use("/auth",authRouter)


const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://root:root@cluster0.xk7wf6t.mongodb.net/shoppingList?retryWrites=true&w=majority')
        app.listen(PORT,()=> console.log('server started...' ))
    }
    catch (e){
        console.log(e)
    }
}
start()


module.exports = app;