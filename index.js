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


var libxml = require("libxmljs");
var axios = require('axios');
var windows1251 = require('windows-1251');
var Cookies = require("cookies")

//var bodyParser = require('body-parser');
//var jsonParser = bodyParser.json();

1
var instance = axios.create({
  timeout: 10000,
  headers: {
    'Accept-Language': 'ru;q=1',
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent': 'Mobile Device'

  }
});

var aut = function(addr) {
  return instance.post(addr);
}


//
// var xml = '<?xml version="1.0" encoding="UTF-8"?>' +
//   '<root>' +
//   '<child foo="bar">' +
//   '<grandchild>1 content</grandchild>' +
//   '<ff><grandchild>2 content</grandchild></ff>' +
//   '<grandchild>3 content</grandchild>' +
//   '<grandchild>4 content</grandchild>' +
//   '<grandchild>5 content</grandchild>' +
//   '</child>' +
//   '<sibling>with content!</sibling>' +
//   '</root>';
// var xmlDoc = libxml.parseXmlString(xml);
//
// // xpath queries
// var gchild = xmlDoc.get('//grandchild');
//
// while (gchild != null) {
//   console.log(gchild.text());
//   gchild = gchild.nextElement()
//
// }

// prints "grandchild content"


var aut1 = aut(PSI_ROZA.HOST +
  '/CSAMAPI/registerApp.do?operation=register&login=' + PSI_ROZA.LOGIN +
  '&version=' + GLOBALS.VERSION +
  '.10&appType=iPhone&appVersion=5.5.0&deviceName=Simulator&devID=' +
  GLOBALS.DEVID).then(function(response) {
  var encodedData = windows1251.encode(response.data);
  var str = encodedData.replace("windows-1251", "UTF-8")
  var xmlDoc = libxml.parseXmlString(str);

  // xpath queries
  var gchild = xmlDoc.get('//response/confirmRegistrationStage/mGUID');

  console.log(gchild.text()); // prints "grandchild content"

})


.catch(function(error) {
  console.log(error)
});

/*

function httpGet(url1) {
  return new Promise(function(resolve, reject) {
    axios({ß
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

httpGet(
    "https://stackoverflow.com/questions/39716569/nodejs-unhandledpromiserejectionwarning"
  )
  // 1. Получить данные о пользователе в JSON и передать дальше
  .then(response => {
    console.log(response);
    return "http://david-m.livejournal.com/1308551.html";
  })
  // 2. Получить информацию с github
  .then(user => {
    //console.log(user);
    return httpGet(
      user
    );
  })
  // 3. Вывести аватар на 3 секунды (можно с анимацией)
  .then(githubUser => {
    console.log(githubUser); // (*)
  });

*/

/*
var aut2 = aut(PSI_ROZA.HOST +
    '/CSAMAPI/registerApp.do?operation=register&login=' + PSI_ROZA.LOGIN +
    '&version=' + GLOBALS.VERSION +
    '.10&appType=iPhone&appVersion=5.5.0&deviceName=Simulator&devID=' +
    GLOBALS.DEVID).then(function(response) {
    console.log("aut2: " + response.status);
  })
  .catch(function(error) {
    return error;
  });

var aut3 = aut(PSI_ROZA.HOST +
    '/CSAMAPI/registerApp.do?operation=register&login=' + PSI_ROZA.LOGIN +
    '&version=' + GLOBALS.VERSION +
    '.10&appType=iPhone&appVersion=5.5.0&deviceName=Simulator&devID=' +
    GLOBALS.DEVID).then(function(response) {
    console.log("aut3: " + response.status);
  })
  .catch(function(error) {
    return error;
  });
*/

// aut(PSI_ROZA.HOST +
//     '/CSAMAPI/registerApp.do?operation=register&login=' + PSI_ROZA.LOGIN +
//     '&version=' + GLOBALS.VERSION +
//     '.10&appType=iPhone&appVersion=5.5.0&deviceName=Simulator&devID=' +
//     GLOBALS.DEVID).then(function(response) {
//     console.log(response.status);
//   })
//   .catch(function(error) {
//     console.log("Error2" + error);
//   });



// Promise.resolve(aut1)
//   .then(aut2)
//   .then(aut3)
//   .catch(function(error) {
//     console.log("Error2" + error);
//   });
