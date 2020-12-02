const { json } = require('body-parser');
const express = require('express');
const router = express.Router();

router.get('/',(request,response)=>{
    response.send('auth page');
});

module.exports = router;