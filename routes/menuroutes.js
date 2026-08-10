const express = require('express') ;
const router = express.Router() ;

const menuitem = require('./../models/MenuItems');

router.get('/' , async (req, res)=>{
    try{
        const data = await menuitem.find() ;
        console.log('hotel menu') ;
        res.status(200).json(data) ;
    }
    catch(err){
        console.log(err) ;
        res.status(500).json({error : 'internal server error'}) ;
    }
})
router.post('/' , async (req, res)=>{
    try{
        const data = req.body ;

        const newitem = new menuitem(data) ;

        const response = await newitem.save() ;

        console.log("menu saved") ;
        res.status(200).json(response);
    }catch(err){

        console.log(err) ;
        res.status(500).json({error :  'internal error'})
    }
})


router.get('/:tastetype' , async (req , res) =>{
    try{
        const tastetype = req.params.tastetype ;
        if(tastetype == 'sweet' || tastetype == 'sour' || tastetype == 'spicy'){
            const response = await menuitem.find({taste: tastetype});
            console.log("response fetched");
            res.status(200).json(response) ;
        }
        else{
            res.status(404).json({error : "invalid tastetype"})
        }
    }catch(err){
        console.log(err) ;
        res.status(500).json({error :  'internal error'})
    }
})

router.put('/:id' , async (req, res)=>{
    try{

        const menuid = req.params.id ; // id comes in parameter
        const updatemenudata = req.body ; // updated data comes in json form

        const response = await menuitem.findByIdAndUpdate(menuid , updatemenudata , {
            new: true , // return the updated document
            runValidators : true , // run mongoose validation
        }) ;

        if(!response){
            console.log("no valid menuid");
            res.status(404).json({message : "no valid menuid"}) ;
        }

        console.log("data updated") ;
        res.status(500).json(response) ;

    }catch(err){
        console.log(err) ;
        res.status(500).json({error :  'internal error'})
    }
})


router.delete('/:id' , async (req, res) =>{
    const menuid = req.params.id ;

    const response = await menuitem.findByIdAndDelete(menuid) ;

    if(!response){
        res.status(404).json({message : "no valid menuid"})
    }

    res.status(500).json("data deleted")
})
// comment added for testing purpose


module.exports = router ;