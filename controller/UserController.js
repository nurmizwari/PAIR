const { Store,User } = require('../models');



class UserController{

    static registerForm(req, res){
        Store.findAll().then((result) => {  
            // res.send(result)    
            res.render('register',{result})
        }).catch((err) => {
            res.send(err)
        });
    }
    static postRegister(req, res){
        // cretae user baru yang isinya username password role
        const {email,password,role,userName} = req.body
        // console.log(req.body);
        // res.send(req.body)
        User.create({email,password,role,userName})
        .then((newUser) => {
            res.redirect('/login')
        }).catch((err) => {
            res.send(err)
        });       
    }
    static loginForm(req, res){
        res.render('login')
    }
}
module.exports = UserController