const express = require('express');
const router = express.Router();
const authRouter = require('./authRouter.js');
const homeRouter = require('./homeRouter.js');
const registRouter = require('./registRouter');
const adminRouter = require('./adminRouter.js');

router.use('/home',homeRouter);
router.use('/auth',authRouter);
router.use('/regist',registRouter);
router.use('/admin',adminRouter);

module.exports = router;