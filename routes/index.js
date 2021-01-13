const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res, next) => {
    try{
        res.sendFile(path.join(__dirname, '../views/index.html'));
    }
    catch(err){
        console.log(err);
    }
});

module.exports = router;