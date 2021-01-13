const express = require('express');
const path = require('path');

const router = express.Router();

router.post('/', (req, res, next) => {
    try{
        // const {id, passswd} = req.body;
        // if(id){
        //     res.render('personal', {user: id});
        // }
        // else{
        //     res.redirect('/personal/?error="incorrect password');
        // }
    }
    catch(err){
        console.error(err);
        next(err);
    }
})