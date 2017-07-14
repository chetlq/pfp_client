'use strict';
const PSI_ROZA = {
  LOGIN: "3554678395",
  HOST: "http://194.186.207.23",
  HOST_BLOCK: "http://194.186.207.23",
  SMS_PASS: "55098",
  mGUID: "2ba47444ac8c7bf8c8aabc967aaa097f",
  token: "349e2e4c3c15f1dead54e2d68a263099",
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

var Alexa = require("alexa-sdk");
var parse = require('xml-parser');
const axios = require('axios');
var inspect = require('util').inspect;

const axiosCookieJarSupport = require('@3846masa/axios-cookiejar-support');
const tough = require('tough-cookie');
var Cookie = tough.Cookie;
//
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

var xml2 = '<?xml version="1.0" encoding="utf-8"?>' +
  '<root>' +
  '<address>' +
  '<name>Joe Tester1</name>' +
  '<street>Baker street 5</street>' +
  '</address>' +
  '<address>' +
  '<name>Joe Tester2</name>' +
  '<street>Baker street 5</street>' +
  '</address>' +
  '</root>';



var aut = function(addr) {
  return instance.post(addr)
};



aut(PSI_ROZA.HOST +
  '/CSAMAPI/registerApp.do?operation=register&login=' + PSI_ROZA.LOGIN +
  '&version=' + GLOBALS.VERSION +
  '.10&appType=iPhone&appVersion=5.5.0&deviceName=Simulator&devID=' +
  GLOBALS.DEVID).then(res => {
  var obj = parse(res.data);
  //console.log(obj);

  return obj['root']['children'][2]['children'][0]['content'];

}).then(mGUID => {
  console.log('mGUID: ' + mGUID);
  return aut(PSI_ROZA.HOST +
    "/CSAMAPI/registerApp.do?operation=confirm&mGUID=" +
    mGUID + "&smsPassword=" + PSI_ROZA.SMS_PASS + "&version=" + GLOBALS.VERSION +
    ".10&appType=iPhone").then(() => {
    return mGUID;
  })
}).then(mGUID => {
  console.log('mGUID: ' + mGUID);
  return aut(PSI_ROZA.HOST +
    "/CSAMAPI/registerApp.do?operation=createPIN&mGUID=" +
    mGUID + "&password=" + PSI_ROZA.PASS + "&version=" + GLOBALS.VERSION +
    ".10&appType=iPhone" +
    "&appVersion=5.5.0&deviceName=Simulator&isLightScheme=false&devID=" +
    GLOBALS.DEVID + "&mobileSdkData=1").then(res => {
    var obj = parse(res.data);
    //console.log(res.data);
    return obj['root']['children'][2]['children'][1]['content'];
  })
}).then(token => {
  console.log('token: ' + token);
  return aut(PSI_ROZA.HOST_BLOCK + "/mobile" + GLOBALS.VERSION +
    "/postCSALogin.do?token=" + token).then(res => {
    var obj = parse(res.data);

    //console.log(res.data);
    //  var v = (obj['root']['children'][2]['children'][3]['content']);
    //console.log(v)
  })
}).then(() => {

  return aut(PSI_ROZA.HOST_BLOCK + "/mobile" + GLOBALS.VERSION +
      "/private/finances/financeCalendar/showSelected.do?onDate=03.03.2017&selectedCardIds=552280"

    ).then(res => {

      var promise = new Promise(function(resolve, reject) {
        var obj = parse(res.data);
        //
        // console.log(inspect(obj.root, {
        //   colors: true,
        //   depth: Infinity
        // }));



        //console.log(myobj.arr[0]);

        var t = function(objroot) {
          var myobj = {
            operations: []

          };
          (function k(obj) {

            if (Array.isArray(obj)) {

              obj.forEach(function(item, i) {
                k(item);
              });
            } else {

              if (obj.name == 'operation') {
                var o = {};
                obj.children.forEach(function(item, i) {
                  if (item.name == "id") o.id = item.content;
                  if (item.name == "description") o.description =
                    item.content;
                  if (item.name == "categoryName") o.categoryName =
                    item.content;
                  if (item.name == "amount") o.amount = item.content;
                });
                myobj.operations.push(o)
              } else {
                k(obj.children)
              }


            }
          })(objroot);
          return myobj;
        };

        var myobj = t(obj.root);


        myobj.operations.forEach(function(item, i) {
          console.log("id = " + item.id + " description = " +
            item.description + " categoryName = " + item.categoryName +
            " amount = " + item.amount);

        });



        resolve(1);
        reject(0);


      });

      return promise.then(res => {
        return res
      }).catch(res => {
        return res
      });


    }).then(res => {
      //res.forEach(function(item, i) {
      //  console.log(item)
    })
    .catch(function(error) {

      console.log("error" + error)
    });

  //
  // return aut(PSI_ROZA.HOST_BLOCK + "/mobile" + GLOBALS.VERSION +
  //     "/private/payments/list.do?from=08.11.2015&to=31.03.2018&paginationSize=20&paginationOffset=0"
  //   ).then(res => {
  //
  //     var promise = new Promise(function(resolve, reject) {
  //       var obj = parse(res.data);
  //
  //       console.log(inspect(obj.root, {
  //         colors: true,
  //         depth: Infinity
  //       }));
  //
  //
  //
  //       var arr2 = [];
  //       var myobj = {};
  //       var k = function(obj) {
  //
  //         if (Array.isArray(obj)) {
  //
  //           obj.forEach(function(item, i) {
  //             k(item);
  //           });
  //         } else {
  //           if (obj.name == 'operation') {
  //             //console.log(obj.children[1]);
  //             arr2.push(obj.children)
  //           } else {
  //             k(obj.children)
  //           }
  //         }
  //       };
  //
  //
  //       //console.log(obj.root);
  //       k(obj.root);
  //
  //       //console.log(arr2[0][0]);
  //
  //
  //       var arr3 = [];
  //       arr2.forEach(function(item, i) {
  //         var ob = {};
  //         item.forEach(function(item2, i2) {
  //           if (item2.name == 'type') {
  //             ob.type = item2.content
  //           }
  //           if (item2.name == 'form') {
  //             ob.form = item2.content
  //           }
  //           if (item2.name == 'date') {
  //             ob.date = item2.content
  //           }
  //           if (item2.name == 'operationAmount') {
  //             item2.children.forEach(function(item3, i3) {
  //               if (item3.name == 'amount') {
  //                 ob.amount = item3.content;
  //               }
  //               if (item3.name == 'currency') {
  //                 ob.code = item3.children[0].content;
  //               }
  //             });
  //           }
  //         });
  //         arr3.push(ob)
  //           //console.log(item[0]);
  //       });
  //       var str = "";
  //
  //       arr3.forEach(function(item, i) {
  //         str += item.type + " :: " + item.form + " :: " + item.date +
  //           " :: " + item.amount + " :: " + item.code + "\n";
  //       });
  //       resolve(str);
  //       reject(0);
  //
  //
  //     });
  //
  //     return promise.then(res => {
  //       return res
  //     }).catch(res => {
  //       return res
  //     })
  //
  //
  //   }).then(res => (
  //     console.log(res)
  //   ))
  //   .catch(function(error) {
  //
  //     console.log("error" + error)
  //   });



}).catch(err => {
  console.log(err);
})
