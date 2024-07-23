const mysql2 = require('mysql2');

const MySQLConnection = mysql2.createConnection({
    host: process.env.MYSQL_ADDON_HOST,
    database: process.env.MYSQL_ADDON_DB,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD
})

const ConnectionWithMySQL = MySQLConnection.connect((err) => {
    if (err) {
        console.log("Error connecting to MySQL", err)
    }
    else {
        console.log("MYSQL connection established")
    }
})

module.exports = MySQLConnection