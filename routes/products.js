var express = require('express');
var router = express.Router();
var db = require('../db')

//Diaplay all data from Database
router.get('/', function(req, res, next) {
    var showQuery = 'select * from product';

    db.query(showQuery,(err,data,next)=>{
        if(err) throw err;
        console.log(data);
        res.render('products', { title: 'PRODUCT DATA', products : data});
    })
});

router.get('/insertData', (req, res, next)=> {
    res.render('insertForm', { title: 'PRODUCT FORM' })
});

//Insert records into database
router.post('/create', (req, res, next)=> {
    var Name = req.body.Name;
    var Weight = req.body.Weight;
    var Price = req.body.Price;
    var Quantity = req.body.Quantity;

    var sql = `insert into product (Name,Weight,Price,Quantity) values ("${Name}","${Weight}",${Price},"${Quantity}")`;
    db.query(sql,(err,data)=>{
        if(err) throw err;
        console.log(data)
        res.redirect('/products')
    });   
});

//Update Record from database
router.get('/updateData/:ID', (req, res, next)=> {
    var ID = req.params.ID;
    var sql = `select * from product where ID=${ID}`;
    db.query(sql,(err,data,fields)=>{
        res.render('updateForm', { title: 'PRODUCT FORM', product:data[0]})  
    })
    
});

router.post('/update/:ID', (req, res, next)=> {

    var Name = req.body.Name;
    var Weight = req.body.Weight;
    var Price = req.body.Price;
    var Quantity = req.body.Quantity;

    var ID = req.params.ID;

    var sql = `update product set Name='${Name}',Weight='${Weight}',Price='${Price}',Quantity='${Quantity}' where ID=${ID}`;
    db.query(sql,(err,data)=>{
        if(err) throw err;
        console.log(data)
        res.redirect('/products')
    });   
});

//Delete selected data
router.get('/deleteData/:ID',(req,res,next)=>{
    var ID = req.params.ID;
    var sql = `delete from product where ID=${ID}`;
    db.query(sql,(err,data)=>{
        if(err) throw err;
        res.redirect('/products')
    })
})


// router.get('/', function(req, res, next) {
//     var showQuery = 'select * from product where ID=1';

//     db.query(showQuery,(err,data,next)=>{
//         if(err) throw err;
//         console.log(data[0]);
//         res.render('products', { title: 'PRODUCT DATA', products : data});
//     })
// });

module.exports = router;
