"use strict";
const common_vendor = require("../common/vendor.js");
const api_utils_request = require("./utils/request.js");
function login(code) {
  return api_utils_request.request({
    method: "post",
    path: "/api/takeing/login",
    data: {
      "code": code
    }
  });
}
function authorization(code, name, gender, phone, head) {
  return api_utils_request.request({
    method: "post",
    path: "/api/takeing/authorization",
    data: {
      "code": code,
      "name": name,
      "gender": gender,
      "phone": phone,
      "head": head
    }
  });
}
function getuser() {
  return api_utils_request.request({
    token: common_vendor.index.getStorageSync("token"),
    method: "post",
    path: "/api/takeing/get-user"
  });
}
function upadteuser(_id, name, gender, head, phone) {
  return api_utils_request.request({
    method: "post",
    path: "/api/takeing/upadteuser",
    data: {
      "_id": _id,
      "name": name,
      "gender": gender,
      "head": head,
      "phone": phone
    }
  });
}
exports.authorization = authorization;
exports.getuser = getuser;
exports.login = login;
exports.upadteuser = upadteuser;
