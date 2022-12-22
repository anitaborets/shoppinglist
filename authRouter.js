const Router = require('express')
const router = new Router()
const controller = require('./controllers/authController')
const{check} = require('express-validator')
const authMiddleWare = require('./middlewares/authMiddleWare')
const roleMiddleWare = require('./middlewares/roleMiddleWare')
const shopController = require("./controllers/shopController");
const itemController = require("./controllers/itemController");

router.post('/registration',[check('username',"Name of user is empty").notEmpty(),
check('password',"Password must be from 4 to 10 symbols").isLength({min:4,max:10})],controller.registration)
router.post('/login',controller.login)
router.get('/users',roleMiddleWare(['ADMIN']),controller.getUsers)
router.post('/roles',controller.roles)

//shopList as document with items
router.post('/create',roleMiddleWare(['ADMIN']), shopController.create)
router.get('/get',shopController.getAll)
router.get('/get/:name',shopController.getOne);
router.delete('/delete',roleMiddleWare(['ADMIN']), shopController.delete);
router.post('/update',shopController.update);
router.post('/item/delete',shopController.deleteItem);




//items
router.post('/item/create', itemController.createItem);
router.get('/item/get',itemController.getAll);
router.get('/item/get/:name',itemController.getOne);
router.post('/item/update',itemController.update);

module.exports = router