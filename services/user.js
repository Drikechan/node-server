const {querySql, queryOne} = require("../db");

function login(username, password) {
    return querySql(`SELECT * FROM admin_user WHERE username='${username}' and password='${password}'`);
}

function findUser(username) {
    return queryOne(`select * from admin_user where username='${username}'`);
}

module.exports = {
    login,
    findUser
}