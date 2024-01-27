"use strict";
const common_vendor = require("../../common/vendor.js");
const api_order = require("../../api/order.js");
const uni_modules_uniPay_js_sdk_js_sdk = require("../../uni_modules/uni-pay/js_sdk/js_sdk.js");
require("../../api/utils/request.js");
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  (_easycom_uni_section2 + _easycom_uni_easyinput2)();
}
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  (_easycom_uni_section + _easycom_uni_easyinput)();
}
const _sfc_main = {
  __name: "order-details",
  setup(__props) {
    const datafile = common_vendor.ref([]);
    const timeFormat = uni_modules_uniPay_js_sdk_js_sdk.util.timeFormat;
    const copyText = (text) => {
      common_vendor.index.setClipboardData({
        data: text,
        success() {
          common_vendor.index.showToast({
            title: "复制成功",
            icon: "success"
          });
        },
        fail() {
          common_vendor.index.showToast({
            title: "复制失败",
            icon: "none"
          });
        }
      });
    };
    const call = (number) => {
      common_vendor.index.showModal({
        title: "拨号确认",
        content: "确定要拨打电话吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.makePhoneCall({
              phoneNumber: number
            });
          }
        }
      });
    };
    const getfile = (id) => {
      common_vendor.index.showLoading({
        mask: true,
        title: "加载中"
      });
      api_order.getorderbyid(id).then((res) => {
        datafile.value.push(res.data);
        console.log(datafile);
        common_vendor.index.hideLoading();
      }).catch((err) => {
        common_vendor.index.hideLoading();
      });
    };
    common_vendor.onLoad((option) => {
      console.log(option);
      getfile(option.id);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: datafile.value.length == 1
      }, datafile.value.length == 1 ? common_vendor.e({
        b: datafile.value[0].pickupaddress.address
      }, datafile.value[0].pickupaddress.address ? {
        c: common_vendor.p({
          title: "配送信息",
          titleFontSize: "18px"
        })
      } : {}, {
        d: datafile.value[0].pickupaddress.address
      }, datafile.value[0].pickupaddress.address ? {
        e: common_vendor.p({
          subTitle: `取： ${datafile.value[0].pickupaddress.address}`,
          title: `${datafile.value[0].pickupaddress.name} -- ${datafile.value[0].pickupaddress.phone}`,
          titleFontSize: "15px",
          subTitleFontSize: "14px",
          type: "circle"
        })
      } : {}, {
        f: datafile.value[0].closedaddress.address
      }, datafile.value[0].closedaddress.address ? {
        g: common_vendor.p({
          subTitle: `送： ${datafile.value[0].closedaddress.address}`,
          title: `${datafile.value[0].closedaddress.name} -- ${datafile.value[0].closedaddress.phone}`,
          titleFontSize: " 15px",
          subTitleFontSize: "14px",
          type: "circle"
        })
      } : {}, {
        h: datafile.value[0].datafile.describe
      }, datafile.value[0].datafile.describe ? {
        i: common_vendor.o(($event) => datafile.value[0].datafile.describe = $event),
        j: common_vendor.p({
          type: "textarea",
          disabled: true,
          autoHeight: true,
          modelValue: datafile.value[0].datafile.describe
        }),
        k: common_vendor.p({
          title: "备注",
          titleFontSize: "15px",
          padding: "0 10px 0 10px"
        })
      } : {}, {
        l: !datafile.value[0].closedaddress.name
      }, !datafile.value[0].closedaddress.name ? {
        m: common_vendor.t(datafile.value[0].pickupaddress.name),
        n: common_vendor.t(datafile.value[0].pickupaddress.phone),
        o: common_vendor.o(($event) => call(datafile.value[0].runningfile.phone)),
        p: common_vendor.p({
          title: "联系人",
          titleFontSize: " 15px"
        })
      } : {}, {
        q: datafile.value[0].closedaddress.name
      }, datafile.value[0].closedaddress.name ? {
        r: common_vendor.t(datafile.value[0].closedaddress.name),
        s: common_vendor.t(datafile.value[0].closedaddress.phone),
        t: common_vendor.o(($event) => call(datafile.value[0].closedaddress.phone)),
        v: common_vendor.p({
          title: "联系人",
          titleFontSize: " 15px"
        })
      } : {}, {
        w: common_vendor.p({
          title: "商品信息",
          titleFontSize: "18px"
        }),
        x: common_vendor.t(datafile.value[0].designation),
        y: datafile.value[0].datafile.content
      }, datafile.value[0].datafile.content ? {
        z: common_vendor.t(datafile.value[0].datafile.content)
      } : {}, {
        A: datafile.value[0].datafile.tailnumber
      }, datafile.value[0].datafile.tailnumber ? {
        B: common_vendor.t(datafile.value[0].datafile.tailnumber)
      } : {}, {
        C: datafile.value[0].datafile.expcode
      }, datafile.value[0].datafile.expcode ? {
        D: common_vendor.t(datafile.value[0].datafile.expcode)
      } : {}, {
        E: common_vendor.t(datafile.value[0].datafile.price),
        F: common_vendor.p({
          title: "订单信息",
          titleFontSize: "18px"
        }),
        G: common_vendor.t(common_vendor.unref(timeFormat)(datafile.value[0].creation_time, "yyyy-MM-dd hh:mm:ss")),
        H: datafile.value[0].receivetime
      }, datafile.value[0].receivetime ? {
        I: common_vendor.t(common_vendor.unref(timeFormat)(datafile.value[0].receivetime, "yyyy-MM-dd hh:mm:ss"))
      } : {}, {
        J: datafile.value[0].claimtime
      }, datafile.value[0].claimtime ? {
        K: common_vendor.t(common_vendor.unref(timeFormat)(datafile.value[0].claimtime, "yyyy-MM-dd hh:mm:ss"))
      } : {}, {
        L: common_vendor.t(common_vendor.unref(timeFormat)(datafile.value[0].creation_time, "yyyy-MM-dd hh:mm:ss")),
        M: common_vendor.t(datafile.value[0].datafile.ordernum),
        N: common_vendor.o(($event) => copyText(datafile.value[0].datafile.ordernum))
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBuilderProjects/take-things-page/classification/order-details/order-details.vue"]]);
wx.createPage(MiniProgramPage);
