"use strict";
const api_utils_request = require("./utils/request.js");
function merchant(id) {
  return api_utils_request.request({
    method: "post",
    path: "/api/takeing/merchant",
    data: {
      "id": id
    }
  });
}
function idea(msg, phone) {
  return api_utils_request.request({
    method: "post",
    path: "/api/takeing/idea",
    data: {
      "msg": msg,
      "phone": phone
    }
  });
}
function getabout() {
  return api_utils_request.request({
    method: "post",
    path: "/api/takeing/getabout"
  });
}
function getexpressage() {
  return api_utils_request.request({
    method: "post",
    path: "/api/takeing/getexpressage"
  });
}
exports.getabout = getabout;
exports.getexpressage = getexpressage;
exports.idea = idea;
exports.merchant = merchant;
