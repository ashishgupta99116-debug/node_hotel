const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : true  // mandatory to give their name
    },
    age : {
        type : Number 
    },
    work : {
        type : String ,
        enum : ["waiter" , "manager" ,"chef" ] // if anyone write owner so it doenot except this 
    },
    // email : {
    //     type : string ,
    //     required : true  , 
    //     unique : true 
    // },
    // phone_number : {
    //     type : number , 
    //     required : true 
    // },
    // address : {
    //     type : string ,
    // },
    // salary : {
    //     type : number 
    // }
})

// create person schema

const person = mongoose.model('Person' , personSchema) ;
module.exports = person ;