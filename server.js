var express= require('express')

var Mongoose= require('mongoose') //1st
var UserController = require('./usercontoller')
var ProductController =  require('./productcontroller')
var HotelController = require('./hotelcontroller')
var BodyParser = require('body-parser');
var Cors=require('cors')

const PORT=process.env.PORT || 7000 
const MONGOURL="mongodb://test:test1234@ds117729.mlab.com:17729/coerproject"      //2nd

var server= express()

server.use(BodyParser.json())
server.use(Cors())

server.listen(PORT, function()
{
    console.log('Server is running at',PORT)
    Mongoose.connect(MONGOURL,function(error){ //3rd
     console.log("Error in Connecting to MOngoDB",error);
    })
})

 server.post('/signup',UserController.signup)
 server.post('/login',UserController.login)
 server.post('/addproduct',ProductController.addproduct)
 server.get('/allproducts',ProductController.allproducts) 
 server.post('/addhotel',HotelController.addhotel)
 server.get('/allhotel',HotelController.allhotel)
 server.get('/allusers',UserController.allusers)
 server.post('/forgotpassword',UserController.forgotpassword)
 server.post('/deleteaccount',UserController.deleteaccount)
server.get('/product/:id',ProductController.getProduct)
