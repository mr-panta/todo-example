const mysql = require('mysql')
const config = require('./config.js');

const conn = mysql.createConnection({
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
});


const login = (req, res) => {
    const { username } = req.body
    conn.query('SELECT `user_id` FROM `user_table` WHERE `username` = ?', [username], (err, rows) => {
        if (err) {
            return res.send({
                valid: false,
                error: err,
            })
        }
        if (rows.length == 0) {
            // Create new row
            conn.query('INSERT INTO `user_table` (`username`) VALUES (?)', [username], (err, insertResult) => {
                if (err) {
                    return res.send({
                        valid: false,
                        error: err,
                    })
                }
                return res.send({
                    valid: true,
                    user_id: insertResult.insertId,
                })
            })
        } else {
            return res.send({
                valid: true,
                user_id: rows[0].user_id,
            })
        }
    })
}

module.exports = {
    login,
}
