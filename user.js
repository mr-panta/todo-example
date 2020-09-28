const mysql = require('mysql')

const conn = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "12345678",
    database: "todo_database",
})

const login = (req, res) => {
    const { username } = req.body
    conn.query('SELECT `user_id`, `username` FROM `user_table` WHERE `username` = ?', [username], (err, results) => {
        if (err) {
            return res.send({
                valid: false,
                error: err,
            })
        }
        if (results.length == 0) {
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
                user_id: results[0].user_id,
            })
        }
    })
}

module.exports = {
    login,
}
