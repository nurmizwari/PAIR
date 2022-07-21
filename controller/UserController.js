const { Store, User, Product } = require('../models');
const bcrypt = require("bcryptjs")
const { nodeMail } = require('../helper/nodemailer')
const { Op } = require('sequelize')

class UserController {


    //
    static Home(req, res) {
        let option = { include: Store, order: [["name", "asc"]] }
        let role = req.session.role


        let name = req.query.name
        if (name) {
            option['where'] = { name: { [Op.iLike]: `%${name}%` } }
        }
        Product.findAll(option)
            .then((result) => {
                res.render('home', { result, name, role })
            })
            .catch((err) => {
                res.send(err)
            });
    }

    static addStock(req, res) {
        let id = req.params.productId
        // console.log(id);
        // console.log(req.params);
        Product.increment({
            stock: 1
        }, { where: { id } })
            .then(() => {
                res.redirect('/home')
            }).catch((err) => {
                res.send(err)
            });
    }


    static registerForm(req, res) {
        let errors = req.query.errors

        Store.findAll()
            .then((result) => {
                // res.send(result)    

                res.render('register', { result, errors })
            })
            .catch((err) => {
                res.send(err)
            });
    }

    static postRegister(req, res) {
        // cretae user baru yang isinya username password role

        const { email, password, role, StoreId, userName } = req.body

        // res.send(req.body)
        User.create({ email, password, role, StoreId, userName })
            .then((newUser) => {
                nodeMail(email)
                res.redirect('/login')
            }).catch((err) => {
                const errors = err.errors
                let temp = []
                errors.map(e => {
                    temp.push(e.message)
                })
                let errorList = temp.join('%')
                res.redirect(`/register?errors=${errorList}`)
            });
    }


    static getForm(req, res) {
        const { error } = req.query
        res.render('login', { error })

    }

    static loginForm(req, res) {
        // apakah username sama password yang diinput itu username nya ada?
        // 1.findOne user dari username
        // 2 kalo user ada compare plain password apakah sama dengan hash password di db
        // 2.a kalu user gak ada gak boleh masuk ke home , keluar error
        // 3 kalo gak sama passwordnya gak boleh masuk ke home , keluar error
        // 4 kalo pw sesuai maaka redirect ke home

        const { userName, password } = req.body
        if (userName.length == 0 || password.length == 0) {
            const error = 'Username or Password cannot be empty'
            return res.redirect(`/login?error=${error}`)
        }
        User.findOne({ where: { userName } })
            .then(user => {
                if (user) {
                    const isValidPassword = bcrypt.compareSync(password, user.password) // true or false
                    if (isValidPassword) {
                        req.session.userId = user.id  // SET SESSION DI CONTROLLER LOGIN
                        req.session.role = user.role
                        return res.redirect('/home')
                    } else {
                        const error = 'invalid username or password'
                        return res.redirect(`/login?error=${error}`)
                    }
                } else {
                    const error = 'invalid username or password'
                    return res.redirect(`/login?error=${error}`)
                }
            }).catch((err) => {
                res.send(err)
            });
    }

    static getLogOut(req, res) {
        req.session.destroy((err) => {
            if (err) res.send(err)
            else {
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


    static landingPage(req, res) {
        res.render('landingPage')
    }
}
module.exports = UserController