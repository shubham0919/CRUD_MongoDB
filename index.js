const express = require('express');

const port = 1900;

const app = express();

const path = require('path');

app.use(express.urlencoded());

const mongoose = require('./config/mongoose');

const admintbl = require('./model/admintbl');

app.use('/upload',express.static(path.join("upload")));

app.set('view engine','ejs');

app.get('/',(req,res)=>{
    return res.render('index'); 
});

app.post('/insertdata',(req,res)=>{
    
    admintbl.uploadedAvtar(req,res,(err)=>{
        if(err)
        {
            console.log("File Not Uploaded");
            return false;
        }

        if(req.file)
        {
            let bookimg = admintbl.uploadPath+"/"+req.file.filename;
            admintbl.create({
                bookname : req.body.bookname,
                bookprice : req.body.bookprice,
                bookpages : req.body.bookpages,
                bookauthor : req.body.bookauthor,
                bookimg : bookimg
            },(err)=>{
                if(err)
                {
                    console.log("Data Not Insert");
                    return false;
                }
                console.log("Data Insert Sucessfully");
                return res.redirect('/');
            });
        }


    });

    
});

app.get('/viewdata',(req,res)=>{
    admintbl.find({},(err,data)=>{
        if(err){
            console.log("Data Not Found");
            return false;
        }
        return res.render('view',{
            library : data
        });
    });
});

app.get('/deletedata/:id',(req,res)=>{
    let did = req.params.id;
    admintbl.findByIdAndDelete(did,(err)=>{
        if(err)
        {
            console.log("Book Not Found");
            return false;
        }
        console.log("Book Delete Sucessfully");
        return res.redirect('back');
    });
});

app.get('/updatedata/:id',(req,res)=>{
    let uid = req.params.id;
    admintbl.findById(uid,(err,singledata)=>{
        if(err)
        {
            console.log("Book Not Found");
            return false;
        }
        console.log("Book Update Sucessfully");
        return res.render('edit',{
            single : singledata
        });
    });
});

app.post('/editdata',(req,res)=>{
    let edit_id = req.body.edit_id;
    
    
    admintbl.findByIdAndUpdate(edit_id,{
        bookname : req.body.bookname,
        bookprice : req.body.bookprice,
        bookpages : req.body.bookpages,
        bookauthor : req.body.bookauthor
    },(err,editdata)=>{
        if(err)
        {
            console.log("Book Not Edit");
            return false;
        }
        console.log("Book Update Sucessfully");
        return res.redirect('/viewData');
    });
});


app.listen(port,(err)=>{
    if(err)
    {
        console.log("Serer Not Start");
        return false;
    }
    console.log("Server Start In This Port : - "+port);
});