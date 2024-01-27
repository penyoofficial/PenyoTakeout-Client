"use strict";
const api_utils_request = require("./utils/request.js");
function payorderinfo(openId, random, price, designation) {
  return api_utils_request.request({
    method: "post",
    path: "/api/takeing/payorderinfo",
    data: {
      "openId": openId,
      "random": random,
      "price": price,
      "designation": designation
    }
  });
}
exports.payorderinfo = payorderinfo;
