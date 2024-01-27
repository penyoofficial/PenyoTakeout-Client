"use strict";
const common_vendor = require("../common/vendor.js");
const api_utils_request = require("./utils/request.js");
function addrunning(identity, identityimg) {
  return api_utils_request.request({
    token: common_vendor.index.getStorageSync("token"),
    method: "post",
    path: "/api/takeing/addrunning",
    data: {
      "identity": identity,
      "identityimg": identityimg
    }
  });
}
function getrunning() {
  return api_utils_request.request({
    token: common_vendor.index.getStorageSync("token"),
    method: "post",
    path: "/api/takeing/getrunning"
  });
}
function upadterunning(_id, name, gender, head, phone) {
  return api_utils_request.request({
    method: "post",
    path: "/api/takeing/upadterunning",
    data: {
      "userid": _id,
      "name": name,
      "gender": gender,
      "head": head,
      "phone": phone
    }
  });
}
function getorderbyrun(state, gender, page, pageSize) {
  return api_utils_request.request({
    method: "post",
    path: "/api/takeing/getorderbyrun",
    data: {
      "state": state,
      "gender": gender,
      "page": page,
      "pageSize": pageSize
    }
  });
}
function roborder(id, runningfile) {
  return api_utils_request.request({
    method: "post",
    path: "/api/takeing/roborder",
    data: {
      "id": id,
      "runningfile": runningfile
    }
  });
}
function getorderbyrunstate(openid, runstate, page, pageSize, state) {
  return api_utils_request.request({
    method: "post",
    path: "/api/takeing/getorderbyrunstate",
    data: {
      "openid": openid,
      "runstate": runstate,
      "page": page,
      "pageSize": pageSize,
      "state": state
    }
  });
}
function updataclaimorder(id) {
  return api_utils_request.request({
    method: "post",
    path: "/api/takeing/updataclaimorder",
    data: {
      "id": id
    }
  });
}
function finishorder(id, runningmsg, price) {
  return api_utils_request.request({
    method: "post",
    path: "/api/takeing/finishorder",
    data: {
      "id": id,
      "runningmsg": runningmsg,
      "price": price
    }
  });
}
function getsingledose(openid) {
  return api_utils_request.request({
    method: "post",
    path: "/api/takeing/getsingledose",
    data: {
      "openid": openid
    }
  });
}
function getaccountprice(openid) {
  return api_utils_request.request({
    method: "post",
    path: "/api/takeing/getaccountprice",
    data: {
      "openid": openid
    }
  });
}
function getaccount(openid, page, pageSize) {
  return api_utils_request.request({
    method: "post",
    path: "/api/takeing/getaccount",
    data: {
      "openid": openid,
      "page": page,
      "pageSize": pageSize
    }
  });
}
function addwithdraw(runningfile, withdraw, image) {
  return api_utils_request.request({
    method: "post",
    path: "/api/takeing/addwithdraw",
    data: {
      "runningfile": runningfile,
      "withdraw": withdraw,
      "image": image
    }
  });
}
function addaccount(runningmsg, price) {
  return api_utils_request.request({
    method: "post",
    path: "/api/takeing/addaccount",
    data: {
      "runningmsg": runningmsg,
      "price": price
    }
  });
}
exports.addaccount = addaccount;
exports.addrunning = addrunning;
exports.addwithdraw = addwithdraw;
exports.finishorder = finishorder;
exports.getaccount = getaccount;
exports.getaccountprice = getaccountprice;
exports.getorderbyrun = getorderbyrun;
exports.getorderbyrunstate = getorderbyrunstate;
exports.getrunning = getrunning;
exports.getsingledose = getsingledose;
exports.roborder = roborder;
exports.upadterunning = upadterunning;
exports.updataclaimorder = updataclaimorder;
