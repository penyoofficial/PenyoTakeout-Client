"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_merchant = require("../../../api/merchant.js");
require("../../../api/utils/request.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  _easycom_uni_easyinput2();
}
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  _easycom_uni_easyinput();
}
const _sfc_main = {
  __name: "client",
  setup(__props) {
    const msg = common_vendor.ref("");
    const phone = common_vendor.ref("");
    const send = () => {
      if (!msg) {
        common_vendor.index.showToast({
          title: "请输入意见！",
          icon: "none"
        });
        return;
      }
      if (!phone) {
        common_vendor.index.showToast({
          title: "请输入联系电话！",
          icon: "none"
        });
        return;
      }
      if (!/^1[3-9]\d{9}$/.test(phone.value)) {
        common_vendor.index.showToast({
          title: "手机号格式不正确！",
          icon: "none"
        });
        return;
      }
      console.log("校验完成");
      putidea();
    };
    const putidea = () => {
      common_vendor.index.showLoading({
        mask: true,
        title: "加载中"
      });
      api_merchant.idea(msg.value, phone.value).then((res) => {
        console.log(res);
        common_vendor.index.showToast({
          icon: "success",
          title: "反馈成功"
        });
        msg.value = null;
        phone.value = null;
      }).catch((err) => {
        console.log(err);
        common_vendor.index.showToast({
          icon: "error",
          title: "反馈失败"
        });
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => msg.value = $event),
        b: common_vendor.p({
          type: "textarea",
          placeholder: "请输入内容",
          modelValue: msg.value
        }),
        c: common_vendor.o(($event) => phone.value = $event),
        d: common_vendor.p({
          trim: "all",
          placeholder: "请输入联系电话",
          modelValue: phone.value
        }),
        e: common_vendor.o(send)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBuilderProjects/take-things-page/pages/other/client/client.vue"]]);
wx.createPage(MiniProgramPage);
