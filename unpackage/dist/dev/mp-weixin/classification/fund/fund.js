"use strict";
const common_vendor = require("../../common/vendor.js");
const api_login = require("../../api/login.js");
const api_running = require("../../api/running.js");
const uni_modules_uniPay_js_sdk_js_sdk = require("../../uni_modules/uni-pay/js_sdk/js_sdk.js");
require("../../api/utils/request.js");
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uni_section2 + _easycom_uni_load_more2)();
}
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_section + _easycom_uni_load_more)();
}
const _sfc_main = {
  __name: "fund",
  setup(__props) {
    const runningfile = common_vendor.ref({});
    const datafile = common_vendor.ref([]);
    const page = common_vendor.ref(1);
    const pageSize = common_vendor.ref(5);
    const status = common_vendor.ref("");
    const contentText = common_vendor.ref({
      contentdown: "查看更多",
      contentrefresh: "加载中",
      contentnomore: "没有更多了"
    });
    const timeFormat = uni_modules_uniPay_js_sdk_js_sdk.util.timeFormat;
    const loadmore = () => {
      status.value = "loading";
      page.value = page.value + 1;
      getmsg();
    };
    const usermsg = () => {
      common_vendor.index.showLoading({
        mask: true,
        title: "加载中"
      });
      api_login.getuser().then((res) => {
        console.log(res);
        runningfile.value = res.data;
        getmsg();
        common_vendor.index.hideLoading();
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
    const getmsg = () => {
      common_vendor.index.showLoading({
        mask: true,
        title: "加载中"
      });
      api_running.getaccount(runningfile.value.openid, page.value, pageSize.value).then((res) => {
        console.log(res);
        datafile.value = res.data;
        if (res.data.length < pageSize.value) {
          status.value = "no-more";
        } else {
          status.value = "more";
        }
        common_vendor.index.hideLoading();
      }).catch((err) => {
        console.log(err);
        common_vendor.index.hideLoading();
      });
    };
    common_vendor.onLoad(() => {
      usermsg();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(datafile.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.price > 0
          }, item.price > 0 ? {
            b: common_vendor.t(item.price),
            c: "e2957e86-0-" + i0,
            d: common_vendor.p({
              subTitle: common_vendor.unref(timeFormat)(item.creation_time, "yyyy-MM-dd hh:mm:ss"),
              title: "配送收入",
              titleFontSize: "15px",
              subTitleFontSize: "14px"
            })
          } : {}, {
            e: item.price < 0
          }, item.price < 0 ? {
            f: common_vendor.t(item.price),
            g: "e2957e86-1-" + i0,
            h: common_vendor.p({
              subTitle: common_vendor.unref(timeFormat)(item.creation_time, "yyyy-MM-dd hh:mm:ss"),
              title: "提现",
              titleFontSize: "15px",
              subTitleFontSize: "14px"
            })
          } : {}, {
            i: index
          });
        }),
        b: common_vendor.o(loadmore),
        c: common_vendor.p({
          status: status.value,
          ["content-text"]: contentText.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBuilderProjects/take-things-page/classification/fund/fund.vue"]]);
wx.createPage(MiniProgramPage);
