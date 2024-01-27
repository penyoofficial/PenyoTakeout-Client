"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_merchant = require("../../../api/merchant.js");
require("../../../api/utils/request.js");
const _sfc_main = {
  __name: "set",
  setup(__props) {
    const phone = common_vendor.ref("");
    const phoneNamber = common_vendor.ref("");
    const getmerchant = () => {
      common_vendor.index.showLoading({
        mask: true,
        title: "加载中"
      });
      api_merchant.merchant("1001").then((res) => {
        console.log(res);
        phoneNamber.value = res.data.msg;
        updataphone(res.data.msg);
      }).catch((err) => {
        console.log(err);
        common_vendor.index.hideLoading();
      });
    };
    const updataphone = (num) => {
      phone.value = num.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
      common_vendor.index.hideLoading();
    };
    const call = () => {
      common_vendor.index.showModal({
        title: "拨号确认",
        content: "确定要拨打电话吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.makePhoneCall({
              phoneNumber: phoneNamber.value
            });
          }
        }
      });
    };
    const gotopage = (url) => {
      common_vendor.index.navigateTo({
        url
      });
    };
    const quit = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定退出登录吗？",
        cancelText: "取消",
        // 取消按钮的文字  
        confirmText: "确认",
        // 确认按钮的文字  
        showCancel: true,
        // 是否显示取消按钮，默认为 true
        confirmColor: "#4CD964",
        cancelColor: "#303133",
        success: (res) => {
          if (res.confirm) {
            console.log("comfirm");
            common_vendor.index.clearStorage();
            common_vendor.index.reLaunch({
              url: "../../mine/mine"
            });
          } else {
            console.log("cancel");
          }
        }
      });
    };
    common_vendor.onMounted(() => {
      getmerchant();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => gotopage("../../address/address")),
        b: common_vendor.o(($event) => gotopage("../../other/data/data")),
        c: common_vendor.o(($event) => gotopage("../../other/client/client")),
        d: common_vendor.t(phone.value),
        e: common_vendor.o(call),
        f: common_vendor.o(($event) => gotopage("../../other/about/about")),
        g: common_vendor.o(quit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBuilderProjects/take-things-page/pages/other/set/set.vue"]]);
wx.createPage(MiniProgramPage);
