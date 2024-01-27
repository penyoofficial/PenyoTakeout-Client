"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_running = require("../../../api/running.js");
const api_login = require("../../../api/login.js");
require("../../../api/utils/request.js");
if (!Array) {
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "data",
  setup(__props) {
    const array = common_vendor.ref(["男", "女"]);
    const usermsglist = common_vendor.ref([]);
    const phone = common_vendor.ref("");
    const id = common_vendor.ref("");
    const index = common_vendor.ref(0);
    const instance = common_vendor.getCurrentInstance();
    const bindPickerChange = (e) => {
      console.log(e);
      usermsglist.value.gender = array.value[e.detail.value];
    };
    const inputDialogToggle = () => {
      instance.refs.inputDialog.open();
    };
    const inputDialogTogglephone = () => {
      instance.refs.inputDialogphone.open();
    };
    const dialogInputConfirm = (e) => {
      if (e) {
        usermsglist.value.name = e;
      } else {
        common_vendor.index.showToast({
          icon: "error",
          title: "昵称不能为空"
        });
      }
    };
    const dialogInputConfirmphone = (e) => {
      if (!e) {
        common_vendor.index.showToast({
          title: "手机号码不能为空！",
          icon: "error"
        });
        return;
      }
      if (!/^1[3-9]\d{9}$/.test(e)) {
        common_vendor.index.showToast({
          title: "手机号格式不正确！",
          icon: "none"
        });
        return;
      }
      usermsglist.value.phone = e;
      updataphone(e);
    };
    const chooseimg = () => {
      common_vendor.index.chooseImage({
        count: 1,
        // 最多可选择的图片数量
        sizeType: ["compressed"],
        // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"],
        // 可以指定来源是相册还是相机，默认二者都有
        success: (res) => {
          console.log(res);
          putcloud(res.tempFilePaths[0]);
        }
      });
    };
    const putcloud = (file) => {
      common_vendor.index.showLoading({
        mask: true,
        title: "加载中"
      });
      const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let result = "";
      for (let i = 0; i < 20; i++) {
        const randomIndex = Math.floor(Math.random() * letters.length);
        result += letters.charAt(randomIndex);
      }
      const name = result + ".jpg";
      console.log(name);
      common_vendor.Ws.uploadFile({
        url: "https://file-uninlzguzw-mp-33420585-9183-4b24-8565-0e60180fbb5d.oss-cn-zhangjiakou.aliyuncs.com",
        filePath: file,
        cloudPath: name,
        onUploadProgress: function(progressEvent) {
          console.log(progressEvent);
          var percentCompleted = Math.round(
            progressEvent.loaded * 100 / progressEvent.total
          );
          console.log(percentCompleted);
        }
      }).then((res) => {
        console.log(res);
        usermsglist.value.head = res.fileID;
        common_vendor.index.hideLoading();
      }).catch((err) => {
        console.log(err);
        common_vendor.index.showToast({
          icon: "error",
          title: "上传失败"
        });
      });
    };
    const setrunning = () => {
      common_vendor.index.showLoading({
        mask: true,
        title: "加载中"
      });
      api_running.upadterunning(id.value, usermsglist.value.name, usermsglist.value.gender, usermsglist.value.head, usermsglist.value.phone).then((res) => {
        console.log(res);
        setuser();
      }).catch((err) => {
        console.log(err);
        common_vendor.index.showToast({
          icon: "error",
          title: "上传失败"
        });
      });
    };
    const setuser = () => {
      api_login.upadteuser(id.value, usermsglist.value.name, usermsglist.value.gender, usermsglist.value.head, usermsglist.value.phone).then((res) => {
        console.log(res);
        common_vendor.index.showToast({
          icon: "success",
          title: "修改成功"
        });
        setTimeout(() => {
          common_vendor.index.reLaunch({
            url: "../../mine/mine"
          });
        }, 500);
      }).catch((err) => {
        console.log(err);
        common_vendor.index.showToast({
          icon: "error",
          title: "上传失败"
        });
      });
    };
    const usermsg = () => {
      common_vendor.index.showLoading({
        mask: true,
        title: "加载中"
      });
      api_login.getuser().then((res) => {
        console.log(res);
        usermsglist.value = res.data;
        id.value = res.data._id;
        updataphone(res.data.phone);
      }).catch((err) => {
        console.log(err);
        common_vendor.index.hideLoading();
      });
    };
    const updataphone = (num) => {
      phone.value = num.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
      common_vendor.index.hideLoading();
    };
    common_vendor.onMounted(() => {
      usermsg();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: usermsglist.value
      }, usermsglist.value ? {
        b: usermsglist.value.head,
        c: common_vendor.o(chooseimg),
        d: common_vendor.t(usermsglist.value.name),
        e: common_vendor.o(inputDialogToggle),
        f: common_vendor.t(usermsglist.value.gender),
        g: common_vendor.o(bindPickerChange),
        h: index.value,
        i: array.value,
        j: common_vendor.t(phone.value),
        k: common_vendor.o(inputDialogTogglephone)
      } : {}, {
        l: common_vendor.sr("inputClose", "b9520ac4-1,b9520ac4-0"),
        m: common_vendor.o(dialogInputConfirm),
        n: common_vendor.p({
          mode: "input",
          title: "输入昵称",
          value: usermsglist.value.name,
          placeholder: "请输入昵称"
        }),
        o: common_vendor.sr("inputDialog", "b9520ac4-0"),
        p: common_vendor.p({
          type: "dialog"
        }),
        q: common_vendor.sr("inputClose", "b9520ac4-3,b9520ac4-2"),
        r: common_vendor.o(dialogInputConfirmphone),
        s: common_vendor.p({
          mode: "input",
          title: "输入电话号码",
          placeholder: "请输入电话号码"
        }),
        t: common_vendor.sr("inputDialogphone", "b9520ac4-2"),
        v: common_vendor.p({
          type: "dialog"
        }),
        w: common_vendor.o(setrunning)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBuilderProjects/take-things-page/pages/other/data/data.vue"]]);
wx.createPage(MiniProgramPage);
