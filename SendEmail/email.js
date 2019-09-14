'use strict';
const nodemailer = require('nodemailer');
const mysql = require('mysql');
const PASSWORD = '*****'; //163邮箱授权码

const Con = mysql.createPool({
    connectionLimit: 100,
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'lab'
});


const HTML = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <style type="text/css">
        .label {
            display: inline;
            padding: .2em .6em .3em;
            font-size: 75%;
            font-weight: 700;
            line-height: 1;
            color: #fff;
            text-align: center;
            white-space: nowrap;
            vertical-align: baseline;
            border-radius: .25em;
        }
        .label-primary{
            background-color: #337ab7;
        }
    </style>
</head>
<body style="margin:0; padding:0; background-color:#F2F2F2;">
    <center>
        <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#F2F2F2" style="margin-top: 20px;">
            <tr>
                <td align="center" valign="top">
                    <img style="width: 80px;height: 80px;display: block;margin: 0 auto;" src="https://www.dongkji.com/508logo.png">
                </td>
            </tr>

            <tr>
                <td align="center" valign="top">
                    <h2 style="text-align: center; color: blue;">508本周资源推送</h2>
                </td>
            </tr>
            <tr>
                <td align="center" valign="top">
                    <a href="https://github.com/deepfakes/faceswap" style="display: inline-block; margin-top: 20px;">FaceSwap是一种利用深度学习识别和交换图片和视频中的面孔的工具</a>
                    <span class="label label-primary">深度学习</span>
                    <span class="label label-primary">神经网络</span>
                    <span class="label label-primary">deepfakes</span>
                </td>
            </tr>
            <tr>
                <td align="center" valign="top">
                    <a href="https://github.com/Kr1s77/awesome-python-login-model" style="display: inline-block; margin-top: 20px;">蟒蛇模拟登陆一些大型网站，还有一些简单的爬虫</a>
                    <span class="label label-primary">爬取网站</span>
                    <span class="label label-primary">selenium</span>
                    <span class="label label-primary">python</span>
                </td>
            </tr>
            <tr>
                <td align="center" valign="top">
                    <a href="https://tools.imiku.me" style="display: inline-block; margin-top: 20px;">MikuTools - 一个轻量的工具集合</a>
                    <span class="label label-primary">工具集合</span>
                    <span class="label label-primary">在线视频解析</span>
                </td>
            </tr>
            <tr>
                <td align="center" valign="top">
                    <a href="https://github.com/apache/geode" style="display: inline-block; margin-top: 20px;">Apache Geode是一个数据管理平台,可在广泛分布的云架构中提供对数据密集型应用程序的实时,一致的访问.</a>
                    <span class="label label-primary">Geode</span>
                    <span class="label label-primary">大数据</span>
                    <span class="label label-primary">数据管理平台</span>
                </td>
            </tr>
            <tr>
                <td align="center" valign="top">
                    <a href="https://github.com/timqian/chart.xkcd" style="display: inline-block; margin-top: 20px;">Chart.xkcd是一个图表库，用于绘制“粗略”，“卡通”或“手绘”样式图表。</a>
                    <span class="label label-primary">图标库</span>
                    <span class="label label-primary">可视化</span>
                    <span class="label label-primary">chart</span>
                </td>
            </tr>
            <tr>
                <td align="center" valign="top">
                    <a href="https://rsuitejs.com" style="display: inline-block; margin-top: 20px;">一套 React 的 UI 组件库，贴心的 UI 设计，友好的开发体验</a>
                    <span class="label label-primary">组件库</span>
                    <span class="label label-primary">React</span>
                    <span class="label label-primary">RSUITE</span>
                </td>
            </tr>
            <tr>
                <td align="center" valign="top">
                    <a href="https://www.wdku.net" style="display: inline-block; margin-top: 20px;">在线超级转换工具 - 免费转换</a>
                    <span class="label label-primary">图像格式转换</span>
                    <span class="label label-primary">PDF转换</span>
                    <span class="label label-primary">PDF转Word</span>
                    <span class="label label-primary">在线文字识别转换</span>
                </td>
            </tr>
            <tr>
                <td align="center" valign="top">
                    <a href="https://github.com/react-spring/react-three-fiber" style="display: inline-block; margin-top: 20px;">Three.js的React-renderer（用于web和react-native）</a>
                    <span class="label label-primary">3D</span>
                    <span class="label label-primary">react</span>
                    <span class="label label-primary">可视化</span>
                </td>
            </tr>
            <tr>
                <td align="center" valign="top">
                    <a href="https://gradle.org/" style="display: inline-block; margin-top: 20px;">Gradle是一个基于Apache Ant和Apache Maven概念的项目自动化构建开源工具</a>
                    <span class="label label-primary">自动化构建</span>
                    <span class="label label-primary">Ant</span>
                    <span class="label label-primary">android</span>
                </td>
            </tr>
            <tr>
                <td align="center" valign="top">
                    <a href="https://github.com/atlassian/react-beautiful-dnd" style="display: inline-block; margin-top: 20px;">使用React对列表进行漂亮且可访问的拖放操作</a>
                    <span class="label label-primary">react</span>
                    <span class="label label-primary">dnd</span>
                    <span class="label label-primary">拖动</span>
                </td>
            </tr>
            <tr>
                <td align="center" valign="top">
                    <a href="https://github.com/ant-design/ant-design-dark-theme" style="display: inline-block; margin-top: 20px;">Ant Design的黑暗主题变量</a>
                    <span class="label label-primary">ant-design-pro</span>
                    <span class="label label-primary">主题</span>
                </td>
            </tr>
            <tr>
                <td align="center" valign="top">
                    <a href="https://github.com/google/gson" style="display: inline-block; margin-top: 20px;">一个Java序列化/反序列化库，用于将Java对象转换为JSON并返回</a>
                    <span class="label label-primary">序列化库</span>
                    <span class="label label-primary">java</span>
                    <span class="label label-primary">Google</span>
                </td>
            </tr>
            <tr>
                <td align="center" valign="top">
                    <a href="https://github.com/iperov/DeepFaceLab" style="display: inline-block; margin-top: 20px;">DeepFaceLab是一种利用机器学习来替换视频中的面部的工具</a>
                    <span class="label label-primary">深度学习</span>
                    <span class="label label-primary">神经网络</span>
                    <span class="label label-primary">faceswap</span>
                </td>
            </tr>
            <tr>
                <td align="center" valign="top">
                    <a href="https://github.com/andrew--r/frontend-case-studies" style="display: inline-block; margin-top: 20px;">A curated list of technical talks and articles about real world enterprise frontend development</a>
                    <span class="label label-primary">前端</span>
                    <span class="label label-primary">文章</span>
                    <span class="label label-primary">讲座</span>
                </td>
            </tr>
            <tr>
                <td align="center" valign="top">
                    <a href="https://github.com/marionebl/svg-term-cli" style="display: inline-block; margin-top: 20px;">Share terminal sessions via SVG and CSS</a>
                    <span class="label label-primary">SVG</span>
                    <span class="label label-primary">terminal</span>
                    <span class="label label-primary">css</span>
                </td>
            </tr>
            <tr>
                <td align="center" valign="top">
                    <h3>另外感谢由<a href="https://github.com/soha1018">soha1018</a>提供"
                            <a href="https://www.cnblogs.com/lazytest/p/5612709.html" style="display: inline-block; margin-top: 20px;">app控件获取之uiautomatorviewer</a>
                    </a>"   
                </td>
            </tr>
        </table>
    </center>
</body>
</html>`;

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
 * 此脚本使用的163邮箱  如果遇到 554 DT:SPM 异常请删除空行之类的即可
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
        from: '"Fred Foo 👻" <lab5088@163.com>', 
        to: emails,
        subject: '508工作室本周资源推送', // Subject line
        text: '新的一周，你是否已经准备好前行。', // plain text body
        html: HTML
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
/**
 * 从来数据库中获取邮箱
 */
async function getUser() {
    const data = await query(`select email from subscribe`);
    let str = '';
    data.map((e, i) => {
        if (data.length - 1  == i ) {
            str += e.email;            
        }else{
            str += e.email + ', '
        }
    });
    return str;  // '123456@qq.com, 4464561@163.com'
}


main().catch(console.error);