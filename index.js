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

//var bodyParser = require('body-parser');
//var jsonParser = bodyParser.json();


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



/*
var xml = '<?xml version="1.0" encoding="UTF-8"?>' +
  '<root>' +
  '<child foo="bar">' +
  '<grandchild>1 content</grandchild>' +
  '<ff><grandchild>2 content</grandchild></ff>' +
  '<grandchild>3 content</grandchild>' +
  '<grandchild>4 content</grandchild>' +
  '<grandchild>5 content</grandchild>' +
  '</child>' +
  '<sibling>with content!</sibling>' +
  '</root>';
var xmlDoc = libxml.parseXmlString(xml);

// xpath queries
var gchild = xmlDoc.get('//grandchild');

while (gchild != null) {
  console.log(gchild.text());
  gchild = gchild.nextElement()

}
*/


// prints "grandchild content"
/*
var children = xmlDoc.root().childNodes();

var child = children[0];

console.log(child.value)
try {
  console.log(child.attr('foo').value()); // prints "bar"
} catch (e) {
  console.log(e);
}
var arr = xmlDoc.find('//grandchild');
for (var val in arr) {
  // xmlDoc2 = libxml.parseXmlString('<?xml version="1.0" encoding="UTF-8"?>' +
  //   '<root>' + arr[val]
  //   '</root>');
  var mlDoc2 = libxml.parseXmlString(arr[val]).get('//grandchild').text();;

  console.log(mlDoc2); // prints "grandchild content"
  //console.log("obj." + val + " = " + arr[val]);
}
console.log(Object.getOwnPropertyNames(arr).sort());
console.log(arr[0])


*/
/*
var aut1 = aut(PSI_ROZA.HOST +
  '/CSAMAPI/registerApp.do?operation=register&login=' + PSI_ROZA.LOGIN +
  '&version=' + GLOBALS.VERSION +
  '.10&appType=iPhone&appVersion=5.5.0&deviceName=Simulator&devID=' +
  GLOBALS.DEVID).then((response) => {

  var encodedData = windows1251.encode(response.data);
  var str = encodedData.replace("windows-1251", "UTF-8")


  var xmlDoc = libxml.parseXmlString(str);

  // xpath queries
  var gchild = xmlDoc.get('//response/confirmRegistrationStage/mGUID').text();
  // cookieJar.setCookieSync('JSESSIONID=' + gchild, PSI_ROZA.HOST_BLOCK +
  //   '/mobile' + GLOBALS.VERSION + '/postCSALogin.do');
  //cookieJar.setCookieSync('JSESSIONID=' + gchild, PSI_ROZA.HOST_BLOCK+'/mobile'+GLOBALS.VERSION+'/private/payments/list.do);'
  //console.log(gchild); // prints "grandchild content"
  //console.log(response.status);
  //console.log(cookieJar.toJSON());
  // var cookie = Cookie.parse("mGUID=" + gchild +
  //   "; Domain=194.186.207.23; Path=/");
  // var cook = cookieJar.setCookieSync(cookie, PSI_ROZA.HOST);
  // console.log(cook);

})


.catch(function(error) {
  console.log(error)
});
*/


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
    //console.log("aut2 status: " + response.status);
    //console.log(response.data)
  }).catch(function(error) {
    console.log(error)
  });
};

var aut2 = function(addr) {
  return instance.post(addr).then(response => {
    var iconv = new Iconv('windows-1251', 'UTF-8');
    var encodedData = iconv.convert(response.data).toString();
    //var encodedData = windows1251.encode(response.data);
    var str = encodedData.replace("windows-1251", "UTF-8")
      //var xmlDoc = libxml.parseXmlString(str);

    //var gchild = xmlDoc.get(val);
    //console.log(val + ': ' + gchild.text());
    return str;
    //console.log("aut2 status: " + response.status);
    //console.log(response.data)
  }).catch(function(error) {
    console.log(error)
  });
};

// var iconv = new Iconv('windows-1251', 'UTF-8');
// var x = iconv.convert(
//   '<?xml version="1.0" encoding="windows-1251" ?><response>     <status>         <code>0</code>     </status>         <loginCompleted>true</loginCompleted>     <person>         <surName>ццццц</surName>         <firstName>цццццц</firstName>         <patrName>ццццц</patrName>             <lastLogonDate>27.06.2017T14:53</lastLogonDate>                 <lastIpAddress>194.186.207.251</lastIpAddress>         <creationType>UDBO</creationType>         <region>                    <id>0</id>                     <name>ццццццц</name>         </region>                 <mbstatus>mbk</mbstatus>             <loginId>5000406014</loginId>             <TARIF_PLAN>0</TARIF_PLAN>              <localeId>RU</localeId>     </person>             <isLightSchemeERIB>false</isLightSchemeERIB>         <isAfterRegistration>true</isAfterRegistration> </response>'
// );
// console.log(x.toString());



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
  // .then(
  //   aut(PSI_ROZA.HOST + "/CSAMAPI/registerApp.do?operation=confirm&mGUID=" +
  //     mGUID + "&smsPassword=" + PSI_ROZA.SMS_PASS + "&version=" + GLOBALS.VERSION +
  //     ".10&appType=iPhone");
  //
  //
  // )


.catch(function(error) {
  console.log(error)
});



/*
httpGet(
    PSI_ROZA.HOST +
    '/CSAMAPI/registerApp.do?operation=register&login=' + PSI_ROZA.LOGIN +
    '&version=' + GLOBALS.VERSION +
    '.10&appType=iPhone&appVersion=5.5.0&deviceName=Simulator&devID=' +
    GLOBALS.DEVID
  )
  // 1. Получить данные о пользователе в JSON и передать дальше
  .then(response => {
    var encodedData = windows1251.encode(response.data);
    var str = encodedData.replace("windows-1251", "UTF-8")


    var xmlDoc = libxml.parseXmlString(str);

    // xpath queries
    var gchild = xmlDoc.get('//response/confirmRegistrationStage/mGUID');

    //console.log(gchild.text()); // prints "grandchild content"

    //console.log(response);
    return gchild.text();
  })
  // 2. Получить информацию с github
  .then(mguid => {
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
