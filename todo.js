const db = require('./db-query.js');

const addTodo = async (req, res) => {
    const conn = req.dbConn;
    const { detail, user_id } = req.body;
    try{
        const rows = await db.query(conn, 'SELECT `user_id` FROM `user_table` WHERE `user_id` = ?', [user_id]);
        if (rows.length == 0){
            return res.send({
                valid: false
            });
        } else {
            const result = await db.query(conn, 'INSERT INTO `todo_table` (`user_id`, `detail`, `status`) VALUES (?, ?, FALSE)', [user_id, detail]);
            return res.send({
                valid: true,
                todo_id: result.insertId,
            });
        }
    } catch (err) {
        return res.send({
            valid: false,
            error: err,
        });
    }
}

const editTodo = async (req, res) => {
    const conn = req.dbConn;
    const { detail, user_id, todo_id } = req.body;
    try {
        const rows = await db.query(conn, 'SELECT * FROM `todo_table` WHERE `user_id` = ? AND `todo_id` = ?', [user_id, todo_id]);
        if (rows.length == 0){
            return res.send({
                valid: false
            });
        } else {
            await db.query(conn, 'UPDATE `todo_table` SET `detail` = ? WHERE `todo_id` = ? AND `user_id` = ?', [detail, todo_id, user_id]);
            return res.send({
                valid: true
            });
        }
    } catch (err) {
        return res.send({
            valid: false,
            error: err,
        });
    }
}

const doneTodo = async (req, res) => {
    const conn = req.dbConn;
    const { user_id, todo_id } = req.body;
    try {
        const rows = await db.query(conn, 'SELECT * FROM `todo_table` WHERE `user_id` = ? AND `todo_id` = ? AND `status` = false', [user_id, todo_id]);
        if (rows.length == 0){
            return res.send({
                valid: false
            });
        } else {
            await db.query(conn, 'UPDATE `todo_table` SET `status` = true WHERE `todo_id` = ? AND `user_id` = ?', [todo_id, user_id])
            return res.send({
                valid: true
            });
        }
    } catch (err) {
        return res.send({
            valid: false,
            error: err,
        });
    }
}

const undoTodo = async (req, res) => {
    const conn = req.dbConn;
    const { user_id, todo_id } = req.body;
    try {
        const rows = await db.query(conn, 'SELECT * FROM `todo_table` WHERE `user_id` = ? AND `todo_id` = ? AND `status` = true', [user_id, todo_id]);
        if (rows.length == 0){
            return res.send({
                valid: false
            });
        } else {
            await db.query(conn, 'UPDATE `todo_table` SET `status` = false WHERE `todo_id` = ? AND `user_id` = ?', [todo_id, user_id]);
            return res.send({
                valid: true
            });
        }
    } catch (err) {
        return res.send({
            valid: false,
            error: err,
        });
    }
}

const deleteTodo = async (req, res) => {
    const conn = req.dbConn;
    const { user_id, todo_id } = req.body;
    try {
        const rows = await db.query(conn, 'SELECT * FROM `todo_table` WHERE `user_id` = ? AND `todo_id` = ?', [user_id, todo_id]);
        if (rows.length == 0){
            return res.send({
                valid: false
            });
        } else {
            await db.query(conn, 'DELETE FROM `todo_table` WHERE `user_id` = ? AND `todo_id` = ?', [user_id, todo_id]);
            return res.send({
                valid: true
            });
        }
    } catch (err) {
        return res.send({
            valid: false,
            error: err,
        });
    }
}

const getTodo = async (req, res) => {
    const conn = req.dbConn;
    const { user_id } = req.body;
    try {
        const rows = await db.query(conn, 'SELECT * FROM `todo_table` WHERE `user_id` = ?', [user_id]);
        if (rows.length == 0) {
            return res.send({
                valid: false,
            })
        } else {
            return res.send({
                valid: true,
                rows,
            })
        }
    } catch (err) {
        return res.send({
            valid: false,
            error: err,
        })
    }
}

module.exports = {
    addTodo,
    editTodo,
    doneTodo,
    undoTodo,
    deleteTodo,
    getTodo,
}
