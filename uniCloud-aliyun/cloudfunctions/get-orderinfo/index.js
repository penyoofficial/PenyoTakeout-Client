'use strict';
const unipay = require('uni-pay')
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
		//pfx: fs.readFileSync('/path/to/your/pfxfile'), // p12文件路径，使用微信退款时需要，需要注意的是阿里云目前不支持以相对路径读取文件，请使用绝对路径的形式
	})
	//param为客户端上传的参数
	let orderInfo = await unipayIns.getOrderInfo({
		openid: param.openId, //这个是客户端上传的用户的openid
		body: param.designation,
		outTradeNo: param.random, //给他个随机号让他可以第二次发起支付
		totalFee: param.price, // 金额，单位元,在上传过来的时候就已经*100了
		// 支付结果通知地址,没有该参数或者为空会报错,随便给了一个测试网址
		notifyUrl: 'https://static-mp-33420585-9183-4b24-8565-0e60180fbb5d.next.bspapp.com',
		// attach: event.out_trade, //备注,订单号或 长者id 在下一步通知中判断长度来确定
	})
	return {
		code: 200,
		orderInfo
	}
};