const express = require('express');
const boom = require('boom');
const userRouter = require('./user');
const router = express.Router();
const jwtAuth = require('./jwt');
const Result = require('../model/Result')

router.use(jwtAuth);

router.get('/', function (req, res) {
    res.send('欢迎学习')
})

router.use('/user', userRouter)

//处理404请求
router.use((req, res, next) => {
    next(boom.notFound('接口不存在'))
})

router.use((err, req, res, next) => {
    if (err?.name === 'UnauthorizedError') {

        const { status = 401, inner } = err;
    new Result(null, 'Token验证失败', {
        error: status,
        errMsg: inner.message
    }).jwtError(res.status(status))
    } else  {
        const msg = (err && err.inner.message + 'index') || '系统错误';
        const statusCode = (err.output && err.output.statusCode) || 500;
        const errorMsg = (err.output && err.output.payload && err.output.payload.error) || err.message+ 'index1';
        new Result(null, msg, {
            error: statusCode,
            errorMsg
        }).fail(res.status(statusCode))

    }

})



module.exports = router;