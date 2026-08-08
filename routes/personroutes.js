const express = require('express') ;
const router= express.Router() ;

const Person = require('./../models/Person') ;

router.post('/' , async (req , res) =>{

    try{
        const data = req.body // assuming the request body constain the person data 

        // create a new person document using the mongoose model
        const newPerson = new Person(data) ;

        // save the new person data to the database
        const response = await newPerson.save() ;
        console.log('data saved') ;
        res.status(200).json(response) ;
    }
    catch(err){
        console.log(err) ;
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


module.exports = router ;