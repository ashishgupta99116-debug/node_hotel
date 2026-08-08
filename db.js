const mongoose = require('mongoose') 

const mongoURL = "mongodb://127.0.0.1:27017/hotels"  // hotel basically mera database ka name hai(kuch bhi de sakhta hai name)


mongoose.connect(mongoURL) ;

const db = mongoose.connection;

db.on('connected', ()=>{
    console.log('connected to MongoDB server');
});

db.on('error', (err)=>{
    console.error('MongoDB server connection error');
});

// db.on('disconnected', ()=>{
//     console.log('MongoDB server disconnected');
// });
process.on('SIGINT', async () => {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
    process.exit(0);
});

module.exports = db ;
                                       