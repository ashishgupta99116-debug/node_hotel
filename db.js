require('dotenv').config() ;
// 🔥 SABSE UPAR: Yeh lines Node.js ko Windows ke kharab DNS bypass karne par force karengi
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); // Google Public DNS 
const mongoose = require('mongoose');

// VS Code ya standard driver ki jagah ye direct string use karein.
// Isme humne family: 4 option add kiya hai jo Node v24 ko forcingly IPv4 resolve karne ko bolega.
const mongoURL = process.env.MONGODB_URL ;

// local url
 //const mongoURL = process.env.LOCAL_MONGODB_URL ;
mongoose.connect(mongoURL, {
    family: 4 // 🔥 YE LINE SABSE IMPORTANT HAI: Yeh Node.js v24 ke DNS query issue ko bypass kar degi
})
.then(() => console.log('Connected to MongoDB Atlas server! 🎉'))
.catch((err) => console.error('Connection check failed:', err.message));

const db = mongoose.connection;

db.on('connected', () => {
    console.log('connected to MongoDB server');
});

db.on('error', (err) => {
    console.error('MongoDB server connection error');
});

process.on('SIGINT', async () => {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
    process.exit(0);
});

module.exports = db;
