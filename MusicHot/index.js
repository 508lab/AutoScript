const { Client } = require('@elastic/elasticsearch');
const client = new Client({
    node: 'http://127.0.0.1:9200',
    auth: {
        username: '*******',
        password: '*******'
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
 * 从index.html中获取
 */
let golbal = [{"title":"像我这样的人","link":"/song?id=569213220","id":"569213220"},{"title":"心如止水","link":"/song?id=1349292048","id":"1349292048"},{"title":"给未来 - (电视剧《亲爱的，热爱的》插曲)","link":"/song?id=1377131180","id":"1377131180"},{"title":"倔强","link":"/song?id=386175","id":"386175"},{"title":"仰世而来","link":"/song?id=1300594527","id":"1300594527"},{"title":"才华有限公司","link":"/song?id=28692862","id":"28692862"},{"title":"流转","link":"/song?id=1396931177","id":"1396931177"},{"title":"一棵会开花的树","link":"/song?id=562597293","id":"562597293"},{"title":"逃亡日记","link":"/song?id=1397716637","id":"1397716637"},{"title":"如果你能感同我的身受","link":"/song?id=511921360","id":"511921360"},{"title":"无名之辈 - (电视剧《亲爱的，热爱的》主题曲)","link":"/song?id=1376142151","id":"1376142151"},{"title":"飞云之下","link":"/song?id=554242032","id":"554242032"},{"title":"不将就 - (电影《何以笙箫默》片尾主题曲)","link":"/song?id=31654343","id":"31654343"},{"title":"珍珠","link":"/song?id=1313321629","id":"1313321629"},{"title":"借我","link":"/song?id=408814900","id":"408814900"},{"title":"热勇","link":"/song?id=423015580","id":"423015580"},{"title":"记得","link":"/song?id=108269","id":"108269"},{"title":"我怀念的","link":"/song?id=287063","id":"287063"},{"title":"春夏秋冬","link":"/song?id=186453","id":"186453"},{"title":"无人之境","link":"/song?id=64625","id":"64625"},{"title":"失眠飞行","link":"/song?id=1365898499","id":"1365898499"},{"title":"给十年后的我","link":"/song?id=28068308","id":"28068308"},{"title":"当你离开的时候","link":"/song?id=208937","id":"208937"},{"title":"你就不要想起我","link":"/song?id=28018075","id":"28018075"},{"title":"我们向往着哪里","link":"/song?id=490602330","id":"490602330"},{"title":"一个人的风景 - (电视剧《夏至未至》插曲)","link":"/song?id=484732869","id":"484732869"},{"title":"昨日青空 - (电影《昨日青空》同名青春主题曲)","link":"/song?id=1293951677","id":"1293951677"},{"title":"你曾是少年","link":"/song?id=426027293","id":"426027293"},{"title":"热情","link":"/song?id=28935298","id":"28935298"},{"title":"停格 - (Frozen)","link":"/song?id=30590559","id":"30590559"},{"title":"刚刚好","link":"/song?id=415792881","id":"415792881"},{"title":"起风了 - (电视剧《加油，你是最棒的》主题曲)","link":"/song?id=1338695683","id":"1338695683"},{"title":"风吹着我向你跑来 - (电视剧《强风吹拂》插曲)","link":"/song?id=1369998432","id":"1369998432"},{"title":"明天，你好 - (电视剧《加油吧实习生》插曲)","link":"/song?id=368727","id":"368727"},{"title":"后来的我们 - (电影《后来的我们》片名曲)","link":"/song?id=553310243","id":"553310243"},{"title":"当爱已成往事","link":"/song?id=26620756","id":"26620756"},{"title":"爱了很久的朋友 - (电影《后来的我们》插曲)","link":"/song?id=547976490","id":"547976490"},{"title":"曾是拥有","link":"/song?id=347722","id":"347722"},{"title":"可以了","link":"/song?id=28481818","id":"28481818"},{"title":"后来","link":"/song?id=254574","id":"254574"},{"title":"独家记忆","link":"/song?id=63650","id":"63650"},{"title":"你只是经过","link":"/song?id=36080207","id":"36080207"},{"title":"学不会","link":"/song?id=108134","id":"108134"},{"title":"默 - (电影《何以笙箫默》主题插曲)","link":"/song?id=31473269","id":"31473269"},{"title":"孤身","link":"/song?id=1365393542","id":"1365393542"},{"title":"不说再见 - (电影《谁的青春不迷茫》主题曲)","link":"/song?id=399354289","id":"399354289"},{"title":"在,也不见 - (电影《再见，在也不见》主题曲)","link":"/song?id=408212737","id":"408212737"},{"title":"祝你幸福","link":"/song?id=511920347","id":"511920347"},{"title":"我总是一个人在练习一个人","link":"/song?id=108284","id":"108284"}];

let num = 0;
/**
 * cnpm install @elastic/elasticsearch --save
 * 请先运行：https://github.com/Binaryify/NeteaseCloudMusicApi
 * 录入网易云热门评论到ElasticSearch  
 */
async function main() {
    let music = await getMusics();
    let tag = true;
    while (tag && golbal.length) {
        tag = false;
        let ele = golbal.pop();
        await saveMusic(music, ele.id, ele.title, `https://music.163.com/#` + ele.link);
        tag = true;
    }
    console.log('结束---------------->一共录入' + num + '条数据');
}

/**
 * 录入单条数据
 * @param {*} music 
 * @param {*} id 
 * @param {*} title 
 * @param {*} url 
 */
async function saveMusic(music, id, title, url) {
    let size = 1000;
    if (music.includes(id)) {   //尽量避免重复歌曲录入
        console.error('此歌曲已录入----------------------->' + url);
    } else {
        console.info(`${title}-------------->开始录入=====================================>`);
        music.push(id);
        await addData(id, size, title, url);
    }
}

/**
 * 获取已录入数据
 */
async function getMusics() {
    let data = await client.search(
        {
            index: 'poetry',
            type: "_doc",
            body: {
                "size": 0,
                "query": {
                    "match_phrase": {
                        "d": "网易云"
                    }
                },
                "aggs": {
                    "set": {
                        "terms": {
                            "field": "l.keyword",
                            "size": 1000000   //控制可能重复的问题
                        }
                    }
                }
            }
        });
    let ids = data.body.aggregations.set.buckets.map((e) => {
        return e.key.split('id=')[1]
    })
    return ids;
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
        num++;
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
