
const URL = require('url');
const _ = require('lodash')


const methods = ["get", "post", "request"]
let request = function(url, method, postData, option = {}, encoding = "utf-8") {
  method = method.toLowerCase();
  try {
    let requestUrl = URL.parse(url);
    let fetch = require("http");
    if (requestUrl.protocol == "https:") {
      fetch = require("https");
    } else if (requestUrl.protocol == "http:") {
      fetch = require("http");
    } else {
      throw new Error("unknow protocol " + requestUrl.protocol);
    }
    if (_.indexOf(methods, method) == -1) {
      method = "get";
    }
    if (method == "post") {
      option.headers = _assign({}, option.headers, {
        'Content-Length': Buffer.byteLength(postData)
      })
    }
    return new Promise(function(resolve, reject) {
      let req = fetch[method](url, option, async function(res) {
        if (res.statusCode == 301 || res.statusCode == 302) {
          console.warn(url + "has moved, redirect to " + res.headers.location);
          url = res.headers.location;
          resolve(await request(url, method, postData, option, encoding));
          return;
        }
        if (res.statusCode == 500) {
          console.error("server error break connect request " + url);
          reject();
          return;
        }
        if (res.statusCode != 200) {
          console.error("server connect error : [status code: " + res.statusCode + "]");
          reject();
        }
        console.log("server connect success : [status code: " + res.statusCode + "]");
        res.setEncoding(encoding);
        let content = "";
        res.on("data", function(data) { //加载到内存
          content += data;
        }).on('end', function() {
          resolve(content);
          console.log("res process success : [content: " + content + "]");
          return;
        }).on('error', function(e) {
          console.error("response process get error " + e.message);
          reject();
        });
      }).on('error', function(e) {
        console.error("get process get error " + e.message);
        reject();
      });
      if (postData && (method == "post" || method == "request")) {
        req.write(postData);
      }
      req.end();
    })
  } catch (e) {
    console.trace(e);
    throw new Error("url covert error " + e.message);
  }

}



module.exports = request