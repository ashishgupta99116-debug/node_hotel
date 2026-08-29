require('dotenv').config();

const express = require('express');

const app = express();
const db = require('./db');
app.use(express.json());
const passport = require("./auth.js") ;

// middleware function

// let say mujhe janana hai ke kis kis time par konse-konse request aa rhe hai 

const logRequest = (req , res , next)=>{
    console.log(`${ new Date().toLocaleString() } Request made to : ${ req.originalUrl }`) ;
    next() // next is used because it says that ke ye middleware func run ho gya hai toh next func kar sakhta ho
            // if i not use this toh server karta hi rahta ke kab ye kaam complete hoga 
}

// log request hum use kar sakhta hai har route ka time ko pta karna ka liya 

// to write logRequest for all type of routes , we use 

app.use(logRequest) ;

// authentication - ma check karunga ke jo person enter ho rh hai vo hamara hotel ka hai ke nhi 

app.use(passport.initialize()) ;

const LocalAuthMiddleware = passport.authenticate('local' , {session : false}) ;

app.get('/'  ,(req, res) => {
    res.send('welcome to my hotel. how can i help you?');
});

const personroutes = require('./routes/personroutes');
const menuroutes = require('./routes/menuroutes');

app.use('/menu', menuroutes);
app.use('/person' , personroutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
