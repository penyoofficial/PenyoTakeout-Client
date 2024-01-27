"use strict";
const common_vendor = require("../../common/vendor.js");
const api_order = require("../../api/order.js");
const api_login = require("../../api/login.js");
const uni_modules_uniPay_js_sdk_js_sdk = require("../../uni_modules/uni-pay/js_sdk/js_sdk.js");
require("../../api/utils/request.js");
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uni_nav_bar2 + _easycom_uni_segmented_control2 + _easycom_uni_tag2 + _easycom_uni_section2 + _easycom_uni_load_more2)();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_uni_segmented_control = () => "../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_uni_segmented_control + _easycom_uni_tag + _easycom_uni_section + _easycom_uni_load_more)();
}
const _sfc_main = {
  __name: "order",
  setup(__props) {
    const items = common_vendor.ref(["全部", "待接单", "待收货", "已完成", "已取消", "退款/售后"]);
    const current = common_vendor.ref(0);
    const sc = common_vendor.ref("");
    const openid = common_vendor.ref("");
    const datafile = common_vendor.ref([]);
    const contentText = common_vendor.ref({
      contentdown: "查看更多",
      contentrefresh: "加载中",
      contentnomore: "没有更多了"
    });
    const status = common_vendor.ref("");
    const page = common_vendor.ref(1);
    const pageSize = common_vendor.ref(5);
    const timeFormat = uni_modules_uniPay_js_sdk_js_sdk.util.timeFormat;
    const gotopage = (id) => {
      common_vendor.index.navigateTo({
        url: "/pages/order-details/order-details?id=" + id
      });
    };
    const onClickItem = (e) => {
      page.value = 1;
      datafile.value = [];
      current.value = e.currentIndex;
      console.log(current);
      if (current.value == 0) {
        allorder();
      } else if (current.value == 1) {
        orderbystate("2");
      } else if (current.value == 2) {
        orderbystate("3");
      } else if (current.value == 3) {
        orderbystate("4");
      } else if (current.value == 4) {
        orderbystate("1");
      } else if (current.value == 5) {
        orderbystate("5");
      }
    };
    const quit = () => {
      if (sc.value === "10") {
        common_vendor.index.navigateBack();
      } else {
        common_vendor.index.reLaunch({
          url: "../mine/mine"
        });
      }
    };
    const usermsg = () => {
      common_vendor.index.showLoading({
        mask: true,
        title: "加载中"
      });
      api_login.getuser().then((res) => {
        console.log(res);
        openid.value = res.data.openid;
        if (current.value == 0) {
          allorder();
        } else if (current.value == 1) {
          orderbystate("2");
        } else if (current.value == 2) {
          orderbystate("3");
        } else if (current.value == 3) {
          orderbystate("4");
        } else if (current.value == 4) {
          orderbystate("1");
        } else if (current.value == 5) {
          orderbystate("5");
        }
      }).catch((err) => {
        console.log(err);
        common_vendor.index.clearStorage();
        common_vendor.index.showToast({
          icon: "error",
          title: "请登录小程序！"
        });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1e3);
        common_vendor.index.hideLoading();
      });
    };
    const allorder = () => {
      common_vendor.index.showLoading({
        mask: true,
        title: "加载中"
      });
      api_order.getallorder(openid.value, page.value, pageSize.value).then((res) => {
        datafile.value.push(...res.data);
        console.log(datafile);
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
    const orderbystate = (num) => {
      common_vendor.index.showLoading({
        mask: true,
        title: "加载中"
      });
      api_order.getorderbystate(openid.value, num, page.value, pageSize.value).then((res) => {
        datafile.value.push(...res.data);
        console.log(datafile);
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
    const loadmore = () => {
      status.value = "loading";
      page.value = page.value + 1;
      if (current.value == 0) {
        allorder();
      } else if (current.value == 1) {
        orderbystate("2");
      } else if (current.value == 2) {
        orderbystate("3");
      } else if (current.value == 3) {
        orderbystate("4");
      } else if (current.value == 4) {
        orderbystate("1");
      } else if (current.value == 5) {
        orderbystate("5");
      }
    };
    common_vendor.onLoad((option) => {
      usermsg();
      console.log(option);
      current.value = parseInt(option.num);
      sc.value = option.sc;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(quit),
        b: common_vendor.p({
          shadow: true,
          ["left-icon"]: "home",
          leftText: "返回",
          title: "订单管理",
          statusBar: "true",
          dark: true,
          fixed: "true"
        }),
        c: common_vendor.o(onClickItem),
        d: common_vendor.p({
          current: current.value,
          values: items.value,
          ["style-type"]: "text",
          ["active-color"]: "#000000"
        }),
        e: common_vendor.f(datafile.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.designation === "快递代取"
          }, item.designation === "快递代取" ? {
            b: "61b4348a-2-" + i0,
            c: common_vendor.p({
              text: item.designation,
              type: "primary"
            })
          } : {}, {
            d: item.designation === "垃圾处理"
          }, item.designation === "垃圾处理" ? {
            e: "61b4348a-3-" + i0,
            f: common_vendor.p({
              text: item.designation,
              type: "warning"
            })
          } : {}, {
            g: item.designation === "打赏"
          }, item.designation === "打赏" ? {
            h: "61b4348a-4-" + i0,
            i: common_vendor.p({
              text: item.designation,
              type: "success"
            })
          } : {}, {
            j: common_vendor.t(item.datafile.price),
            k: item.pickupaddress.address
          }, item.pickupaddress.address ? {
            l: "61b4348a-5-" + i0,
            m: common_vendor.p({
              title: `取： ${item.pickupaddress.address}`,
              titleFontSize: "16px",
              subTitleColor: "#333",
              type: "circle"
            })
          } : {}, {
            n: item.closedaddress.address
          }, item.closedaddress.address ? {
            o: "61b4348a-6-" + i0,
            p: common_vendor.p({
              title: `送： ${item.closedaddress.address}`,
              titleFontSize: "16px",
              subTitleColor: "#333",
              type: "circle"
            })
          } : {}, {
            q: common_vendor.t(item.datafile.ordernum),
            r: common_vendor.t(common_vendor.unref(timeFormat)(item.creation_time, "yyyy-MM-dd hh:mm:ss")),
            s: common_vendor.o(($event) => gotopage(item._id), index),
            t: index
          });
        }),
        f: common_vendor.o(loadmore),
        g: common_vendor.p({
          status: status.value,
          ["content-text"]: contentText.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBuilderProjects/take-things-page/pages/order/order.vue"]]);
wx.createPage(MiniProgramPage);
