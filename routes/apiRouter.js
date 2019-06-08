const ApiRouter = require('express').Router();

const userRouter = require('./userRouter');

ApiRouter.use('/user', userRouter);
ApiRouter.use('/order', orderRouter);


module.exports = ApiRouter;