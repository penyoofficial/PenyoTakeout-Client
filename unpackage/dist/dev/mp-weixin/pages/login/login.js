"use strict";
const common_vendor = require("../../common/vendor.js");
const api_login = require("../../api/login.js");
require("../../api/utils/request.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const phone = common_vendor.ref("");
    const name = common_vendor.ref("");
    const gender = common_vendor.ref("");
    const head = common_vendor.ref("");
    const getPhoneNumber = (e) => {
      common_vendor.index.clearStorage();
      console.log(e);
      if (e.detail.errMsg == "getPhoneNumber:ok") {
        common_vendor.index.showLoading({
          mask: true,
          title: "加载中"
        });
        let code = e.detail.code;
        api_login.login(code).then((res) => {
          console.log(res);
          phone.value = res.msg.data.phone_info.phoneNumber;
          usersmsg();
        }).catch((err) => {
          console.log(err);
          common_vendor.index.showToast({
            title: "授权失败",
            icon: "none"
          });
        });
      }
    };
    const usersmsg = () => {
      common_vendor.index.hideLoading();
      common_vendor.index.showModal({
        title: "提示",
        content: "授权获取用户信息！",
        cancelText: "不授权",
        cancelColor: "#999",
        confirmText: "授权",
        confirmColor: "#f94218",
        success(res) {
          console.log(res);
          if (res.confirm) {
            authorizationusers();
          } else if (res.cancel) {
            console.log("用户点击不授权");
            common_vendor.index.showToast({
              title: "授权失败",
              icon: "none"
            });
          }
        }
      });
    };
    const authorizationusers = () => {
      common_vendor.index.showLoading({
        mask: true,
        title: "加载中"
      });
      common_vendor.index.getUserProfile({
        desc: "用于完善用户信息",
        success: (res) => {
          console.log(res);
          name.value = res.userInfo.nickName;
          if (res.userInfo.gender == 0) {
            gender.value = "男";
          } else {
            gender.value = "女";
          }
          head.value = res.userInfo.avatarUrl;
          getcode();
        },
        fail: (err) => {
          console.log(err);
          common_vendor.index.showToast({
            title: "授权失败",
            icon: "none"
          });
        }
      });
    };
    const getcode = () => {
      common_vendor.index.login({
        provider: "weixin",
        onlyAuthorize: true,
        success: function(loginRes) {
          console.log(loginRes);
          background(loginRes.code);
        },
        fail: (err) => {
          console.log(err);
          common_vendor.index.showToast({
            title: "授权失败",
            icon: "none"
          });
        }
      });
    };
    const background = (code) => {
      console.log("请求后台");
      api_login.authorization(code, name.value, gender.value, phone.value, head.value).then((res) => {
        console.log(res);
        common_vendor.index.setStorageSync("token", res.token);
        common_vendor.index.showToast({
          title: "授权成功",
          icon: "none"
        });
        setTimeout(() => {
          common_vendor.index.reLaunch({
            url: "../mine/mine"
          });
        }, 500);
      }).catch((err) => {
        console.log(err);
        common_vendor.index.showToast({
          title: "授权失败",
          icon: "none"
        });
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(getPhoneNumber)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBuilderProjects/take-things-page/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
