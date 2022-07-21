const { Store, User, Product } = require('../models');

class ProductController {

    static landingPage(req, res) {
        res.render('landingPage')
    }

    static new(req, res) {
        Store.findAll()
            .then((result) => {
                console.log(result)
                res.render('add', { result })
            }).catch((err) => {
                res.send(err)
            });
    }

    static add(req, res) {
        let { name, stock, StoreId } = req.body
        // console.log(req.body)
        // res.send(req.body)

        Product.create({ name, stock, StoreId })
            .then((result) => {
                res.redirect('/home')
            }).catch((err) => {
                res.send(err)
            });


    }

}

module.exports = ProductController