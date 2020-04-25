const mysql = require('mysql');
const fs = require('fs');
const readline = require('readline');

//数据库配置
let Con = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'outbreak'
});

/**
    使用Promise封装mysql
    @sql: sql语句
**/
let query = function (sql, values) {
    return new Promise((resolve, reject) => {
        Con.getConnection(function (err, connection) {
            if (err) {
                reject(err);
                connection.destroy();
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                    connection.destroy();
                });
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

/**
 * 逐行读取文件
 * @param {*} file 
 * @param {*} callback 
 */
function readLine(file, callback) {
    const read = fs.createReadStream(file);
    const objreadline = readline.createInterface({
        input: read,
    });
    objreadline.on('line', (line) => {
        callback(line);
    });
    // objreadline.on('close', async () => {
    //     callback('end');
    // })
}

/**
 * 录学生的数据
 */
async function studnets() {
    readLine('studnets.json', async (line) => {
        let studnet = JSON.parse(line);
        let res = await query('INSERT INTO students SET ?', studnet);
        console.log(res);
    })
}

/**
 * 录老师的数据
 */
async function teachers() {
    readLine('teachers.json', async (line) => {
        let teacher = JSON.parse(line);
        let res = await query('INSERT INTO teacher SET ?', teacher);
        console.log(res);
    })
}


studnets();
// teachers();