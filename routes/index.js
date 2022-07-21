const UserController = require('../controller/UserController')
const router = require('express').Router()



//


router.get("/register", UserController.registerForm)
router.post("/register", UserController.postRegister)



router.get("/login", UserController.getForm)
router.post("/login", UserController.loginForm)

router.get('/logout', UserController.getLogOut)
router.get('/', UserController.landingPage)








router.use(function (req, res, next) {
  console.log(req.session)
  // console.log('Time:', Date.now())
  // next()

  if (!req.session.userId) {
    const error = 'Please Login First'
    res.redirect(`/login?error=${error}`)
  } else {
    next()
    // kalau ada session bebas mau masuk kemana
  }
})

router.get("/home", UserController.Home)

router.get("/home/:productId/delete", UserController.postDelete)
//   router.get("/",UserController.home)
// route home



module.exports = router