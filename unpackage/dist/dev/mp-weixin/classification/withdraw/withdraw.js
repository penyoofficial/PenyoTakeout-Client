"use strict";
const common_vendor = require("../../common/vendor.js");
const api_running = require("../../api/running.js");
const api_login = require("../../api/login.js");
require("../../api/utils/request.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  (_easycom_uni_easyinput2 + _easycom_uni_section2 + _easycom_uni_file_picker2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_section + _easycom_uni_file_picker)();
}
const _sfc_main = {
  __name: "withdraw",
  setup(__props) {
    const runningfile = common_vendor.ref({});
    const way = common_vendor.ref(["album", "camera"]);
    const price = common_vendor.ref();
    const withdraw = common_vendor.ref();
    const identityimg = common_vendor.ref("");
    const submit = () => {
      common_vendor.index.showLoading({
        mask: true,
        title: "加载中"
      });
      if (!withdraw.value) {
        common_vendor.index.showToast({
          icon: "error",
          title: "请输入提现金额"
        });
        return;
      }
      if (withdraw.value > price.value) {
        common_vendor.index.showToast({
          icon: "error",
          title: "金额大于余额"
        });
        return;
      }
      if (!identityimg.value) {
        common_vendor.index.showToast({
          icon: "error",
          title: "请上传微信收款码"
        });
        return;
      }
      withdrawDeposit();
    };
    const withdrawDeposit = () => {
      api_running.addwithdraw(runningfile.value, withdraw.value, identityimg.value).then((res) => {
        console.log(res);
        addaccountmsg();
        common_vendor.index.hideLoading();
      }).catch((err) => {
        console.log(err);
        common_vendor.index.showToast({
          icon: "error",
          title: "出错了！"
        });
        common_vendor.index.hideLoading();
      });
    };
    const addaccountmsg = () => {
      var negativeNum = -withdraw.value;
      api_running.addaccount(runningfile.value, negativeNum).then((res) => {
        console.log(res);
        common_vendor.index.showToast({
          icon: "none",
          title: "提现成功！"
        });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1e3);
        common_vendor.index.hideLoading();
      }).catch((err) => {
        console.log(err);
        common_vendor.index.showToast({
          icon: "error",
          title: "出错了！"
        });
        common_vendor.index.hideLoading();
      });
    };
    const addsuccess = (e) => {
      console.log(e);
      identityimg.value = e.tempFilePaths[0];
    };
    const addfail = (e) => {
      console.log(e);
      common_vendor.index.showToast({
        icon: "error",
        title: "图片上传失败！"
      });
    };
    const deleteimg = (e) => {
      console.log(e);
    };
    const usermsg = () => {
      common_vendor.index.showLoading({
        mask: true,
        title: "加载中"
      });
      api_login.getuser().then((res) => {
        console.log(res);
        runningfile.value = res.data;
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
    common_vendor.onLoad((option) => {
      console.log(option);
      price.value = Number(option.price);
      usermsg();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => withdraw.value = $event),
        b: common_vendor.p({
          type: "number",
          placeholder: "请输入提现金额",
          modelValue: withdraw.value
        }),
        c: common_vendor.p({
          title: "提现金额",
          subTitle: `可提现金额： ${price.value} 元`,
          titleFontSize: "16px",
          subTitleFontSize: "15px",
          type: "line",
          padding: true
        }),
        d: common_vendor.o(addsuccess),
        e: common_vendor.o(addfail),
        f: common_vendor.o(deleteimg),
        g: common_vendor.p({
          sourceType: way.value,
          limit: "1",
          title: "最多选择1张图片"
        }),
        h: common_vendor.p({
          title: "请上传微信收款二维码",
          titleFontSize: "16px",
          type: "line",
          padding: true
        }),
        i: common_vendor.o(submit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBuilderProjects/take-things-page/classification/withdraw/withdraw.vue"]]);
wx.createPage(MiniProgramPage);
