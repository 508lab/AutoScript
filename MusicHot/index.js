const { Client } = require('@elastic/elasticsearch');
const client = new Client({
    node: 'http://127.0.0.1:9200',
    auth: {
        username: '******',
        password: '******'
    }
});
const fs = require('fs');
const request = require('request');

const result = function (method, url, params) {
    return new Promise((resolve, reject) => {
        request[method](url, { qs: params }, function (err, httpResponse, body) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        });
    }).catch(error => {
        console.log(error);
    });
}


/**
 * 请先运行：https://github.com/Binaryify/NeteaseCloudMusicApi
 * 录入网易云热门评论到ElasticSearch  
 */
async function main() {
    let music = await fs.readFileSync('music.json');
    music = JSON.parse(music);
    let id = `110452`;   //歌曲id（参考歌曲地址中的id）
    let title = `爱转角`;  //歌曲名称
    let url = 'https://music.163.com/#/song?id=110452';  //歌曲地址
    let size = 1000;
    if (music.includes(id)) {   //尽量避免重复歌曲录入
        console.error('此歌曲已录入');
        return;
    } else {
        music.push(id);
        await fs.writeFileSync('music.json', JSON.stringify(music));
    }
    await addData(id, size, title, url);
}

async function addData(id, size, title, url) {
    let data = await result('get', `http://localhost:3000/comment/hot?id=${id}&type=0&limit=${size}`, {});
    let arr = data.hotComments;
    let tag = true;
    let i = 0;
    while (tag && arr.length) {
        tag = false;
        let ele = arr.pop();
        let obj = {
            c: ele.content,
            a: title,
            type: '歌曲',
            d: '网易云',
            l: url,
        }
        i++;
        await add(obj);
        console.log(obj);
        console.log(i);
        tag = true;
    }
}

async function add(object) {
    return await client.create({
        id: new Date().getTime(),
        index: 'poetry',
        type: '_doc',
        body: object
    });
}

main();