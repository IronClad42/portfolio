var mysql = require("mysql");
var util = require("util");
require("dotenv").config();

var conn = mysql.createConnection({
    host:"bgyyufy48kjiyux6vdbg-mysql.services.clever-cloud.com",
    user:"u6tmno0qwvofq3gq",
    password:"u6tmno0qwvofq3gq",
    database:"bgyyufy48kjiyux6vdbg",
    port:"3306"
});

var exe = util.promisify(conn.query).bind(conn);


module.exports = exe;