"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_running = require("../../../api/running.js");
require("../../../api/utils/request.js");
if (!Array) {
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_data_select2 + _easycom_uni_section2 + _easycom_uni_file_picker2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_data_select = () => "../../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_file_picker = () => "../../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_data_select + _easycom_uni_section + _easycom_uni_file_picker + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "run",
  setup(__props) {
    const way = common_vendor.ref(["album", "camera"]);
    const identity = common_vendor.ref("");
    const identityimg = common_vendor.ref("");
    const verify = common_vendor.ref("");
    const candidates = common_vendor.ref([
      {
        value: 0,
        text: "在校学生"
      },
      {
        value: 1,
        text: "校外人员"
      }
    ]);
    const instance = common_vendor.getCurrentInstance();
    const submit = () => {
      common_vendor.index.showLoading({
        mask: true,
        title: "加载中"
      });
      if (verify.value === 0) {
        common_vendor.index.showToast({
          icon: "error",
          title: "请勿重复提交"
        });
        return;
      }
      if (!identity.value == 0 && !identity.value == 1) {
        common_vendor.index.showToast({
          icon: "error",
          title: "请选择身份"
        });
        return;
      }
      if (!identityimg.value) {
        common_vendor.index.showToast({
          icon: "error",
          title: "请上传证件"
        });
        return;
      }
      api_running.addrunning(candidates.value[identity.value].text, identityimg.value).then((res) => {
        console.log(res);
        verify.value = 0;
        common_vendor.index.showToast({
          icon: "success",
          title: "提交成功"
        });
      }).catch((err) => {
        console.log(err);
        common_vendor.index.showToast({
          icon: "error",
          title: "提交失败"
        });
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
    const dialogToggle = () => {
      instance.refs.alertDialog.open();
    };
    const dialogConfirm = () => {
      common_vendor.index.navigateTo({
        url: "/classification/system/system"
      });
    };
    const dialogClose = () => {
      common_vendor.index.navigateBack();
    };
    const runningget = () => {
      common_vendor.index.showLoading({
        mask: true,
        title: "加载中"
      });
      api_running.getrunning().then((res) => {
        console.log(res);
        versiy(res.data);
      }).catch((err) => {
        console.log(err);
        common_vendor.index.hideLoading();
      });
    };
    const versiy = (data) => {
      console.log(data);
      if (data.role === "0") {
        verify.value = 0;
        common_vendor.index.showToast({
          icon: "error",
          title: "请勿重复提交"
        });
      } else if (data.role === "1") {
        dialogToggle();
      }
      common_vendor.index.hideLoading();
    };
    const checkout = () => {
      let verify2 = common_vendor.index.getStorageSync("token");
      if (!verify2) {
        common_vendor.index.showToast({
          icon: "error",
          title: "请登录小程序！"
        });
        setTimeout(() => {
          common_vendor.index.reLaunch({
            url: "../../mine/mine"
          });
        }, 1e3);
      } else {
        runningget();
      }
    };
    common_vendor.onShow(() => {
      checkout();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => identity.value = $event),
        b: common_vendor.p({
          localdata: candidates.value,
          modelValue: identity.value
        }),
        c: common_vendor.p({
          title: "身份信息",
          titleFontSize: "16px",
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
          title: "上传学生证或身份证",
          titleFontSize: "16px",
          type: "line",
          padding: true
        }),
        i: common_vendor.o(submit),
        j: common_vendor.o(dialogConfirm),
        k: common_vendor.o(dialogClose),
        l: common_vendor.p({
          type: "success",
          cancelText: "关闭",
          confirmText: "同意",
          title: "提示",
          content: "您已经是骑手,进入系统吗？"
        }),
        m: common_vendor.sr("alertDialog", "85b91b14-4"),
        n: common_vendor.p({
          type: "dialog"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBuilderProjects/take-things-page/pages/other/run/run.vue"]]);
wx.createPage(MiniProgramPage);
