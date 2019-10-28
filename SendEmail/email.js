'use strict';
const nodemailer = require('nodemailer');
const mysql = require('mysql');
const fs = require('fs');
const PASSWORD = '******'; //163邮箱授权码

const Con = mysql.createPool({
    connectionLimit: 100,
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'lab',
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
let errsEmails = [];
/**
 * 此脚本使用的163邮箱
 */
async function main() {
    await getUser().catch((e) => {
    });
    await fs.writeFileSync('err.json', JSON.stringify(errsEmails));  //记录错误邮箱日志
}

async function sendEmail(email) {
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
    let info = await transporter.sendMail({
        from: '"508Lab 👻" <lab5088@163.com>',
        to: email,
        subject: '508工作室本周资源推送',
        text: '新的一周，你是否已经准备好前行。',
        html: await fs.readFileSync('index.html').toString()
    }).catch((err) => {
        console.log(err)
    });
    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

/**
 * 获取邮箱列表
 * @param {*} arg  today: 获取当天录入的邮箱 
 */
async function getUser(arg) {
    let data = [];
    if (arg === 'today') {
        data = await query(`select email from subscribe where to_days(time) = to_days(now());`);
    } else {
        data = await query(`select email from subscribe`);
    }
    data = data.reverse();
    let thread = setInterval(async () => {
        if (!data.length) {
            clearInterval(thread);
            return;
        }
        let ele = data.pop();
        console.log(data.length);
        await sendEmail(ele.email).catch(() => {
            errsEmails.push(ele.email);
        });
    }, 5000);
}


main().catch(console.error);
