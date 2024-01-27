"use strict";
const common_vendor = require("../../common/vendor.js");
const api_login = require("../../api/login.js");
require("../../api/utils/request.js");
if (!Math) {
  (MyOrder + Rider + Function + Recommend)();
}
const MyOrder = () => "./module/my_order.js";
const Function = () => "./module/function.js";
const Recommend = () => "./module/recommend.js";
const Rider = () => "./module/rider.js";
const _sfc_main = {
  __name: "mine",
  setup(__props) {
    common_vendor.defineComponent({
      components: {
        MyOrder,
        Function,
        Recommend,
        Rider
      }
    });
    const appVersion = common_vendor.ref("");
    const loginverify = common_vendor.ref(false);
    const loginverifyshow = common_vendor.ref(true);
    const usermsglist = common_vendor.ref([]);
    const phone = common_vendor.ref("");
    const gotopage = (url) => {
      common_vendor.index.navigateTo({
        url
      });
    };
    const getversion = () => {
      let accountInfo = common_vendor.wx$1.getAccountInfoSync();
      let envVersion = accountInfo.miniProgram.envVersion;
      if (envVersion !== "release") {
        appVersion.value = envVersion + common_vendor.index.getSystemInfoSync().appVersion;
      } else {
        appVersion.value = accountInfo.miniProgram.version;
      }
      console.log(appVersion);
    };
    const usermsg = () => {
      common_vendor.index.showLoading({
        mask: true,
        title: "加载中"
      });
      api_login.getuser().then((res) => {
        console.log(res);
        loginverify.value = true;
        usermsglist.value = res.data;
        updataphone(res.data.phone);
      }).catch((err) => {
        console.log(err);
        loginverifyshow.value = false;
        common_vendor.index.clearStorage();
        common_vendor.index.hideLoading();
      });
    };
    const updataphone = (num) => {
      phone.value = num.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
      common_vendor.index.hideLoading();
    };
    common_vendor.onMounted(() => {
      usermsg();
      getversion();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: loginverify.value
      }, loginverify.value ? {
        b: usermsglist.value.head,
        c: common_vendor.o(($event) => gotopage("../other/data/data")),
        d: common_vendor.t(usermsglist.value.name),
        e: common_vendor.t(phone.value),
        f: common_vendor.o(($event) => gotopage("../other/data/data")),
        g: common_vendor.o(($event) => gotopage("../other/set/set"))
      } : {}, {
        h: !loginverify.value && !loginverifyshow.value
      }, !loginverify.value && !loginverifyshow.value ? {
        i: common_vendor.o(($event) => gotopage("../login/login"))
      } : {}, {
        j: usermsglist.value.role === "员工"
      }, usermsglist.value.role === "员工" ? {} : {}, {
        k: common_vendor.t(appVersion.value),
        l: appVersion.value
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBuilderProjects/take-things-page/pages/mine/mine.vue"]]);
wx.createPage(MiniProgramPage);
