"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "my_order",
  setup(__props) {
    const gontoorder = (url, num) => {
      common_vendor.index.navigateTo({
        url: url + num + "&sc=10"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => gontoorder("../order/order?num=", 0)),
        b: common_vendor.o(($event) => gontoorder("../order/order?num=", 1)),
        c: common_vendor.o(($event) => gontoorder("../order/order?num=", 2)),
        d: common_vendor.o(($event) => gontoorder("../order/order?num=", 3)),
        e: common_vendor.o(($event) => gontoorder("../order/order?num=", 4)),
        f: common_vendor.o(($event) => gontoorder("../order/order?num=", 5))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBuilderProjects/take-things-page/pages/mine/module/my_order.vue"]]);
wx.createComponent(Component);
