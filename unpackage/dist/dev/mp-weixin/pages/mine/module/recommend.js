"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "recommend",
  setup(__props) {
    const gotopage = (url) => {
      common_vendor.index.navigateTo({
        url
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => gotopage("../other/run/run")),
        b: common_vendor.o(($event) => gotopage("../other/client/client")),
        c: common_vendor.o(($event) => gotopage("../other/about/about"))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBuilderProjects/take-things-page/pages/mine/module/recommend.vue"]]);
wx.createComponent(Component);
