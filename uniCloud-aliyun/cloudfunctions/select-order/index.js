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
	let res = await unipayIns.orderQuery({
		outTradeNo: param.ordernum,
	})
	return {
		code: 200,
		res
	}
};