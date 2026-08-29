const express = require('express') ;
const router= express.Router() ;

const Person = require('./../models/Person') ;
const {jwtAuthMiddleware , generatetoken} = require('./../jwt') ;

router.post('/signup' , async (req , res) =>{

    try{
        const data = req.body // assuming the request body constain the person data 

        // create a new person document using the mongoose model
        const newPerson = new Person(data) ;

        // save the new person data to the database
        const response = await newPerson.save() ;
        console.log('data saved') ;

        const payload = {
            id : response.id ,
            username : response.username
        }

        console.log(payload);
        const token = generatetoken(payload) ;
        console.log("Token id : " , token) ;
        res.status(200).json({response : response , token : token}) ;
    }
    catch(err){
        console.log(err) ;
        res.status(500).json({error : 'Internal server error'}) ;
    }
})


// login route

router.post('/login' , async ( req, res) => {
    try{
        // extract the username and password
        const {username , password} = req.body ;

        // find the user by username 
        const user = await Person.findOne({username : username}) ;

        // if user doen not exist or password is incorrect
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error : 'Invalid username or password'}) ;
        }


        const payload = {
            id: user.id ,
            username: user.username 
        }
        const token = generatetoken(payload) ;
        res.json({token}) ;
    }catch(err){
        console.error(err) ;
        res.status(500).json({error : 'Internal server error'}) ;
    }
    
})

// Get method to get the person data 
router.get('/' , async(req, res) => {
    try{
        const data = await Person.find() ;
        console.log('person data') ;
        res.status(200).json(data)
    }catch(err){
        console.log(err) ;
        res.status(500).json({error : 'Internal server error'}) ;
    }
})

// for profile
router.get('/profile' ,jwtAuthMiddleware , async (req , res) => {
    try{
        const userData = req.user  ;
        console.log("User data: " , userData) ;

        const userId = userData.id ;
        const user = await Person.findById(userId) ;

        res.status(200).json({user}) ;
    }catch(err){
        console.error(err) ;
        res.status(500).json({error : 'INTERNAL SERVER ERROR'}) ;
    }
})

module.exports = router ;