// const expressJwt = require('express-jwt');
// const  { PRIVATE_KEY } = require('../utils/constant');
//
// const  jwtAuth = expressJwt({
//     secret: PRIVATE_KEY,
//     credentialsRequired: true,//设置false就是不校验
// }).unless({
//     path: [
//         '/',
//         'user/login'
//     ],//设置白名单
// })
//
// module.exports = jwtAuth;
const expressJwt = require('express-jwt');
const { PRIVATE_KEY } = require('../utils/constant');

const jwtAuth = expressJwt({
    secret: PRIVATE_KEY,
    credentialsRequired: true // 设置为false就不进行校验了，游客也可以访问
}).unless({
    path: [
        '/',
        '/user/login',
        // '/book/clear'
    ],
});

module.exports = jwtAuth;