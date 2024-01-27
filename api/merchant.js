import Request from './utils/request.js';

//获取商家信息
export function merchant(id) {
	return Request({
		method: 'post',
		path: "/api/takeing/merchant",
		data: {
			'id': id
		}
	})
}

//问题反馈
export function idea(msg, phone) {
	return Request({
		method: 'post',
		path: "/api/takeing/idea",
		data: {
			'msg': msg,
			'phone': phone
		}
	})
}

//小程序介绍
export function getabout() {
	return Request({
		method: 'post',
		path: "/api/takeing/getabout"
	})
}

//快递规格
export function getexpressage() {
	return Request({
		method: 'post',
		path: "/api/takeing/getexpressage"
	})
}