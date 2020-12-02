const express = require('express');
const router = express.Router();

router.get('/',(request,response)=>{
    response.send('html page');
});

module.exports = router;