const express = require('express');
const router = express.Router();
const authRouter = require('./authRouter.js');
const htmlRouter = require('./htmlRouter.js');

router.use('/auth',authRouter);
router.use('/web',htmlRouter);

module.exports = router;