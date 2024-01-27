"use strict";
const common_vendor = require("../../common/vendor.js");
const api_running = require("../../api/running.js");
const api_login = require("../../api/login.js");
const uni_modules_uniPay_js_sdk_js_sdk = require("../../uni_modules/uni-pay/js_sdk/js_sdk.js");
require("../../api/utils/request.js");
if (!Array) {
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uni_tag2 + _easycom_uni_section2 + _easycom_uni_load_more2)();
}
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_tag + _easycom_uni_section + _easycom_uni_load_more)();
}
const _sfc_main = {
  __name: "statistics",
  setup(__props) {
    const timeFormat = uni_modules_uniPay_js_sdk_js_sdk.util.timeFormat;
    const page = common_vendor.ref(1);
    const pageSize = common_vendor.ref(5);
    const runningfile = common_vendor.ref({});
    const datafile = common_vendor.ref([]);
    const status = common_vendor.ref("");
    const contentText = common_vendor.ref({
      contentdown: "查看更多",
      contentrefresh: "加载中",
      contentnomore: "没有更多了"
    });
    const gotodetail = (id) => {
      common_vendor.index.navigateTo({
        url: "../order-details/order-details?id=" + id
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
        fetchMatch("3", "4");
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
    const loadmore = () => {
      status.value = "loading";
      page.value = page.value + 1;
      fetchMatch("3", "4");
    };
    const fetchMatch = (num, state) => {
      common_vendor.index.showLoading({
        mask: true,
        title: "加载中"
      });
      api_running.getorderbyrunstate(runningfile.value.openid, num, page.value, pageSize.value, state).then((res) => {
        datafile.value.push(...res.data);
        if (res.data.length < pageSize.value) {
          status.value = "no-more";
        } else {
          status.value = "more";
        }
        common_vendor.index.hideLoading();
      }).catch((err) => {
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
            a: item.designation === "快递代取"
          }, item.designation === "快递代取" ? {
            b: "80d84d06-0-" + i0,
            c: common_vendor.p({
              text: item.designation,
              type: "primary"
            })
          } : {}, {
            d: item.designation === "垃圾处理"
          }, item.designation === "垃圾处理" ? {
            e: "80d84d06-1-" + i0,
            f: common_vendor.p({
              text: item.designation,
              type: "warning"
            })
          } : {}, {
            g: item.designation === "打赏"
          }, item.designation === "打赏" ? {
            h: "80d84d06-2-" + i0,
            i: common_vendor.p({
              text: item.designation,
              type: "success"
            })
          } : {}, {
            j: common_vendor.t(item.datafile.price),
            k: item.pickupaddress.address
          }, item.pickupaddress.address ? {
            l: "80d84d06-3-" + i0,
            m: common_vendor.p({
              title: `取： ${item.pickupaddress.address}`,
              titleFontSize: "16px",
              subTitleColor: "#333",
              type: "circle"
            })
          } : {}, {
            n: item.closedaddress.address
          }, item.closedaddress.address ? {
            o: "80d84d06-4-" + i0,
            p: common_vendor.p({
              title: `送： ${item.closedaddress.address}`,
              titleFontSize: "16px",
              subTitleColor: "#333",
              type: "circle"
            })
          } : {}, {
            q: common_vendor.t(item.datafile.ordernum),
            r: common_vendor.t(common_vendor.unref(timeFormat)(item.creation_time, "yyyy-MM-dd hh:mm:ss")),
            s: common_vendor.o(($event) => gotodetail(item._id), index),
            t: index
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBuilderProjects/take-things-page/classification/statistics/statistics.vue"]]);
wx.createPage(MiniProgramPage);
