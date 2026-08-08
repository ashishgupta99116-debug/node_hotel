const mongoose = require('mongoose') ;

const menuitemSchema = new mongoose.Schema({
    name : {
        type : String , 
        required : true 
    },
    price : {
        type : Number ,
        required : true ,
        default : 5  
    },
    taste : {
        type : String ,
        enum : ['sweet' , 'sour' ,'spicy'] ,
        required : true 
    },
    is_drink : {
        type : Boolean ,
        default : false 
    },
    num_sales : {
        type : Number ,
        default : 0 
    }
})

const menu = mongoose.model('MenuItems' , menuitemSchema) ;

module.exports = menu ;