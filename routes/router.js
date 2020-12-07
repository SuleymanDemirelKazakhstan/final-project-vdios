const express = require('express');
const router = express.Router();
const authRouter = require('./authRouter.js');
const htmlRouter = require('./htmlRouter.js');
const registRouter = require('./registRouter');
const adminRouter = require('./adminRouter.js')

router.use('/shop',htmlRouter);
router.use('/auth',authRouter);
router.use('/regist',registRouter);
router.use('/admin',adminRouter);

module.exports = router;