const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const img_path = path.join('/upload/img');

const AdminSchema = mongoose.Schema({
    bookname : {
        type : String,
        required : true
    },
    bookprice : {
        type : Number,
        required : true
    },
    bookpages : {
        type : Number,
        required : true
    },
    bookauthor : {
        type : String,
        required : true
    },
    bookimg : {
        type : String,
        required : true
    }
});


// For img Store
const userstorage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,path.join(__dirname,'..',img_path));
    },
    filename : (req,file,cb)=>{
        cb(null,file.fieldname+"-"+Date.now());
    }
})

AdminSchema.statics.uploadedAvtar = multer({storage : userstorage}).single('bookimg');
AdminSchema.statics.uploadPath = img_path;

const admin = mongoose.model('AdminSchema',AdminSchema);
module.exports = admin;