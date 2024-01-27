"use strict";
const common_vendor = require("../../common/vendor.js");
const api_running = require("../../api/running.js");
const api_login = require("../../api/login.js");
require("../../api/utils/request.js");
const _sfc_main = {
  __name: "account",
  setup(__props) {
    const price = common_vendor.ref("");
    const runningfile = common_vendor.ref({});
    const gotopage = (url) => {
      common_vendor.index.navigateTo({
        url: url + price.value
      });
    };
    const usermsg = () => {
      common_vendor.index.showLoading({
        mask: true,
        title: "加载中"
      });
      api_login.getuser().then((res) => {
        console.log(res);
        runningfile.value = res.data;
        prcice();
      }).catch((err) => {
        console.log(err);
        common_vendor.index.showToast({
          icon: "error",
          title: "出错了！"
        });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1e3);
        common_vendor.index.hideLoading();
      });
    };
    const prcice = () => {
      common_vendor.index.showLoading({
        mask: true,
        title: "加载中"
      });
      api_running.getaccountprice(runningfile.value.openid).then((res) => {
        price.value = res.data;
        common_vendor.index.hideLoading();
      }).catch((err) => {
        common_vendor.index.hideLoading();
      });
    };
    common_vendor.onShow(() => {
      usermsg();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(price.value),
        b: common_vendor.o(($event) => gotopage("/classification/withdraw/withdraw?price=")),
        c: common_vendor.o(($event) => gotopage("/classification/statistics/statistics?price=")),
        d: common_vendor.o(($event) => gotopage("/classification/fund/fund?price=")),
        e: common_vendor.o(($event) => gotopage("/classification/withdraw/withdraw?price="))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBuilderProjects/take-things-page/classification/account/account.vue"]]);
wx.createPage(MiniProgramPage);
