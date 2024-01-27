"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_merchant = require("../../../api/merchant.js");
const utils_qqmapWxJssdk_min = require("../../../utils/qqmap-wx-jssdk.min.js");
require("../../../api/utils/request.js");
if (!Array) {
  const _easycom_uni_notice_bar2 = common_vendor.resolveComponent("uni-notice-bar");
  _easycom_uni_notice_bar2();
}
const _easycom_uni_notice_bar = () => "../../../uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.js";
if (!Math) {
  _easycom_uni_notice_bar();
}
const _sfc_main = {
  __name: "home-page",
  setup(__props) {
    const address = common_vendor.ref("定位中...");
    const announcement = common_vendor.ref("");
    const getmerchant = () => {
      api_merchant.merchant("1000").then((res) => {
        console.log(res);
        announcement.value = res.data.msg;
      }).catch((err) => {
        console.log(err);
      });
    };
    const gotopage = (url) => {
      common_vendor.index.navigateTo({
        url
      });
    };
    const authorization = () => {
      address.value = "定位中...";
      common_vendor.index.getSetting({
        success(res) {
          console.log(res);
          if (!res.authSetting["scope.userLocation"]) {
            pullup();
          } else {
            getLocation();
          }
        }
      });
    };
    const pullup = () => {
      common_vendor.index.authorize({
        scope: "scope.userLocation",
        success() {
          getLocation();
        },
        fail(error) {
          common_vendor.index.showModal({
            title: "提示",
            content: "若点击不授权，将无法使用位置功能",
            cancelText: "不授权",
            cancelColor: "#999",
            confirmText: "授权",
            confirmColor: "#f94218",
            success(res) {
              console.log(res);
              if (res.confirm) {
                common_vendor.index.openSetting({
                  success: (res2) => {
                    if (res2.authSetting["scope.userLocation"]) {
                      common_vendor.index.showToast({
                        title: "授权成功",
                        icon: "none"
                      });
                    } else {
                      common_vendor.index.showToast({
                        title: "授权失败",
                        icon: "none"
                      });
                    }
                  }
                });
              } else if (res.cancel) {
                console.log("用户点击不授权");
              }
            }
          });
        }
      });
    };
    const getLocation = () => {
      common_vendor.index.getLocation({
        type: "wgs84",
        success: function(res) {
          console.log(res);
          console.log("当前位置的经度：" + res.longitude);
          console.log("当前位置的纬度：" + res.latitude);
          analysis(res.latitude, res.longitude);
        },
        fail(error) {
          address.value = "定位失败";
          console.log("失败", error);
        }
      });
    };
    const analysis = (latitude, longitude) => {
      var qqmapsdk = new utils_qqmapWxJssdk_min.QQMapWX({
        key: "RLQBZ-EFCWG-2B6QG-Q7FNU-UFMDO-IHBB6"
        // 必填
      });
      qqmapsdk.reverseGeocoder({
        //Object格式
        location: {
          latitude,
          longitude
        },
        success: function(res) {
          console.log(res);
          address.value = res.result.formatted_addresses.recommend;
        },
        fail: function(error) {
          console.error(error);
          address.value = "定位失败";
        }
      });
    };
    common_vendor.onMounted(() => {
      getmerchant();
      authorization();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(address.value),
        b: common_vendor.o(authorization),
        c: announcement.value
      }, announcement.value ? {
        d: common_vendor.p({
          ["show-icon"]: true,
          scrollable: true,
          text: announcement.value
        })
      } : {}, {
        e: common_vendor.o(($event) => gotopage("../form-list/expressage/expressage")),
        f: common_vendor.o(($event) => gotopage("../form-list/garbage/garbage"))
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBuilderProjects/take-things-page/pages/index/module/home-page.vue"]]);
wx.createComponent(Component);
