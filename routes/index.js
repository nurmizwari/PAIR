const Controller = require('../controller/productController')
const UserController = require('../controller/UserController')
const ProductController = require('../controller/ProductController')
const router = require('express').Router()



 //

 
router.get('/', ProductController.landingPage) 
router.get("/register", UserController.registerForm)
router.post("/register", UserController.postRegister)



router.get("/login",UserController.getForm)
router.post("/login",UserController.loginForm)

router.get('/logout',UserController.getLogOut)








router.use(function(req, res, next){
    console.log(req.session)
    // console.log('Time:', Date.now())
    // next()

    if(!req.session.userId){
        const error = 'Please Login First'
        res.redirect(`/login?error=${error}`)
    }else{
        next()
        // kalau ada session bebas mau masuk kemana
    }
  })


router.get("/home", UserController.Home)
  
router.get("/home/:productId/delete", UserController.postDelete)
router.get('/home/:productId/add',UserController.addStock)
//   router.get("/",UserController.home)
  // route home
router.get('/home/add',ProductController.new)
router.post('/home/add',ProductController.add)


module.exports = router