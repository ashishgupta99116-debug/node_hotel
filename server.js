const express = require('express') 
const app = express() ; // server jis building ma rahta hai 
const db = require('./db');


const bodyParser = require("body-parser") ;
//express contain bodyparser lib also
app.use(express.json()) ; // store data in req.body

app.get('/' , function(req , res){ // get  function is to read the information only not doing anything with information
    res.send('welcome to my hotel . how can i help you ?') // req means request and res means response
})



const personroutes = require('./routes/personroutes')
const menuroutes = require('./routes/menuroutes') ;
app.use('/menu' , menuroutes) ;
app.use('/person' , personroutes) ;




// for new mongoose version we use asyn and await (data ko aana ma bhi time lagta hai)


// app.post('/person' , (req, res) =>{

//     const data = req.body // assuming the request body constain the person data 

//     // create a new person document using the mongoose model
//     const newPerson = new Person(data) ;

//     // save the new person data to the database

//     newPerson.save((error , savedPerson) =>{
        
//         if(error){
//             console.log('Error saving person' , error) ;
//             res.status(500).json({error : 'Internet server error'}) ;
//         }
//         else{
//             console.log('data saved successfully')
//             res.status(200).json(savedPerson) ;
//         }
//     })
// })

























// app.get('/idli' , function(req , res){ // get  function is to read the information only not doing anything with information
//     //res.send('sure sir') // req means request and res means response
//     var customer_order = {
//         item_name : "rava idli" ,
//         size : "10 medium",
//         is_sambhar : false ,
//         is_chutney : true 
//     }

//     res.send("sure sir , this is your order : " + JSON.stringify(customer_order))
// })
// app.post('/items' , (req , res) =>{
//   res.send('data is saved')
// })
// app.get('/sambhar' , function(req , res){ // get  function is to read the information only not doing anything with information
//     res.send('i would love to serve sambhar') // req means request and res means response
// })
app.listen(3000 , (eq, res)=>{
    console.log("listening on port 3000")
}) // room number of server (jaha vo rahta hai)


// data directory
// C:\Program Files\MongoDB\Server\8.3\data\

// log directory
// C:\Program Files\MongoDB\Server\8.3\log\


// C:\Users\ASHISH\AppData\Local\Programs\mongosh\



// const express = require("express");
// const mongoose = require("mongoose");

// const app = express();

// mongoose.connect("mongodb://127.0.0.1:27017/mydatabase")
// .then(() => {
//     console.log("✅ MongoDB Connected");
// })
// .catch((err) => {
//     console.log(err);
// });

// app.get("/", (req, res) => {
//     res.send("Hello MongoDB");
// });

// app.listen(3000, () => {
//     console.log("Server running on port 3000");
// });


// const express = require("express");
// const mongoose = require("mongoose");

// const app = express();

// mongoose
//   .connect("mongodb://127.0.0.1:27017/myDatabase")
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.log(err));

// app.get("/", (req, res) => {
//   res.send("MongoDB Connected Successfully");
// });

// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });