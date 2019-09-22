'use strict';
const nodemailer = require('nodemailer');
const mysql = require('mysql');
const fs = require('fs');
const PASSWORD = '******'; //163邮箱授权码

const Con = mysql.createPool({
    connectionLimit: 100,
    host: '127.0.0.1',
    user: '******',
    password: '******',
    database: '******',
});


/**
    使用Promise封装mysql
    @sql: sql语句
    @values: 数据
**/

let query = function (sql) {
    return new Promise((resolve, reject) => {
        Con.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            } else {
                connection.query(sql, (err, rows) => {
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
 * 此脚本使用的163邮箱  如果遇到 554 DT:SPM 请检查Html代码：http://validator.w3.org/
 */
async function main() {
    let emails = await getUser();
    let transporter = nodemailer.createTransport({
        service: '163',
        port: 465,
        secureConnection: true,
        auth: {
            type: 'login',
            user: 'lab5088@163.com',
            pass: PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"508Lab 👻" <lab5088@163.com>',
        to: emails,
        subject: '508工作室本周资源推送', // Subject line
        text: '新的一周，你是否已经准备好前行。', // plain text body
        html: await fs.readFileSync('index.html').toString()
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
/**
 * 获取邮箱列表
 * @param {*} arg  today: 获取当天录入的邮箱 
 */
async function getUser(arg) {
    let data = null;
    if (arg === 'today') {
        data = await query(`select * from subscribe where to_days(time) = to_days(now());`);
    } else {
        data = await query(`select email from subscribe`);
    }
    let str = '';
    data.map((e, i) => {
        if (data.length - 1 == i) {
            str += e.email;
        } else {
            str += e.email + ', '
        }
    });
    return str;  // '123456@qq.com, 4464561@163.com'
}


main().catch(console.error);