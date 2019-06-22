var express= require('express')
var path = require('path')
var Mongoose= require('mongoose') //1st
var UserController = require('./usercontoller')
var ProductController =  require('./productcontroller')
var HotelController = require('./hotelcontroller')
var BodyParser = require('body-parser');
var Cors=require('cors')

const PORT=process.env.PORT || 7000 
const MONGOURL= "mongodb+srv://sarthak:1234@cluster0-etlj7.mongodb.net/coerproject?retryWrites=true&w=majority" // "mongodb://test:test1234@ds117729.mlab.com:17729/coerproject"    //2nd

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
server.use(express.static(__dirname + '/dist/intro'));

    server.get('/', function(req,res){
        res.sendFile('./dist/intro/index.html')
    })

 server.post('/api/signup',UserController.signup)
 server.post('/api/login',UserController.login)
 server.post('/api/addproduct',ProductController.addproduct)
 server.get('/api/allproducts',ProductController.allproducts) 
 server.post('/api/addhotel',HotelController.addhotel)
 server.get('/api/allhotel',HotelController.allhotel)
 server.get('/api/allusers',UserController.allusers)
 server.post('/api/forgotpassword',UserController.forgotpassword)
 server.post('/api/deleteaccount',UserController.deleteaccount)
server.get('/api/product/:id',ProductController.getProduct)

server.get('/*', function(req,res) {
    
    res.sendFile(path.join(__dirname+'/dist/frontend/index.html'));
    });