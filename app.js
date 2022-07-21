const express = require('express')
const router = require('./routes')
const app = express()
const session = require('express-session')
const port = 3000 || process.env.PORT




app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
 
// SET SESION //
app.use(session({
  secret: 'rahasia', // harus ada // untuk ngamankan session kita
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,          // https
    sameSite:true }  // untuk security dari serangan csrf attack
}))

app.use(router)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})