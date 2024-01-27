"use strict";
const common_vendor = require("../../common/vendor.js");
const api_address = require("../../api/address.js");
require("../../api/utils/request.js");
if (!Array) {
  const _easycom_uni_swipe_action_item2 = common_vendor.resolveComponent("uni-swipe-action-item");
  const _easycom_uni_swipe_action2 = common_vendor.resolveComponent("uni-swipe-action");
  (_easycom_uni_swipe_action_item2 + _easycom_uni_swipe_action2)();
}
const _easycom_uni_swipe_action_item = () => "../../uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.js";
const _easycom_uni_swipe_action = () => "../../uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.js";
if (!Math) {
  (_easycom_uni_swipe_action_item + _easycom_uni_swipe_action)();
}
const _sfc_main = {
  __name: "address",
  setup(__props) {
    const num = common_vendor.ref("");
    const addresslist = common_vendor.ref([]);
    const options = common_vendor.ref([{
      text: "删除",
      style: {
        backgroundColor: "#dd524d"
      }
    }]);
    const gotoexit = (id) => {
      common_vendor.index.navigateTo({
        url: "../address/exit/exit?_id=" + id
      });
    };
    const selectadress = (item) => {
      if (num.value === "1") {
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];
        prevPage.onLoad(item);
        common_vendor.index.navigateBack({
          delta: 1
        });
      } else if (num.value === "2") {
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];
        prevPage.onLoad(item);
        common_vendor.index.navigateBack({
          delta: 1
        });
      }
    };
    const onClick = (_id) => {
      common_vendor.index.showLoading({
        mask: true,
        title: "加载中"
      });
      api_address.deleteaddress(_id).then((res) => {
        console.log(res);
        common_vendor.index.hideLoading();
        addressget();
      }).catch((err) => {
        console.log(err);
        common_vendor.index.showToast({
          icon: "error",
          title: "删除失败"
        });
      });
    };
    const checkout = () => {
      let verify = common_vendor.index.getStorageSync("token");
      if (!verify) {
        common_vendor.index.showToast({
          icon: "error",
          title: "请登录小程序！"
        });
        setTimeout(() => {
          common_vendor.index.reLaunch({
            url: "../mine/mine"
          });
        }, 1e3);
      } else {
        addressget();
      }
    };
    const addressget = () => {
      common_vendor.index.showLoading({
        mask: true,
        title: "加载中"
      });
      api_address.getaddress().then((res) => {
        console.log(res);
        addresslist.value = res.data;
        common_vendor.index.hideLoading();
      }).catch((err) => {
        console.log(err);
        common_vendor.index.showToast({
          icon: "error",
          title: "查询失败"
        });
      });
    };
    common_vendor.onShow(() => {
      checkout();
    });
    common_vendor.onLoad((option) => {
      console.log(option);
      num.value = option.num;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(addresslist.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.phone),
            c: common_vendor.t(item.address),
            d: common_vendor.o(($event) => gotoexit(item._id), index),
            e: common_vendor.o(($event) => onClick(item._id), index),
            f: "37a8c447-1-" + i0 + "," + ("37a8c447-0-" + i0),
            g: "37a8c447-0-" + i0,
            h: common_vendor.o(($event) => selectadress(item), index),
            i: index
          };
        }),
        b: common_vendor.p({
          ["right-options"]: options.value
        }),
        c: addresslist.value.length == 0
      }, addresslist.value.length == 0 ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBuilderProjects/take-things-page/pages/address/address.vue"]]);
wx.createPage(MiniProgramPage);
