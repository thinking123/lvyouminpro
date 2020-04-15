import { get, post } from "./http";
import { showMsg, urlParams, delNullProperty, debounce } from "@/common/utils";
const reg = /^2/;
// import { useDispatch, useStore } from "@tarojs/redux";

// const store = useStore();
// const dispatch = useDispatch();

export function parseRes(
  res,
  errMsg = "请求失败",
  resolveStatus = [],
  tipStatus = []
) {
  if (
    (!!res && reg.test(res.status)) ||
    resolveStatus.includes(res.status) ||
    tipStatus.includes(res.status)
  ) {
    if (tipStatus.includes(res.status)) {
      return showMsg(res.message);
    }
    return res.rows ? res.rows : res;
  } else {
    const msg = res && res.message ? res.message : errMsg;
    showMsg(msg);
    throw new Error(msg ? msg : "error");
  }
}

/**
GET /api/site/collectSite
收藏站点 --编号 003

Response Class (Status 200)
请求已完成

ModelExample Value
{
  "message": "string",
  "path": "string",
  "rows": {},
  "status": "string"
}


Response Content Type 
Parameters
Parameter	Value	Description	Parameter Type	Data Type
token	
(required)
token

header	string
userId	
用户id

query	string
siteId	
站点id

query	string
collectType	
1 上午 2 下午

query	string
addTime	
时间

query	string
 */
export function collectSite(userId, siteId, collectType, addTime) {
  let url = "/api/site/collectSite";
  const loadingText = "";
  const errMsg = "";

  let obj = {
    userId,
    siteId,
    collectType: collectType > 0 ? collectType : "",
    addTime
  };

  obj = delNullProperty(obj);
  url = urlParams(url, obj);
  return get(url, {}, loadingText).then(res => parseRes(res, errMsg));
}

/**
GET /api/site/getSiteById
通过id获取站点 --编号 001

Response Class (Status 200)
请求已完成

ModelExample Value
{
  "message": "string",
  "path": "string",
  "rows": {
    "cityCode": "string",
    "id": 0,
    "openTime": "string",
    "siteAddress": "string",
    "siteBanner": "string",
    "siteClass": 0,
    "siteDetailsImage": "string",
    "siteIntroduce": "string",
    "siteName": "string",
    "sort": 0,
    "userId": "string"
  },
  "status": "string"
}


Response Content Type 
Parameters
Parameter	Value	Description	Parameter Type	Data Type
token	
(required)
token

header	string
id	
id

query	string
 */
export function getSiteById(id) {
  let url = "/api/site/getSiteById";
  const loadingText = "";
  const errMsg = "";

  url = urlParams(url, { id });
  return get(url, {}, loadingText).then(res => parseRes(res, errMsg));
}

/**
 POST /api/login/wxlogin
小程序用户登录 直接返回用户信息

Response Class (Status 200)
请求已完成

ModelExample Value
{
  "message": "string",
  "path": "string",
  "rows": {},
  "status": "string"
}


Response Content Type 
Parameters
Parameter	Value	Description	Parameter Type	Data Type
weiXinEntity	
(required)

Parameter content type: 
weiXinEntity

body	
ModelExample Value
{
  "code": "string",
  "userHead": "string",
  "userName": "string"
}
 */
export function wxlogin(code, userHead, userName) {
  const url = "/api/login/wxlogin";
  const loadingText = "正在登入...";
  const errMsg = "登入失败";
  const data = {
    code,
    userHead,
    userName
  };
  return post(url, data, loadingText).then(res => parseRes(res, errMsg));
}

/**
 * GET /api/site/getCityList
获取地区列表 --编号 006

Response Class (Status 200)
请求已完成

ModelExample Value
{
  "message": "string",
  "path": "string",
  "rows": {
    "adCode": "string",
    "cityCaption": "string",
    "cityOrder": 0,
    "cityState": 0,
    "createBy": "string",
    "createTime": "2020-04-14T02:25:00.422Z",
    "params": {},
    "parentCode": "string",
    "parentLevel": 0,
    "remark": "string",
    "searchValue": "string",
    "updateBy": "string",
    "updateTime": "2020-04-14T02:25:00.422Z"
  },
  "status": "string"
}


Response Content Type 
Parameters
Parameter	Value	Description	Parameter Type	Data Type
token	
(required)
token

header	string
 */
export function getCityList() {
  let url = "/api/site/getCityList";

  // const state = store.getState();

  url = urlParams(url, {});

  return get(url, {}, "").then(res => parseRes(res, ""));
}

/**
 GET /api/site/getSiteList
站点列表 --编号 001

Response Class (Status 200)
请求已完成

ModelExample Value
{
  "message": "string",
  "path": "string",
  "rows": {
    "list": [
      {
        "cityCode": "string",
        "id": 0,
        "openTime": "string",
        "siteAddress": "string",
        "siteBanner": "string",
        "siteClass": 0,
        "siteDetailsImage": "string",
        "siteIntroduce": "string",
        "siteName": "string",
        "sort": 0,
        "userId": "string"
      }
    ],
    "pageNum": 0,
    "pages": 0,
    "total": 0
  },
  "status": "string"
}


Response Content Type 
Parameters
Parameter	Value	Description	Parameter Type	Data Type
token	
(required)
token

header	string
userId	
用户id

query	string
cityCode	
地区

query	string
siteClass	
分类

query	string
pageNum	
第几页

query	string
Response Messages
 */
export function getSiteList(userId, pageNum, cityCode, siteClass) {
  let url = "/api/site/getSiteList";

  const p = {
    userId,
    cityCode,
    siteClass,
    pageNum
  };
  url = urlParams(url, delNullProperty(p));

  return get(url, {}, "").then(res => parseRes(res, ""));
}

/**
 GET /api/site/getClassList
获取分类列表 --编号 005

Response Class (Status 200)
请求已完成

ModelExample Value
{
  "message": "string",
  "path": "string",
  "rows": {
    "className": "string",
    "classSort": 0,
    "id": 0
  },
  "status": "string"
}


Response Content Type 
Parameters
Parameter	Value	Description	Parameter Type	Data Type
token	
(required)
token

header	string
 */
export function getClassList() {
  let url = "/api/site/getClassList";

  url = urlParams(url, {});

  return get(url, {}, "").then(res => parseRes(res, ""));
}
