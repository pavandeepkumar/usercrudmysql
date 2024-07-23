const express = require('express');
const dotenv = require('dotenv');
dotenv.config()
const app = express();
const bodyParser = require('body-parser');
const MySQLConnection = require('./connection');
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
const PORT = process.env.PORT || 5000
app.get('/', (req, res) => {
    console.log("server:  is working fine")
    return res.json({ status: 'ok' })
})
app.get('/user', (req, res) => {
    MySQLConnection.query('SELECT * FROM user', ((err, result) => {
        if (err) {
            console.log("error in query", err)
            return err
        }
        else {
            console.log("result in query", result)
            return res.json({
                status: 'success',
                data: result
            })
        }
    }));
})

app.get('/user/:id', (req, res) => {
    MySQLConnection.query('SELECT * FROM user WHERE id=?', [req.params.id], ((err, result) => {
        if (err) {
            console.log("error in query", err)
            return err
        }
        else {
            console.log("result in query", result)
            return res.json({
                status: 'success',
                data: result
            })
        }
    }));
})
app.post('/user', (req, res) => {
    MySQLConnection.query('INSERT INTO user(name,email) values(?,?)', [req.body.name, req.body.email], ((err, result) => {
        if (err) {
            console.log("error in query", err)
            if (err.code == 'ER_NO_SUCH_TABLE') {
                console.log("Table does not exist, creating it now.");
                const createTableQuery = `
                    CREATE TABLE user (
                        id INT NOT NULL AUTO_INCREMENT,
                        name VARCHAR(50),
                        email VARCHAR(100),
                        PRIMARY KEY (id)
                    );
                `;
                MySQLConnection.query(createTableQuery, function (err, result) {
                    if (err) throw err;
                    console.log("Table created successfully.");
                });
            }
            
            // return err
        }
        else {
            console.log("result in query", result)
            return res.json({
                status: 'success',
                data: result
            })
        }
    }));
})
app.patch('/user', (req, res) => {
    const user = req.body
    MySQLConnection.query('UPDATE user SET ? WHERE id= ' + user.id, [user], ((err, result) => {
        if (err) {
            console.log("error in query", err)
            return err
        }
        else {
            console.log("result in query", result)
            return res.json({
                status: 'success',
                data: result
            })
        }
    }));
})


// ConnectionWithMySQL
app.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
})