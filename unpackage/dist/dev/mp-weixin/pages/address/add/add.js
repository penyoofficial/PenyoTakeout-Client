"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_address = require("../../../api/address.js");
require("../../../api/utils/request.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "add",
  setup(__props) {
    const instance = common_vendor.getCurrentInstance();
    const valiFormData = common_vendor.ref({});
    const rules = common_vendor.ref({
      name: {
        rules: [{
          required: true,
          errorMessage: "联系人不能为空"
        }]
      },
      phone: {
        rules: [{
          required: true,
          errorMessage: "手机号码不能为空"
        }, {
          pattern: /^1[2|3|4|5|6|7|8|9|]\d{9}$/,
          errorMessage: "请输入正确的电话号码"
        }]
      },
      address: {
        rules: [{
          required: true,
          errorMessage: "地址不能为空"
        }]
      }
    });
    const submit = (ref) => {
      common_vendor.index.showLoading({
        mask: true,
        title: "加载中"
      });
      instance.refs[ref].validate().then((res) => {
        console.log("success", res);
        putaddress(res);
      }).catch((err) => {
        console.log("err", err);
        common_vendor.index.showToast({
          icon: "error",
          title: "请填写完整信息"
        });
      });
    };
    const putaddress = (res) => {
      api_address.addaddress(res.name, res.phone, res.address).then((res2) => {
        console.log(res2);
        common_vendor.index.showToast({
          icon: "success",
          title: "上传成功"
        });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 500);
      }).catch((err) => {
        console.log(err);
        common_vendor.index.showToast({
          icon: "error",
          title: "上传失败"
        });
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => valiFormData.value.name = $event),
        b: common_vendor.p({
          placeholder: "请输入联系人",
          modelValue: valiFormData.value.name
        }),
        c: common_vendor.p({
          label: "联系人 ",
          required: true,
          name: "name"
        }),
        d: common_vendor.o(($event) => valiFormData.value.phone = $event),
        e: common_vendor.p({
          placeholder: "请输入手机号码",
          modelValue: valiFormData.value.phone
        }),
        f: common_vendor.p({
          label: "手机号",
          required: true,
          name: "phone"
        }),
        g: common_vendor.o(($event) => valiFormData.value.address = $event),
        h: common_vendor.p({
          type: "textarea",
          placeholder: "请输入详细的取件地址",
          modelValue: valiFormData.value.address
        }),
        i: common_vendor.p({
          label: "取件地",
          required: true,
          name: "address"
        }),
        j: common_vendor.sr("valiForm", "19b50706-0"),
        k: common_vendor.p({
          rules: rules.value,
          modelValue: valiFormData.value
        }),
        l: common_vendor.o(($event) => submit("valiForm"))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBuilderProjects/take-things-page/pages/address/add/add.vue"]]);
wx.createPage(MiniProgramPage);
