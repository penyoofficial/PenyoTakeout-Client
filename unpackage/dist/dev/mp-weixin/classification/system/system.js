"use strict";
const common_vendor = require("../../common/vendor.js");
const api_running = require("../../api/running.js");
const api_login = require("../../api/login.js");
const uni_modules_uniPay_js_sdk_js_sdk = require("../../uni_modules/uni-pay/js_sdk/js_sdk.js");
require("../../api/utils/request.js");
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_uni_drawer2 = common_vendor.resolveComponent("uni-drawer");
  (_easycom_uni_nav_bar2 + _easycom_uni_segmented_control2 + _easycom_uni_tag2 + _easycom_uni_section2 + _easycom_uni_load_more2 + _easycom_uni_drawer2)();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_uni_segmented_control = () => "../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_uni_drawer = () => "../../uni_modules/uni-drawer/components/uni-drawer/uni-drawer.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_uni_segmented_control + _easycom_uni_tag + _easycom_uni_section + _easycom_uni_load_more + _easycom_uni_drawer)();
}
const _sfc_main = {
  __name: "system",
  setup(__props) {
    const datafile = common_vendor.ref([]);
    const items = common_vendor.ref(["新订单", "待取货", "配送中", "已完成"]);
    const current = common_vendor.ref(0);
    const status = common_vendor.ref("");
    const contentText = common_vendor.ref({
      contentdown: "查看更多",
      contentrefresh: "加载中",
      contentnomore: "没有更多了"
    });
    const page = common_vendor.ref(1);
    const pageSize = common_vendor.ref(5);
    const instance = common_vendor.getCurrentInstance();
    const timeFormat = uni_modules_uniPay_js_sdk_js_sdk.util.timeFormat;
    const runningfile = common_vendor.ref({});
    const singl = common_vendor.ref({});
    const robOrder = (id) => {
      common_vendor.index.showLoading({
        mask: true,
        title: "加载中"
      });
      api_running.roborder(id, runningfile.value).then((res) => {
        console.log(res);
        datafile.value = [];
        getmsg();
        common_vendor.index.hideLoading();
      }).catch((err) => {
        common_vendor.index.hideLoading();
      });
    };
    const claimGoods = (id) => {
      common_vendor.index.showLoading({
        mask: true,
        title: "加载中"
      });
      api_running.updataclaimorder(id).then((res) => {
        console.log(res);
        datafile.value = [];
        fetchMatch("1", "3");
        common_vendor.index.hideLoading();
      }).catch((err) => {
        common_vendor.index.hideLoading();
      });
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
    const finish = (id, price) => {
      common_vendor.index.showLoading({
        mask: true,
        title: "加载中"
      });
      api_running.finishorder(id, runningfile.value, price).then((res) => {
        console.log(res);
        datafile.value = [];
        fetchMatch("2", "3");
        common_vendor.index.hideLoading();
      }).catch((err) => {
        common_vendor.index.hideLoading();
      });
    };
    const loadmore = () => {
      status.value = "loading";
      page.value = page.value + 1;
      if (current.value == 0) {
        getmsg();
      } else if (current.value == 1) {
        fetchMatch("1", "3");
      } else if (current.value == 2) {
        fetchMatch("2", "3");
      } else if (current.value == 3) {
        fetchMatch("3", "4");
      }
    };
    const onClickItem = (e) => {
      page.value = 1;
      pageSize.value = 5;
      datafile.value = [];
      current.value = e.currentIndex;
      if (current.value == 0) {
        getmsg();
      } else if (current.value == 1) {
        fetchMatch("1", "3");
      } else if (current.value == 2) {
        fetchMatch("2", "3");
      } else if (current.value == 3) {
        fetchMatch("3", "4");
      }
    };
    const showDrawer = (e) => {
      getsingle();
      instance.refs[e].open();
    };
    const getsingle = () => {
      common_vendor.index.showLoading({
        mask: true,
        title: "加载中"
      });
      api_running.getsingledose(runningfile.value.openid).then((res) => {
        singl.value = res.data;
        common_vendor.index.hideLoading();
      }).catch((err) => {
        common_vendor.index.hideLoading();
      });
    };
    const change = (e, msg) => {
      console.log(e);
      console.log(msg);
    };
    const quit = () => {
      common_vendor.index.reLaunch({
        url: "/pages/mine/mine"
      });
    };
    const gotodetail = (id) => {
      common_vendor.index.navigateTo({
        url: "../order-details/order-details?id=" + id
      });
    };
    const gotopage = (url) => {
      common_vendor.index.navigateTo({
        url
      });
    };
    const refresh = () => {
      page.value = 1;
      pageSize.value = 5;
      datafile.value = [];
      getmsg();
    };
    const getmsg = () => {
      common_vendor.index.showLoading({
        mask: true,
        title: "加载中"
      });
      api_running.getorderbyrun("2", runningfile.value.gender, page.value, pageSize.value).then((res) => {
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
    const usermsg = () => {
      common_vendor.index.showLoading({
        mask: true,
        title: "加载中"
      });
      api_login.getuser().then((res) => {
        console.log(res);
        runningfile.value = res.data;
        getmsg();
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
    common_vendor.onLoad(() => {
      usermsg();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => showDrawer("showLeft")),
        b: common_vendor.p({
          height: "44px",
          statusBar: "true",
          dark: true,
          fixed: "true",
          ["left-icon"]: "bars",
          leftText: "菜单",
          title: "跑手系统"
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
            b: "73aadffd-2-" + i0,
            c: common_vendor.p({
              text: item.designation,
              type: "primary"
            })
          } : {}, {
            d: item.designation === "垃圾处理"
          }, item.designation === "垃圾处理" ? {
            e: "73aadffd-3-" + i0,
            f: common_vendor.p({
              text: item.designation,
              type: "warning"
            })
          } : {}, {
            g: item.designation === "打赏"
          }, item.designation === "打赏" ? {
            h: "73aadffd-4-" + i0,
            i: common_vendor.p({
              text: item.designation,
              type: "success"
            })
          } : {}, {
            j: common_vendor.t(item.datafile.price),
            k: item.pickupaddress.address
          }, item.pickupaddress.address ? {
            l: "73aadffd-5-" + i0,
            m: common_vendor.p({
              title: `取： ${item.pickupaddress.address}`,
              titleFontSize: "16px",
              subTitleColor: "#333",
              type: "circle"
            })
          } : {}, {
            n: item.closedaddress.address
          }, item.closedaddress.address ? {
            o: "73aadffd-6-" + i0,
            p: common_vendor.p({
              title: `送： ${item.closedaddress.address}`,
              titleFontSize: "16px",
              subTitleColor: "#333",
              type: "circle"
            })
          } : {}, {
            q: common_vendor.t(item.datafile.ordernum),
            r: common_vendor.t(common_vendor.unref(timeFormat)(item.creation_time, "yyyy-MM-dd hh:mm:ss")),
            s: common_vendor.o(($event) => gotodetail(item._id), index)
          }, current.value == 0 ? {
            t: common_vendor.o(($event) => robOrder(item._id), index)
          } : {}, current.value == 1 ? {
            v: common_vendor.o(($event) => claimGoods(item._id), index)
          } : {}, current.value == 2 ? {
            w: common_vendor.o(($event) => finish(item._id, item.datafile.price), index)
          } : {}, {
            x: index
          });
        }),
        f: current.value == 0,
        g: current.value == 1,
        h: current.value == 2,
        i: common_vendor.o(loadmore),
        j: common_vendor.p({
          status: status.value,
          ["content-text"]: contentText.value
        }),
        k: current.value == 0
      }, current.value == 0 ? {} : {}, {
        l: current.value == 0
      }, current.value == 0 ? {
        m: common_vendor.o(refresh)
      } : {}, {
        n: common_vendor.p({
          titleFontSize: "17px",
          type: "line",
          title: "我的账户"
        }),
        o: common_vendor.t(singl.value.price),
        p: common_vendor.p({
          titleFontSize: "17px",
          type: "line",
          title: "订单统计"
        }),
        q: common_vendor.t(singl.value.single),
        r: common_vendor.p({
          titleFontSize: "17px",
          title: "常用功能"
        }),
        s: common_vendor.o(($event) => gotopage("/classification/account/account")),
        t: common_vendor.o(($event) => gotopage("/classification/statistics/statistics")),
        v: common_vendor.o(($event) => gotopage("/classification/fund/fund")),
        w: common_vendor.o(quit),
        x: common_vendor.sr("showLeft", "73aadffd-8"),
        y: common_vendor.o(($event) => change($event, "showLeft")),
        z: common_vendor.p({
          mode: "left",
          width: 250
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBuilderProjects/take-things-page/classification/system/system.vue"]]);
wx.createPage(MiniProgramPage);
