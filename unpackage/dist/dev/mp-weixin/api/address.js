"use strict";
const common_vendor = require("../common/vendor.js");
const api_utils_request = require("./utils/request.js");
function addaddress(name, phone, address) {
  return api_utils_request.request({
    token: common_vendor.index.getStorageSync("token"),
    method: "post",
    path: "/api/takeing/add-address",
    data: {
      "name": name,
      "phone": phone,
      "address": address
    }
  });
}
function getaddress() {
  return api_utils_request.request({
    token: common_vendor.index.getStorageSync("token"),
    method: "post",
    path: "/api/takeing/get-address"
  });
}
function getaddressbyid(_id) {
  return api_utils_request.request({
    method: "post",
    path: "/api/takeing/getaddressbyid",
    data: {
      "_id": _id
    }
  });
}
function deleteaddress(_id) {
  return api_utils_request.request({
    method: "post",
    path: "/api/takeing/deleteaddress",
    data: {
      "_id": _id
    }
  });
}
function updateaddress(_id, name, phone, address) {
  return api_utils_request.request({
    method: "post",
    path: "/api/takeing/updateaddress",
    data: {
      "_id": _id,
      "name": name,
      "phone": phone,
      "address": address
    }
  });
}
exports.addaddress = addaddress;
exports.deleteaddress = deleteaddress;
exports.getaddress = getaddress;
exports.getaddressbyid = getaddressbyid;
exports.updateaddress = updateaddress;
