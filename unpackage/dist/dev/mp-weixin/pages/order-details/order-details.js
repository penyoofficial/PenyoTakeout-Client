"use strict";
const common_vendor = require("../../common/vendor.js");
const api_refund = require("../../api/refund.js");
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
    const id = common_vendor.ref("");
    const timeFormat = uni_modules_uniPay_js_sdk_js_sdk.util.timeFormat;
    const getfile = (id2) => {
      common_vendor.index.showLoading({
        mask: true,
        title: "加载中"
      });
      api_order.getorderbyid(id2).then((res) => {
        datafile.value.push(res.data);
        console.log(datafile);
        common_vendor.index.hideLoading();
      }).catch((err) => {
        common_vendor.index.hideLoading();
      });
    };
    const refundmsg = () => {
      common_vendor.index.showLoading({
        mask: true,
        title: "加载中"
      });
      var a = new common_vendor.BigNumber(datafile.value[0].datafile.price);
      var b = new common_vendor.BigNumber(100);
      a.times(b);
      updata();
    };
    const updata = () => {
      api_refund.updataorder(id.value).then((res) => {
        console.log(res);
        datafile.value = [];
        getfile(id.value);
        common_vendor.index.hideLoading();
      }).catch((err) => {
        common_vendor.index.hideLoading();
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
    common_vendor.onLoad((option) => {
      console.log(option);
      id.value = option.id;
      getfile(option.id);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: datafile.value.length == 1
      }, datafile.value.length == 1 ? common_vendor.e({
        b: datafile.value[0].state == "2"
      }, datafile.value[0].state == "2" ? {} : {}, {
        c: datafile.value[0].state == "3" && datafile.value[0].runstate == "1"
      }, datafile.value[0].state == "3" && datafile.value[0].runstate == "1" ? {} : {}, {
        d: datafile.value[0].state == "3" && datafile.value[0].runstate == "2"
      }, datafile.value[0].state == "3" && datafile.value[0].runstate == "2" ? {} : {}, {
        e: datafile.value[0].state == "4"
      }, datafile.value[0].state == "4" ? {} : {}, {
        f: datafile.value[0].state == "1"
      }, datafile.value[0].state == "1" ? {} : {}, {
        g: datafile.value[0].state == "5"
      }, datafile.value[0].state == "5" ? {} : {}, {
        h: datafile.value[0].pickupaddress.address
      }, datafile.value[0].pickupaddress.address ? {
        i: common_vendor.p({
          title: "配送信息",
          titleFontSize: "18px"
        })
      } : {}, {
        j: datafile.value[0].pickupaddress.address
      }, datafile.value[0].pickupaddress.address ? {
        k: common_vendor.p({
          subTitle: `取： ${datafile.value[0].pickupaddress.address}`,
          title: `${datafile.value[0].pickupaddress.name} -- ${datafile.value[0].pickupaddress.phone}`,
          titleFontSize: "15px",
          subTitleFontSize: "14px",
          type: "circle"
        })
      } : {}, {
        l: datafile.value[0].closedaddress.address
      }, datafile.value[0].closedaddress.address ? {
        m: common_vendor.p({
          subTitle: `送： ${datafile.value[0].closedaddress.address}`,
          title: `${datafile.value[0].closedaddress.name} -- ${datafile.value[0].closedaddress.phone}`,
          titleFontSize: " 15px",
          subTitleFontSize: "14px",
          type: "circle"
        })
      } : {}, {
        n: datafile.value[0].datafile.describe
      }, datafile.value[0].datafile.describe ? {
        o: common_vendor.o(($event) => datafile.value[0].datafile.describe = $event),
        p: common_vendor.p({
          type: "textarea",
          disabled: true,
          autoHeight: true,
          modelValue: datafile.value[0].datafile.describe
        }),
        q: common_vendor.p({
          title: "备注",
          titleFontSize: "15px",
          padding: "0 10px 0 10px"
        })
      } : {}, {
        r: datafile.value[0].runningfile
      }, datafile.value[0].runningfile ? {
        s: common_vendor.t(datafile.value[0].runningfile.name),
        t: common_vendor.t(datafile.value[0].runningfile.phone),
        v: common_vendor.o(($event) => call(datafile.value[0].runningfile.phone)),
        w: common_vendor.p({
          title: "配送员",
          titleFontSize: " 15px"
        })
      } : {}, {
        x: common_vendor.p({
          title: "商品信息",
          titleFontSize: "18px"
        }),
        y: common_vendor.t(datafile.value[0].designation),
        z: datafile.value[0].datafile.content
      }, datafile.value[0].datafile.content ? {
        A: common_vendor.t(datafile.value[0].datafile.content)
      } : {}, {
        B: datafile.value[0].datafile.tailnumber
      }, datafile.value[0].datafile.tailnumber ? {
        C: common_vendor.t(datafile.value[0].datafile.tailnumber)
      } : {}, {
        D: datafile.value[0].datafile.expcode
      }, datafile.value[0].datafile.expcode ? {
        E: common_vendor.t(datafile.value[0].datafile.expcode)
      } : {}, {
        F: common_vendor.t(datafile.value[0].datafile.price),
        G: common_vendor.p({
          title: "订单信息",
          titleFontSize: "18px"
        }),
        H: common_vendor.t(common_vendor.unref(timeFormat)(datafile.value[0].creation_time, "yyyy-MM-dd hh:mm:ss")),
        I: datafile.value[0].receivetime
      }, datafile.value[0].receivetime ? {
        J: common_vendor.t(common_vendor.unref(timeFormat)(datafile.value[0].receivetime, "yyyy-MM-dd hh:mm:ss"))
      } : {}, {
        K: datafile.value[0].claimtime
      }, datafile.value[0].claimtime ? {
        L: common_vendor.t(common_vendor.unref(timeFormat)(datafile.value[0].claimtime, "yyyy-MM-dd hh:mm:ss"))
      } : {}, {
        M: datafile.value[0].finishtime
      }, datafile.value[0].finishtime ? {
        N: common_vendor.t(common_vendor.unref(timeFormat)(datafile.value[0].finishtime, "yyyy-MM-dd hh:mm:ss"))
      } : {}, {
        O: common_vendor.t(datafile.value[0].datafile.ordernum),
        P: common_vendor.o(($event) => copyText(datafile.value[0].datafile.ordernum)),
        Q: datafile.value[0].state == "2"
      }, datafile.value[0].state == "2" ? {
        R: common_vendor.o(refundmsg)
      } : {}) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/HBuilderProjects/take-things-page/pages/order-details/order-details.vue"]]);
wx.createPage(MiniProgramPage);
