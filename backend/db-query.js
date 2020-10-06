const query = (conn, sql, args) => {
    // TODO: write `dbQuery` function that returns new promise
    return new Promise((resolve, reject) => {
        conn.query(sql, args, (err, result) => {
            if (err){
                reject(err);
            }
            resolve(result);
        });
    });
};

module.exports = {
    query,
} 