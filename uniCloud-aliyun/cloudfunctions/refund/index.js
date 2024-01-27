'use strict';
const unipay = require('uni-pay')
const fs = require('fs');
const path = require('path');
exports.main = async (event, context) => {
	let body = event.body;
	if (event.isBase64Encoded) {
		body = Buffer.from(body, 'base64').toString();
	}
	let param;
	try {
		param = JSON.parse(body);
	} catch (error) {
		return {
			code: -1,
			message: 'Invalid JSON data'
		};
	}

	const unipayIns = unipay.initWeixin({
		appId: 'wx17d0f25905bbb5a2', //小程序appid
		mchId: '1660951909', //微信商户号
		key: 'KJUIO7656iuyurgfujdtfgvydgESDjh7', //商户号的API密钥
		pfx: fs.readFileSync(path.resolve(__dirname, 'cert/apiclient_cert.p12'))
	})
	let res = await unipayIns.refund({
		outTradeNo: param.ordernum,
		outRefundNo: param.outRefundNo,
		totalFee: param.price,
		refundFee: param.price,
		refundFeeType: "CNY"
	})
	return {
		code: 200,
		res
	}
};