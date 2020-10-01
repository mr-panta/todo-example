const mysql = require('mysql');
const config = require('./config.js');

const conn = mysql.createConnection({
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
});

conn.query('SELECT * FROM `user_table`', (err, rows) => {
    // console.log(err, rows);
});

const dbQuery = (query, args) => {
    // TODO: write `dbQuery` function that returns new promise
    return new Promise((resolve, reject) => {
        conn.query(query, args, (err, rows) => {
            if (err){
                reject(err);
            }
            resolve(rows);
        });
    });
};

const testDB = async () => {
    try {
        const rows = await dbQuery('SELECT * FROM `user_table` WHERE `user_id` > ?', [0])
        console.log(rows);
    } catch (err) {
        console.log(err);
    }
};

testDB();

/*

// const rows = query(...);
// console.log(rows);

const myPromiseFn = (num) => {
    return new Promise((resolve, reject) => {
        if (num % 2 == 0) {
            setInterval(() => {
                resolve("EVEN");
            }, 1000);
        } else {
            reject("ODD");
        }
    });
};

// myPromiseFn(1).then(data => {
//     console.log("data", data);
// }).catch(err => {
//     console.log("err", err);
// });

const fn = async () => {
    try {
        const str = await myPromiseFn(1);
        console.log(str);
    } catch(err) {
        console.log(err);
    }
};

const fn2 = async () => {
    await fn();
    console.log("END");
}

fn2();

*/
