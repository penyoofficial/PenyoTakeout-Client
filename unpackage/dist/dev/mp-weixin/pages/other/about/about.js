"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_merchant = require("../../../api/merchant.js");
require("../../../api/utils/request.js");
if (!Array) {
  const _easycom_uni_title2 = common_vendor.resolveComponent("uni-title");
  _easycom_uni_title2();
}
const _easycom_uni_title = () => "../../../uni_modules/uni-title/components/uni-title/uni-title.js";
if (!Math) {
  _easycom_uni_title();
}
const _sfc_main = {
  __name: "about",
  setup(__props) {
    const msglist = common_vendor.ref([]);
    const getmsg = () => {
      common_vendor.index.showLoading({
        mask: true,
        title: "加载中"
      });
      api_merchant.getabout().then((res) => {
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
        a: common_vendor.f(msglist.value, (item, index, i0) => {
          return {
            a: "e584330c-0-" + i0,
            b: common_vendor.p({
              type: "h3",
              title: item.headline
            }),
            c: common_vendor.t(item.content),
            d: index
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBuilderProjects/take-things-page/pages/other/about/about.vue"]]);
wx.createPage(MiniProgramPage);
