const express = require('express');
const router = express.Router();
const authRouter = require('./authRouter.js');
const htmlRouter = require('./htmlRouter.js');
const registRouter = require('./registRouter');

router.use('/web',htmlRouter);
router.use('/auth',authRouter);
router.use('/regist',registRouter);


module.exports = router;