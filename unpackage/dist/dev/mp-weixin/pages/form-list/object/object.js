"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_merchant = require("../../../api/merchant.js");
require("../../../api/utils/request.js");
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  _easycom_uni_section2();
}
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  _easycom_uni_section();
}
const _sfc_main = {
  __name: "object",
  setup(__props) {
    const msglist = common_vendor.ref([]);
    const index = common_vendor.ref([]);
    const confirm = () => {
      let pages = getCurrentPages();
      let prevPage = pages[pages.length - 2];
      prevPage.onLoad(msglist.value[index.value]);
      common_vendor.index.navigateBack({
        delta: 1
      });
    };
    const styleChange = (e) => {
      console.log(e);
      index.value = e.detail.value;
    };
    const getmsg = () => {
      common_vendor.index.showLoading({
        mask: true,
        title: "加载中"
      });
      api_merchant.getexpressage().then((res) => {
        console.log(res);
        msglist.value = res.data;
        common_vendor.index.hideLoading();
      }).catch((err) => {
        console.log(err);
        common_vendor.index.hideLoading();
      });
    };
    common_vendor.onMounted(() => {
      getmsg();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "物件信息",
          titleFontSize: "16px",
          type: "line"
        }),
        b: common_vendor.f(msglist.value, (item, index2, i0) => {
          return {
            a: common_vendor.t(item.content),
            b: common_vendor.t(item.price),
            c: index2,
            d: index2
          };
        }),
        c: common_vendor.o(styleChange),
        d: common_vendor.o(confirm)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBuilderProjects/take-things-page/pages/form-list/object/object.vue"]]);
wx.createPage(MiniProgramPage);
