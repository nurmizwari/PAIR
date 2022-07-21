const UserController = require('../controller/UserController')
const router = require('express').Router()


router.get("/",UserController.home)
router.get("/register", UserController.registerForm)
router.post("/register", UserController.postRegister)
router.get("/login",UserController.getForm)
router.post("/login",UserController.loginForm)

module.exports = router