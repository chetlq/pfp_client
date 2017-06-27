var http = require("http");
var url = require("url");
const axios = require('axios')
const axiosCookieJarSupport = require('@3846masa/axios-cookiejar-support');
const tough = require('tough-cookie');
axiosCookieJarSupport(axios);

const cookieJar = new tough.CookieJar();

axios.get('http://www.voa.com/', {
    jar: cookieJar, // tough.CookieJar or boolean
    withCredentials: true // If true, send cookie stored in jar
  })
  .then(() => {
    console.log(cookieJar);
  }).catch(function(error) {
    console.log('error');
  });
/*
var urlstring = "http://www.voa.com/";
var parsedurl = url.parse(urlstring);
var options = {
  hostname: parsedurl.hostname,
  port: (parsedurl.port || 80), // 80 by default
  method: 'GET',
  path: parsedurl.path,
  headers: {},
};

var request = http.request(
  options,
  function(response) {
    // display returned cookies in header
    var setcookie = response.headers["set-cookie"];
    if (setcookie) {
      setcookie.forEach(
        function(cookiestr) {
          console.log("111111111111111111111111111111 COOKIE:" + cookiestr);
        }
      );
    }

    var data =
      "===========================================================================================";
    response.on(
      "data",
      function(chunk) {
        data += chunk;
      }
    );

    response.on(
      "end",
      function() {
        console.log("STATUS:" + response.statusCode);
        console.log("  DATA:" + data);
      }
    );
  }
);

request.on(
  "error",
  function(err) {
    console.error("ERROR:" + err);
  }
);

request.end(); // let request know it is finished sending
*/
