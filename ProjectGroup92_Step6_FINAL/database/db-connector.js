/*
    Citation for the following codes:
    Date: 02-19-2023
    Adapted from
    https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : '',
    password        : '',
    database        : ''
})

// Export it for use in our applicaiton
module.exports.pool = pool;