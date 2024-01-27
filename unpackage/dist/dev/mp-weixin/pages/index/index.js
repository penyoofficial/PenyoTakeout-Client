"use strict";
const common_vendor = require("../../common/vendor.js");
const api_order = require("../../api/order.js");
const uni_modules_uniPay_js_sdk_js_sdk = require("../../uni_modules/uni-pay/js_sdk/js_sdk.js");
require("../../api/utils/request.js");
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uni_card2 + _easycom_uni_section2 + _easycom_uni_load_more2)();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (HomePage + _easycom_uni_card + _easycom_uni_section + _easycom_uni_load_more)();
}
const HomePage = () => "./module/home-page.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const datafile = common_vendor.ref([]);
    common_vendor.defineComponent({
      components: {
        HomePage
      }
    });
    const timeFormat = uni_modules_uniPay_js_sdk_js_sdk.util.timeFormat;
    const gotopage = (id) => {
      common_vendor.index.navigateTo({
        url: "/pages/order-details/order-details?id=" + id
      });
    };
    const getdataorder = () => {
      common_vendor.index.showLoading({
        mask: true,
        title: "加载中"
      });
      api_order.getorderbydata().then((res) => {
        console.log(res);
        datafile.value = res.data.reverse();
        common_vendor.index.hideLoading();
      }).catch((err) => {
        common_vendor.index.clearStorage();
        common_vendor.index.hideLoading();
      });
    };
    common_vendor.onMounted(() => {
      getdataorder();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: datafile.value.length == 0
      }, datafile.value.length == 0 ? {} : {}, {
        b: datafile.value.length != 0
      }, datafile.value.length != 0 ? {
        c: common_vendor.f(datafile.value, (item, index, i0) => {
          return common_vendor.e({
            a: "ddc89c7a-3-" + i0 + "," + ("ddc89c7a-2-" + i0),
            b: common_vendor.p({
              title: `取： ${item.pickupaddress.address}`,
              titleFontSize: "16px",
              subTitleColor: "#333",
              type: "circle"
            }),
            c: item.closedaddress.address
          }, item.closedaddress.address ? {
            d: "ddc89c7a-4-" + i0 + "," + ("ddc89c7a-2-" + i0),
            e: common_vendor.p({
              title: `送： ${item.closedaddress.address}`,
              titleFontSize: "16px",
              subTitleColor: "#333",
              type: "circle"
            })
          } : {}, {
            f: common_vendor.t(item.datafile.ordernum),
            g: common_vendor.t(common_vendor.unref(timeFormat)(item.creation_time, "yyyy-MM-dd hh:mm:ss")),
            h: common_vendor.o(($event) => gotopage(item._id), index),
            i: "ddc89c7a-2-" + i0,
            j: common_vendor.p({
              title: item.designation,
              padding: "0px"
            }),
            k: index
          });
        })
      } : {}, {
        d: datafile.value.length != 0
      }, datafile.value.length != 0 ? {
        e: common_vendor.p({
          status: _ctx.no - _ctx.more
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBuilderProjects/take-things-page/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
