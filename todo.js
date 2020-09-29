const mysql = require('mysql');
const config = require('./config.js');

const conn = mysql.createConnection({
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
});

const addTodo = (req, res) => {
    const { detail, user_id } = req.body;

    conn.query('SELECT `user_id` FROM `user_table` WHERE `user_id` = ?', [user_id], (err, rows) => {
        if (err) {
            return res.send({
                valid: false,
                error: err,
            });
        }
        if (rows.length == 0) {
            return res.send({
                valid: false
            });

        } else {
            conn.query('INSERT INTO `todo_table` (`user_id`, `detail`, `status`) VALUES (?, ?, FALSE)', [user_id, detail], (err, insertResult) => {
                if (err) {
                    return res.send({
                        valid: false,
                        error: err,
                    });
                }
                return res.send({
                    valid: true,
                    todo_id: insertResult.insertId,
                });
            });
        }
    });

}

// const editTodo = (req, res) => {
//     const { detail, user_id, todo_id } = req.body;

//     conn.query('SELECT * FROM `todo_table` WHERE `user_id` = ? AND `todo_id` = ?', [user_id, todo_id], (err, rows) => {
//         if (err) {
//             return res.send({
//                 valid: false,
//                 error: err,
//             });
//         }
//         if (rows.length == 0){
//             return res.send({
//                 valid: false
//             });
//         } else {
//             conn.query('UPDATE `todo_table` SET `detail` = ? WHERE `todo_id` = ? AND `user_id` = ?', [detail, todo_id, user_id], (err, insertResult) => {
//                 if (err) {
//                     return res.send({
//                         valid: false,
//                         error: err,
//                     });
//                 }
//                 return res.send({
//                     valid: true
//                 });
//             });
//         }
//     });
// }
function checkId(user_id, todo_id) {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM `todo_table` WHERE `user_id` = ? AND `todo_id` = ?', [user_id, todo_id], (err, rows) => {
            if (err) {
                return res.send({
                    valid: false,
                    error: err,
                });
            }
            if (rows.length == 0) {
                return res.send({
                    valid: false
                });
            }
        });
        resolve();
    });
}

function updateTodo(user_id, todo_id, detail) {
    return new Promise((resolve, reject) => {
        conn.query('UPDATE `todo_table` SET `detail` = ? WHERE `todo_id` = ? AND `user_id` = ?', [detail, todo_id, user_id], (err, insertResult) => {
            if (err) {
                return res.send({
                    valid: false,
                    error: err,
                });
            }
            return res.send({
                valid: true
            });
        });
        resolve();
    });
}

const editTodo = async (req, res) => {
    const { detail, user_id, todo_id } = req.body;
    try {
        await checkId(user_id, todo_id);
        await updateTodo(user_id, todo_id, detail);
    } catch (error) {
        console.error(error);
    }
}


const doneTodo = (req, res) => {
    const { user_id, todo_id } = req.body;

    conn.query('SELECT * FROM `todo_table` WHERE `user_id` = ? AND `todo_id` = ? AND `status` = false', [user_id, todo_id], (err, rows) => {
        if (err) {
            return res.send({
                valid: false,
                error: err,
            });
        }
        if (rows.length == 0) {
            return res.send({
                valid: false
            });
        } else {
            conn.query('UPDATE `todo_table` SET `status` = true WHERE `todo_id` = ? AND `user_id` = ?', [todo_id, user_id], (err, insertResult) => {
                if (err) {
                    return res.send({
                        valid: false,
                        error: err,
                    });
                }
                return res.send({
                    valid: true
                });
            });
        }
    });
}

const undoTodo = (req, res) => {
    const { user_id, todo_id } = req.body;
    conn.query('SELECT * FROM `todo_table` WHERE `user_id` = ? AND `todo_id` = ? AND `status` = true', [user_id, todo_id], (err, rows) => {
        if (err) {
            return res.send({
                valid: false,
                error: err,
            });
        }
        if (rows.length == 0) {
            return res.send({
                valid: false
            });
        } else {
            conn.query('UPDATE `todo_table` SET `status` = false WHERE `todo_id` = ? AND `user_id` = ?', [todo_id, user_id], (err, insertResult) => {
                if (err) {
                    return res.send({
                        valid: false,
                        error: err,
                    });
                }
                return res.send({
                    valid: true
                });
            });
        }
    });
}

const deleteTodo = (req, res) => {
    const { user_id, todo_id } = req.body;
    conn.query('SELECT * FROM `todo_table` WHERE `user_id` = ? AND `todo_id` = ?', [user_id, todo_id], (err, rows) => {
        if (err) {
            return res.send({
                valid: false,
                error: err,
            });
        }
        if (rows.length == 0) {
            return res.send({
                valid: false
            });
        } else {
            return res.send({
                rows,
                valid: true
            });
        }
    });

}

const getTodo = (req, res) => {
    const { user_id } = req.query;
    conn.query('SELECT * FROM `todo_table` WHERE `user_id` = ?', [user_id, todo_id], (err, rows) => {
        if (err) {
            return res.send({
                valid: false,
                error: err,
            });
        }
        if (rows.length == 0) {
            return res.send({
                valid: false
            });
        } else {
            conn.query('UPDATE `todo_table` SET `status` = false WHERE `todo_id` = ? AND `user_id` = ?', [todo_id, user_id], (err, insertResult) => {
                if (err) {
                    return res.send({
                        valid: false,
                        error: err,
                    });
                }
                return res.send({
                    valid: true
                });
            });
        }
    });
}

module.exports = {
    addTodo,
    editTodo,
    doneTodo,
    undoTodo,
    deleteTodo,
    getTodo,
}
