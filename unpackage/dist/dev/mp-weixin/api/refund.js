"use strict";
const api_utils_request = require("./utils/request.js");
function updataorder(id) {
  return api_utils_request.request({
    method: "post",
    path: "/api/takeing/updataorder",
    data: {
      "id": id
    }
  });
}
exports.updataorder = updataorder;
