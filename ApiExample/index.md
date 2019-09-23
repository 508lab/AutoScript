# 订阅

### 1 邮箱订阅
- **接口说明：** 上传邮箱订阅
- **接口地址：** [https://api.dongkji.com/api/v1/api/subscribe](https://api.dongkji.com/api/v1/api/subscribe)
- **接口类型：** POST
#### 1.1 请求参数
| 参数名称 | 类型 | 出现要求 | 描述 |
| :--- | :--- | :--- | :--- |
|  email | string | R | 邮箱 |


#### 1.2 返回示例：
```json
{
    "data": true, 
    "status": 200
}
```

### 2. 是否订阅

- **接口说明：** 邮箱是否订阅
- **接口地址：** [https://api.dongkji.com/api/v1/api/warehouse/:email]()
- **接口类型：** GET
#### 2.1 请求参数
| 参数名称 | 类型 | 出现要求 | 描述 |
| :--- | :--- | :--- | :--- |
|  email | string | R | 邮箱 |


#### 2.2 返回示例
```json
{
    "data": "Lab5088@163.com", 
    "status": 200
}
```
