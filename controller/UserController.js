const { Store,User } = require('../models');
const bcrypt = require('bcryptjs')



class UserController{

    static home(req, res){
        res.render('home')
    }

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
        const {email,password,role,StoreId,userName} = req.body
        console.log(req.body);
        // res.send(req.body)
        User.create({email,password,role,StoreId,userName})
        .then((newUser) => {
            res.redirect('/login')
        }).catch((err) => {
            res.send(err)
        });       
    }

    
    static getForm(req, res){       
        res.render('login')
        
    }

    static loginForm(req, res){
        // apakah username sama password    yang diinput itu username nya ada?
        // 1.findOne user dari username
        //2 kalo user ada compare plain password apakah sama dengan hash password di db
        // 3 kalo gak sama passwordnya gak boleh masuk ke home , keluar error
         // 4 kalo pw sesuai maaka redirect ke home

         const {userName, password} = req.body
         User.findOne({where:{userName}})          
         .then(user => { 
            if (user) {
                const isValidPassword = bcrypt.compareSync(password, user.password) // true or false
                console.log(isValidPassword,'<<<<');
                if (isValidPassword) {
                    console.log(isValidPassword);
                    return res.redirect('/')
                } else{
                    const error = 'invalid username or password'
                    console.log(error);
                    return res.redirect('/login')
                }
            }            
         }).catch((err) => {
            res.send(err)
         });
    }
}
module.exports = UserController