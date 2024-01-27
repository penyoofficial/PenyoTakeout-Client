"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "rider",
  setup(__props) {
    const gotopage = (url) => {
      common_vendor.index.navigateTo({
        url
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => gotopage("/classification/system/system")),
        b: common_vendor.o(($event) => gotopage("/classification/account/account")),
        c: common_vendor.o(($event) => gotopage("/classification/statistics/statistics")),
        d: common_vendor.o(($event) => gotopage("/classification/fund/fund"))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBuilderProjects/take-things-page/pages/mine/module/rider.vue"]]);
wx.createComponent(Component);
