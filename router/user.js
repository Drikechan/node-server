const express = require('express');
const Result = require('../model/Result');
const router = express.Router();
const {login, findUser} = require('../services/user');
const {md5, decode} = require('../utils/index');
const {PWD_SALT} = require('../utils/constant');
const {body, validationResult} = require('express-validator');
const boom = require('express-boom');
const jwt = require('jsonwebtoken');
const { PRIVATE_KEY, JWT_EXPIRED } = require('../utils/constant');

router.post('/login', [body('username').isString().withMessage('用户名必须为字符'),
        body('password').isString().withMessage('密码必须为数字')],
    function (req, res) {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            const [{ msg }] = err.errors;
            next(boom.badRequest(msg));
        } else {
            let {username, password} = req.body;
            password = md5(`${password}${PWD_SALT}`)

            login(username, password).then(user => {
                if (!user || user.length === 0) {
                    new Result('登录失败').fail(res)
                } else {

                    const token = jwt.sign(
                        { username },
                        PRIVATE_KEY,
                        { expiresIn: JWT_EXPIRED}
                    )
                    new Result({ token  },'登录成功').success(res)
                }
            })
        }


    })

router.get('/info', function (req, res, next) {
    const decoded = decode(req);
    if (decoded.username) {
        findUser(decoded.username).then(user => {
            if (user) {
                user.roles = [user.role]
                new Result(user, '用户信息查询成功').success(res)
            } else {
                new Result('用户信息查询失败').fail(user);
            }
        })
    } else {
        new Result('用户信息查询失败').fail(decoded);
    }

})


module.exports = router;