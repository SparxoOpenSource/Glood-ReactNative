let baseUrl = 'https://a.sparxo.com/1/';///merchants/signup_external
let signup_external_url = baseUrl + 'members/signup_external';///
let events_url = baseUrl + 'members/current/events';///
let ticket_subs_url = baseUrl + 'members/current/events/{eventId}/ticket_subs';///
let obtain_local_access_token_url = 'https://identity.sparxo.com/oauth2/obtain_local_access_token';//// oauth2/obtain_local_access_token

var postFrom = function (url, params, sCallback, eCallback) {
  console.log('postFrom url', url);
  console.log('postFrom params', params);
  console.log('postFrom JSON params', JSON.stringify(params));
  var fetchOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'data=' + params + ''//这里我参数只有一个data,大家可以还有更多的参数
  };
  fetch(url, fetchOptions)
    .then((response) => response.text())
    .then((responseText) => {
      sCallback(responseText);
    }).catch((error) => {
      eCallback(error);
    }).done();
}
/**
*url :请求地址
*data:参数(Json对象)
*callback:回调函数
*/
var postJson = function (url, params, sCallback, eCallback) {
  console.log('postJson url', url);
  console.log('postJson params', params);
  console.log('postJson JSON params', JSON.stringify(params));
  var fetchOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      //json形式
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  };

  fetch(url, fetchOptions)
    .then((response) => response.text())
    .then((responseText) => {
      sCallback(JSON.parse(responseText));
    }).catch((error) => {
      eCallback(error);
    }).done();
}
//get请求
/**
*url :请求地址
*callback:回调函数
*/
var get = function (url, sCallback, eCallback) {
  console.log('get url', url);
  fetch(url)
    .then((response) => response.text())
    .then((responseText) => {
      sCallback(JSON.parse(responseText));
    }).catch((error) => {
      eCallback(error);
    }).done();
}
//get请求
/**
*url :请求地址
*callback:回调函数
*/
var get2 = function (url, headers, sCallback, eCallback) {
  console.log('get2 url', url);
  console.log('get2 headers', headers);
  var fetchOptions = {
    method: 'GET',
    headers: headers
  };
  fetch(url, fetchOptions)
    .then((response) => response.text())
    .then((responseText) => {
      sCallback(JSON.parse(responseText));
    }).catch((error) => {
      eCallback(error);
    }).done();
}
/**
 *events_url
*url :请求地址
*callback:回调函数
 headers: {
      'authorization':'access_token',
      'Accept': 'application/json',
      //json形式
      'Content-Type': 'application/json'
    }
  ** result:{
  "result": [
    {
      "begin_time_utc": "2016-10-11T09:01:00Z",
      "end_time_utc": "2017-01-28T10:01:00Z",
      "image_crop_info": {
        "x1": 0,
        "x2": 1728,
        "y1": 232,
        "y2": 882
      },
      "image_url": "https://image-cache.sparxo.com/sparxo.app.ticketing/41447869118423040/aba70e518d264e4c93590a506cbc4700.jpg",
      "location": "San Francisco, CA, United States",
      "long_description": "<p><span style=\"line-height: 1.42857; background-color: initial;\">Welcome to the latest League Podcast, a series in which we take you behind-the-scenes with the people who help make League possible. Expect new guests and new stories every couple of weeks or so, and make sure to hit us with those comments and ratings so we can keep striving toward a Challenger-tier podcast.</span><br></p><p><br></p><p>This week, Rick “Mr. Piddlesworth” Ernst and Chris “Cades” Cantrell stop by to talk about Riot’s first board game, Mechs vs Minions.</p><p><br></p>",
      "merchant_id": "41447869118423040",
      "name": "<script>alert(1)</script>",
      "need_collect_phone_number": true,
      "need_collect_zip_code": true,
      "region": "",
      "short_description": "",
      "show_event_date": true,
      "skip_event_landing_page": false,
      "status": 1,
      "time_zone_id": "Pacific Standard Time",
      "type": 1,
      "url_name": "zmgtest",
      "schedules": [
        {
          "begin_time_local": "2016-10-11T02:01:00Z",
          "begin_time_utc": "2016-10-11T09:01:00Z",
          "end_time_local": "2017-01-28T02:01:00Z",
          "end_time_utc": "2017-01-28T10:01:00Z",
          "event_id": "41451413846368256",
          "id": "41451413846368257"
        }
      ],
      "id": "41451413846368256"
    }]
*/
function getJsonEvents_url(params, headers, sCallback, eCallback) {
  get2(params ? events_url + '?' + params : events_url, headers, sCallback, eCallback);
}
function getJsonTicket_subs_url(params, headers, sCallback, eCallback) {
  get2(params ? events_url + '?' + params : events_url, headers, sCallback, eCallback);
}
/**
 *  signup_external_url
*url :请求地址
*callback:回调函数
*/
function postJsonSignup_external(params, sCallback, eCallback) {
  postJson(signup_external_url, params, sCallback, eCallback);
}
/**
 *  signup_external_url
*url :请求地址
*callback:回调函数
*/
function getObtain_local_access_token(params, sCallback, eCallback) {
  get(params ? obtain_local_access_token_url + '?' + params : obtain_local_access_token_url, sCallback, eCallback);
}

function getQueryString(url) {
  if (!url) { return {}; }
  // 从url(可选)或window对象获取查询字符串
  var queryString = url.split('#')[1];

  // 我们把参数保存在这里
  var obj = {};

  // 如果查询字符串存在
  if (queryString) {
    // 查询字符串不包含#后面的部分，因此去掉它
    queryString = queryString.split('#')[0];

    // 把查询字符串分割成各部分
    var arr = queryString.split('&');

    for (var i = 0; i < arr.length; i++) {
      // 分离出key和value
      var a = arr[i].split('=');

      // 考虑到这样的参数：list[]=thing1&list[]=thing2
      var paramNum = undefined;
      var paramName = a[0].replace(/\[\d*\]/, function (v) {
        paramNum = v.slice(1, -1);
        return '';
      });
      // 设置参数值（如果为空则设置为true）
      var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
      // （可选）保持大小写一致
      // paramName = paramName.toLowerCase();
      // paramValue = paramValue.toLowerCase();
      // 如果参数名已经存在
      if (obj[paramName]) {
        // 将值转成数组（如果还是字符串）
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
        }
        // 如果没有指定数组索引
        if (typeof paramNum === 'undefined') {
          // 将值放到数组的末尾
          obj[paramName].push(paramValue);
        }
        // 如果指定了数组索引
        else {
          // 将值放在索引位置
          obj[paramName][paramNum] = paramValue;
        }
      }
      // 如果参数名不存在则设置它
      else {
        obj[paramName] = paramValue;
      }
    }
  }
  return obj;
}
module.exports = { getObtain_local_access_token, postJsonSignup_external, getJsonEvents_url, getQueryString };