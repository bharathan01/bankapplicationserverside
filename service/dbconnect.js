// importing mongooe 
const mongoose = require("mongoose")

//state connection string 

mongoose.connect("mongodb://127.0.0.1:27017/bankServer",{useNewUrlParser:true})

//model/schema creation-difing the key and its type in the database

const User = mongoose.model('User',{
    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transation:[]

    
})
//exporting user methode 
module.exports = {
    User 
}
