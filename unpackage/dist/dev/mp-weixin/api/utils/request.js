"use strict";
const common_vendor = require("../../common/vendor.js");
const base_url = "https://fc-mp-33420585-9183-4b24-8565-0e60180fbb5d.next.bspapp.com";
function request(opts) {
  const path = opts["path"];
  const url = base_url + path;
  const token = opts["token"];
  const options = {
    url,
    method: opts["method"],
    data: opts["data"],
    header: {
      "token": token
    }
  };
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      ...options,
      success: (res) => {
        if (res.data.code != 200) {
          console.log(`[业务请求]('${path}')失败，服务器返回异常的状态码:`, res);
          const fakeData = {
            err_code: 1
          };
          reject(fakeData);
          return;
        }
        const bodyData = res.data;
        console.log(`[业务请求]('${path}')响应:`, bodyData);
        resolve(bodyData);
      },
      fail: (err) => {
        console.log(`[业务请求]('${path}')错误:`, err);
        reject(err);
      }
    });
  });
}
exports.request = request;
