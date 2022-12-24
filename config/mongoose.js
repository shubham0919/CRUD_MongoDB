const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/crud');

const db = mongoose.connection;

db.on('err',console.error.bind(console.log("DB is Not Connect")));

db.once('open',(err)=>{
    if(err)
    {
        console.log("DB Not Satrt");
        return false;
    }
    console.log("DB Start Sucessfullly");
});

module.exports = db;