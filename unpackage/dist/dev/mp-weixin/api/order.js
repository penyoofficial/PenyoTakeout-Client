"use strict";
const common_vendor = require("../common/vendor.js");
const api_utils_request = require("./utils/request.js");
function rubbish() {
  return api_utils_request.request({
    method: "post",
    path: "/api/takeing/rubbish"
  });
}
function addorder(usermessage, datafile, pickupaddress, closedaddress, state, designation) {
  return api_utils_request.request({
    method: "post",
    path: "/api/takeing/addorder",
    data: {
      "usermessage": usermessage,
      "datafile": datafile,
      "pickupaddress": pickupaddress,
      "closedaddress": closedaddress,
      "state": state,
      "designation": designation
    }
  });
}
function getallorder(openid, page, pageSize) {
  return api_utils_request.request({
    method: "post",
    path: "/api/takeing/getallorder",
    data: {
      "openid": openid,
      "page": page,
      "pageSize": pageSize
    }
  });
}
function getorderbystate(openid, state, page, pageSize) {
  return api_utils_request.request({
    method: "post",
    path: "/api/takeing/getorderbystate",
    data: {
      "openid": openid,
      "state": state,
      "page": page,
      "pageSize": pageSize
    }
  });
}
function getorderbydata() {
  return api_utils_request.request({
    token: common_vendor.index.getStorageSync("token"),
    method: "post",
    path: "/api/takeing/getorderbydata"
  });
}
function getorderbyid(id) {
  return api_utils_request.request({
    method: "post",
    path: "/api/takeing/getorderbyid",
    data: {
      "id": id
    }
  });
}
exports.addorder = addorder;
exports.getallorder = getallorder;
exports.getorderbydata = getorderbydata;
exports.getorderbyid = getorderbyid;
exports.getorderbystate = getorderbystate;
exports.rubbish = rubbish;
