const mongoose = require('mongoose')
const bcrypt = require("bcrypt") ;
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
    username : {
        type : String ,
        required : true 
    },
    password : {
        type : String ,
        required : true 
    }
})


personSchema.pre('save' , async function(){
    const person = this;

    // hash the password only if it has been modified or it is new

    if(!person.isModified('password')) return ;

    try{
        // hash password generation 
        const salt = await bcrypt.genSalt(10) ;

        // hash password

        const hashpassword = await bcrypt.hash(person.password , salt) ;
        
        // overwrite the plain password with hash password

        person.password = hashpassword ;
        
    }catch(err){
        throw err ;
    }
})

personSchema.methods.comparePassword = async function(candidatepassword){
    try{
        
        // use bcrypt to compare the provided password with the hashed password

        const isMatch = await bcrypt.compare(candidatepassword , this.password) ;
        return isMatch ; 
    }catch(err){
        throw err ;
    }
}
// create person schema

const person = mongoose.model('Person' , personSchema) ;
module.exports = person ;