const { Store, User, Product } = require('../models');




class UserController {


    static Home(req, res) {
        Product.findAll({
            include: Store
        })
            .then((result) => {
                res.render('home', { result })
            })
            .catch((err) => {
                res.send(err)
            });


    }

    static registerForm(req, res) {
        Store.findAll()
            .then((result) => {
                // res.send(result)    
                
                res.render('register', { result })
            })
            .catch((err) => {
                res.send(err)
            });
    }
    static postRegister(req, res) {
        // cretae user baru yang isinya username password role

        const {email,password,role,StoreId,userName} = req.body
       
        // res.send(req.body)
        User.create({email,password,role,StoreId,userName})
        .then((newUser) => {
            res.redirect('/login')
        }).catch((err) => {
            res.send(err)
        });       
    }

    
    static getForm(req, res){   
        const {error} = req.query    
        res.render('login',{error})
        
    }

    static loginForm(req, res){
        // apakah username sama password    yang diinput itu username nya ada?
        // 1.findOne user dari username
        //2 kalo user ada compare plain password apakah sama dengan hash password di db
        // 2.a kalu user gak ada gak boleh masuk ke home , keluar error
        // 3 kalo gak sama passwordnya gak boleh masuk ke home , keluar error
         // 4 kalo pw sesuai maaka redirect ke home

         const {userName, password} = req.body
         User.findOne({where:{userName}})          
         .then(user => { 
            if (user) {
                const isValidPassword = bcrypt.compareSync(password, user.password) // true or false
                if (isValidPassword) {
                   
                    req.session.userId = user.id  // SET SESSION DI CONTROLLER LOGIN
                    return res.redirect('/home')
                } else{
                    const error = 'invalid username or password'
                    return res.redirect(`/login?error=${error}`)
                }
            }else{
                const error = 'invalid username or password'
                return res.redirect(`/login?error=${error}`)
            }         
         }).catch((err) => {
            res.send(err)
         });
    }

    static getLogOut(req, res){
        req.session.destroy((err)=>{
            if(err)res.send(err)
            else{
                res.redirect('/login')
            }
        })
    }

    static postDelete(req, res) {
        let productId = +req.params.productId
        Product.findByPk(productId)
            .then(data => {
                return Product.destroy({ where: { id: productId } })
            })
            .then(data => {
                res.redirect(`/home`)
            })
            .catch(err => res.send(err))


    }
}
module.exports = UserController