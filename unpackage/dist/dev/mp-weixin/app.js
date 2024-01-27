"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/mine/mine.js";
  "./pages/order/order.js";
  "./pages/login/login.js";
  "./pages/other/set/set.js";
  "./pages/other/data/data.js";
  "./pages/other/about/about.js";
  "./pages/other/run/run.js";
  "./pages/address/address.js";
  "./pages/form-list/expressage/expressage.js";
  "./pages/address/exit/exit.js";
  "./pages/address/add/add.js";
  "./pages/other/client/client.js";
  "./pages/form-list/garbage/garbage.js";
  "./pages/form-list/object/object.js";
  "./uni_modules/uni-pay/pages/success/success.js";
  "./pages/order-details/order-details.js";
  "./classification/system/system.js";
  "./classification/account/account.js";
  "./classification/statistics/statistics.js";
  "./classification/fund/fund.js";
  "./classification/order-details/order-details.js";
  "./classification/withdraw/withdraw.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBuilderProjects/take-things-page/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
