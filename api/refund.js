import Request from './utils/request.js';

//获取手机号
export function refund(ordernum, outRefundNo, price) {
	return Request({
		method: 'post',
		path: "/api/takeing/refund",
		data: {
			'ordernum': ordernum,
			'outRefundNo': outRefundNo,
			'price': price
		}
	})
}

//查询订单
export function selectorder(ordernum) {
	return Request({
		method: 'post',
		path: "/api/takeing/selectorder",
		data: {
			'ordernum': ordernum
		}
	})
}

//修改订单状态
export function updataorder(id) {
	return Request({
		method: 'post',
		path: "/api/takeing/updataorder",
		data: {
			'id': id
		}
	})
}