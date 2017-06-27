'use strict';
const PSI_ROZA = {
  LOGIN: "3554678395",
  HOST: "http://194.186.207.23",
  HOST_BLOCK: "http://194.186.207.23:9999",
  SMS_PASS: "55098",
  mGUID: "4856a406c200643f529efd6fe5e90fae",
  token: "59821587bc4405b466f4fc6e731efa16",
  PASS: "11223",
  PFMtoken: "b02ddd9811f476eebfbce27ca8f404b1"
};
const GLOBALS = {
  DEVID: "09D4B172-B264-419A-BFBE-6EA7E02B6239",
  VERSION: "9",
  SMS_PASS: "55098",
  operation: "register",
  login: "6435488876",
  version: "9.10",
  appType: "5.5.0",
  deviceName: "Simulator",
  devID: "08D4B172-B264-419A-BFBE-6EA7E00B6239",
  mGUID: "27e5264de6bd37ba4fe37bea592099d4"
}


var Buffer = require('buffer').Buffer;
var Iconv = require('iconv').Iconv;

const libxml = require("libxmljs");
const axios = require('axios');
const windows1251 = require('windows-1251');

var encoding = require("encoding");
const axiosCookieJarSupport = require('@3846masa/axios-cookiejar-support');
const tough = require('tough-cookie');
var Cookie = tough.Cookie;

axiosCookieJarSupport(axios);
const cookieJar = new tough.CookieJar();



var instance = axios.create({
  timeout: 30000,
  jar: cookieJar, // tough.CookieJar or boolean
  withCredentials: true,
  headers: {
    'Accept-Language': 'ru;q=1',
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent': 'Mobile Device'

  }
});



function httpGet(url1) {
  return new Promise(function(resolve, reject) {
    axios({
      method: 'get',
      url: url1,

    }).then(function(response1) {
      //console.log("in first resp 1: " + response1.status);
      resolve(response1.status + " url: " + url1);
    }).catch(function(error) {
      reject(new Error("Network Error"));
    });
  });
}


var aut = function(addr, val) {
  return instance.post(addr).then(response => {
    // var iconv = new Iconv('windows-1251', 'UTF-8');
    // var encodedData = iconv.convert(response.data).toString();
    var encodedData = response.data;
    var str = encodedData.replace("windows-1251", "UTF-8")
    var xmlDoc = libxml.parseXmlString(str);

    var gchild = xmlDoc.get(val);
    console.log(val + ': ' + gchild.text()); // prints "grandchild content"
    return gchild.text();

  }).catch(function(error) {
    console.log(error)
  });
};

var aut2 = function(addr) {
  return instance.post(addr).then(response => {
    var iconv = new Iconv('windows-1251', 'UTF-8');
    var encodedData = iconv.convert(response.data).toString();

    var str = encodedData.replace("windows-1251", "UTF-8")

    return str;

  }).catch(function(error) {
    console.log(error)
  });
};



aut(PSI_ROZA.HOST +
    '/CSAMAPI/registerApp.do?operation=register&login=' + PSI_ROZA.LOGIN +
    '&version=' + GLOBALS.VERSION +
    '.10&appType=iPhone&appVersion=5.5.0&deviceName=Simulator&devID=' +
    GLOBALS.DEVID, '//response/confirmRegistrationStage/mGUID').then(mGUID => {
    console.log(mGUID);
    return aut(PSI_ROZA.HOST +
      "/CSAMAPI/registerApp.do?operation=confirm&mGUID=" +
      mGUID + "&smsPassword=" + PSI_ROZA.SMS_PASS + "&version=" + GLOBALS.VERSION +
      ".10&appType=iPhone", '//response/status/code').then(() => {
      return mGUID
    });
  })
  .then(mGUID => {
    console.log("mGUID: " + mGUID);

    return aut(PSI_ROZA.HOST +
      "/CSAMAPI/registerApp.do?operation=createPIN&mGUID=" +
      mGUID + "&password=" + PSI_ROZA.PASS + "&version=" + GLOBALS.VERSION +
      ".10&appType=iPhone" +
      "&appVersion=5.5.0&deviceName=Simulator&isLightScheme=false&devID=" +
      GLOBALS.DEVID + "&mobileSdkData=1", '//response/loginData/token');

  })
  .then(token => {
    console.log("token: " + token);
    return aut2(PSI_ROZA.HOST_BLOCK + "/mobile" + GLOBALS.VERSION +
      "/postCSALogin.do?token=" + token);
  }).then(ttt => {
    console.log(ttt);
  })

.catch(function(error) {
  console.log(error)
});
