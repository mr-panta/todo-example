const mysql = require('mysql')

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "todo_database",
})

const dbQuery = (query, args) => new Promise((resolve, reject) => {
    conn.query(query, args, (err, result) => {
        if (err) {
            reject(err)
        } else {
            resolve(result)
        }
    })
})

const login = async (req, res) => {
    try {
        const { username } = req.body;
        const rows = await dbQuery('SELECT `user_id` FROM `user_table` WHERE `username` = ?', [username])
        if (!rows.length) {
            const insertResult = await dbQuery('INSERT INTO `user_table` (`username`) VALUES (?)', [username]);
            return res.send({
                valid: true,
                user_id: insertResult.insertId,
            })
        }
        return res.send({
            valid: true,
            user_id: rows[0].user_id,
        })
    } catch (err) {
        res.send({
            valid: false,
            error: err,
        })
    }
}

module.exports = {
    login,
}
