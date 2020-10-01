const db = require('./db-query.js');

const login = async (req, res) => {
    const conn = req.dbConn;
    const { username } = req.body;

    try {
        const rows = await db.query(conn, 'SELECT `user_id` FROM `user_table` WHERE `username` = ?', [username]);
        if (rows.length == 0) {
            const insertResult = await db.query(conn, 'INSERT INTO `user_table` (`username`) VALUES (?)', [username]);
            return res.send({
                valid: true,
                user_id: insertResult.insertId,
            });
        } else {
            return res.send({
                valid: true,
                user_id: rows[0].user_id,
            });
        }
    } catch (err) {
        return res.send({
            valid: false,
            error: err,
        });
    }
   
}

module.exports = {
    login,
}
