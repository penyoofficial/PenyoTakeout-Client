import Request from './utils/request.js';

//获取用户签名
export function payorderinfo(openId, random, price, designation) {
	return Request({
		method: 'post',
		path: "/api/takeing/payorderinfo",
		data: {
			'openId': openId,
			'random': random,
			'price': price,
			'designation': designation
		}
	})
}