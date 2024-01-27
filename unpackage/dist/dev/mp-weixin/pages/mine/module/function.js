"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "function",
  setup(__props) {
    const gotopage = (url, num) => {
      common_vendor.index.navigateTo({
        url: url + num
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => gotopage("../address/address?num=", "0")),
        b: common_vendor.o(($event) => gotopage("../other/data/data?num=", "0"))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBuilderProjects/take-things-page/pages/mine/module/function.vue"]]);
wx.createComponent(Component);
