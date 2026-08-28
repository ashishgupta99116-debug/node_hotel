const passport = require("passport") ;
const LocalStrategy = require("passport-local").Strategy ;
const Person = require('./models/Person.js')

passport.use(new LocalStrategy(async (USERNAME, PASSWORD , done) =>{
    try{
        console.log('Received Credentials : ' , USERNAME , PASSWORD) ;
        const user = await Person.findOne({username : USERNAME}) ;

        if(!user) {
             console.log("❌ User not found");
            return done(null , false , {message : 'incorrect username'}) ;
        }

        console.log("✅ User found:", user);

        const ispasswordmatch = await  user.comparePassword(PASSWORD) ;

        if(ispasswordmatch){
            console.log(" Password correct");
            console.log("✅ Login successful");
            return done(null , user) ;
        }else{
            console.log("Incorrect Password")
            done(null , false , {meassge : "incorrect password"}) ;
        }
         
    }
    catch(err){
        return done(err) ;
    }
}))

module.exports = passport ;