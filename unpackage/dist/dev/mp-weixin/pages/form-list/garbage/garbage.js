"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_order = require("../../../api/order.js");
const api_login = require("../../../api/login.js");
const api_payOrderinfo = require("../../../api/pay-orderinfo.js");
require("../../../api/utils/request.js");
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  (_easycom_uni_section2 + _easycom_uni_easyinput2)();
}
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  (_easycom_uni_section + _easycom_uni_easyinput)();
}
const _sfc_main = {
  __name: "garbage",
  setup(__props) {
    const pickupreveal = common_vendor.ref({
      "title": "取件地址信息",
      "msg": "点击选择取件信息"
    });
    const pickupaddress = common_vendor.ref({});
    const closedaddress = common_vendor.ref({});
    const openid = common_vendor.ref("");
    const usermessage = common_vendor.ref({});
    const datafile = common_vendor.ref({});
    const judgment = common_vendor.ref("");
    const price = common_vendor.ref("");
    const reward = common_vendor.ref("0");
    const confirm = () => {
      var randomString = generateRandomString(24);
      datafile.value.ordernum = randomString;
      console.log(datafile);
      var a = new common_vendor.BigNumber(datafile.value.price);
      var b = new common_vendor.BigNumber(100);
      var pricenum = a.times(b);
      var designation = "垃圾处理";
      common_vendor.index.showLoading({
        mask: true,
        title: "加载中"
      });
      api_payOrderinfo.payorderinfo(openid.value, randomString, pricenum, designation).then((res) => {
        console.log("209", res);
        common_vendor.index.requestPayment({
          ...res.orderInfo,
          success: (success) => {
            common_vendor.index.hideLoading();
            if (success.errMsg === "requestPayment:ok") {
              console.log("requestPayment:ok");
              uploading("2");
            }
          },
          fail: (err) => {
            if (err.errMsg === "requestPayment:fail cancel") {
              console.log("requestPayment:fail cancel");
              uploading("1");
            }
          }
        });
      }).catch((err) => {
        console.log(err);
        common_vendor.index.hideLoading();
      });
    };
    const uploading = (num) => {
      var designation = "垃圾处理";
      api_order.addorder(usermessage.value, datafile.value, pickupaddress.value, closedaddress.value, num, designation).then((res) => {
        console.log(res);
        common_vendor.index.hideLoading();
        if (num === "2") {
          common_vendor.index.navigateTo({
            url: "/uni_modules/uni-pay/pages/success/success?total_fee=" + datafile.value.price + "&order_no=" + datafile.value.ordernum + "&pay_date=" + res.timestamp
          });
        } else {
          console.log("未付款！");
          common_vendor.index.navigateTo({
            url: "/pages/order/order?num=0&sc=0"
          });
        }
      }).catch((err) => {
        console.log(err);
        common_vendor.index.hideLoading();
      });
    };
    const generateRandomString = (length) => {
      var result = "";
      var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }
      return result;
    };
    const givereward = (e) => {
      if (e.detail.value) {
        datafile.value.reward = e.detail.value;
        reward.value = e.detail.value;
        const a = new common_vendor.BigNumber(e.detail.value);
        const b = new common_vendor.BigNumber(price.value);
        const sum = a.plus(b);
        datafile.value.price = sum.toString();
      } else {
        datafile.value.price = price.value;
      }
    };
    const gotoaddress = (url, num) => {
      judgment.value = "1";
      common_vendor.index.navigateTo({
        url: url + num
      });
    };
    const usermsg = () => {
      common_vendor.index.showLoading({
        mask: true,
        title: "加载中"
      });
      api_login.getuser().then((res) => {
        console.log(res);
        openid.value = res.data.openid;
        usermessage.value = res.data;
        getprice();
      }).catch((err) => {
        console.log(err);
        common_vendor.index.clearStorage();
        common_vendor.index.showToast({
          icon: "error",
          title: "请登录小程序！"
        });
        setTimeout(() => {
          common_vendor.index.reLaunch({
            url: "../../mine/mine"
          });
        }, 1e3);
        common_vendor.index.hideLoading();
      });
    };
    const getprice = () => {
      api_order.rubbish().then((res) => {
        console.log(res);
        datafile.value.price = res.data.price;
        price.value = res.data.price;
        common_vendor.index.hideLoading();
      }).catch((err) => {
        console.log(err);
        common_vendor.index.hideLoading();
      });
    };
    common_vendor.onMounted(() => {
      usermsg();
    });
    common_vendor.onLoad((option) => {
      if (judgment.value === "1") {
        console.log("地址1");
        pickupaddress.value = option;
        pickupreveal.value.title = option.name + "--" + option.phone;
        pickupreveal.value.msg = option.address;
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => gotoaddress("../../address/address?num=", "1")),
        b: common_vendor.p({
          title: pickupreveal.value.title,
          subTitleFontSize: "14px",
          titleFontSize: "16px",
          type: "line",
          subTitle: pickupreveal.value.msg
        }),
        c: common_vendor.o(($event) => datafile.value.describe = $event),
        d: common_vendor.p({
          type: "textarea",
          placeholder: "请输入内容",
          modelValue: datafile.value.describe
        }),
        e: common_vendor.p({
          title: "描述你的需求",
          subTitleFontSize: "14px",
          titleFontSize: "16px",
          type: "line",
          padding: "0px 10px 10px 10px"
        }),
        f: common_vendor.o(givereward),
        g: common_vendor.p({
          titleFontSize: "16px",
          type: "line",
          title: "骑手打赏"
        }),
        h: common_vendor.t(datafile.value.price),
        i: common_vendor.o(confirm)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBuilderProjects/take-things-page/pages/form-list/garbage/garbage.vue"]]);
wx.createPage(MiniProgramPage);
