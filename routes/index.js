const UserController = require('../controller/UserController')
const router = require('express').Router()


router.get("/home", UserController.Home)
router.get("/register", UserController.registerForm)
router.post("/register", UserController.postRegister)
router.get("/login", UserController.loginForm)
router.get("/home/:productId/delete", UserController.postDelete)
router.get("/add", UserController.postDelete)

module.exports = router