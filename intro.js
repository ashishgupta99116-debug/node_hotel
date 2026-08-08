var fs = require('fs') // to add file system library in this file (after install)
var os = require('os') 

var user = os.userInfo() ; // userInfo is a function contain by os which gives information by user 
console.log(user)
console.log(user.username)

fs.appendFile('greeting.txt' , "Hi " + user.username + '\n' ,
     ()=> console.log("file created"))

// how to link two files

const notes = require('./notes.js')
// how to access var , function etc from other files

var age = notes.age ;
var add = notes.addnumber(age, 10) ;
console.log(age) ;
console.log(add) ;

var _ = require('lodash') ; // "_" var name for lodash

var data = ["person" , "person" , 1, 2, 1 ,2  , "name"] ;
var filter = _.uniq(data); // delete duplicate element
console.log(filter) ;

console.log(_.isString("person"))


// how to convert json data to object and vice versa 

const jsonString = '{"name": "ashish" , "age": 20 , "city": "delhi"}' ;
const jsonobject = JSON.parse(jsonString) ;
console.log(jsonobject) ;
console.log(typeof jsonobject)


const object = {
    name : "alice", 
    age : 20,
}

const jsonstring = JSON.stringify(object);
console.log(jsonstring)
console.log(typeof jsonstring);
