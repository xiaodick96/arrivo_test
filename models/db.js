const mysql = require('mysql2')

const con = mysql.createConnection({
    host: process.env.RDB_DB_HOST,
    port: process.env.RDB_DB_PORT,
    user: process.env.RDB_DB_USER,
    password: process.env.RDB_DB_PASSWORD,
    database: process.env.RDB_DB_DATABASE
})

con.connect(function(err) {
    if (err) {
        throw err
    } else {
        console.log('Database is connected successfully')
    }
})

module.exports = con