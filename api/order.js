import Request from './utils/request.js';

//垃圾处理基础收费
export function rubbish() {
	return Request({
		method: 'post',
		path: "/api/takeing/rubbish"
	})
}

//新订单
export function addorder(usermessage, datafile, pickupaddress, closedaddress, state, designation) {
	return Request({
		method: 'post',
		path: "/api/takeing/addorder",
		data: {
			'usermessage': usermessage,
			'datafile': datafile,
			'pickupaddress': pickupaddress,
			'closedaddress': closedaddress,
			'state': state,
			'designation': designation
		}
	})
}

//分页查询（page 表示当前页数，pageSize 表示每页返回的数据条数）
export function getallorder(openid, page, pageSize) {
	return Request({
		method: 'post',
		path: "/api/takeing/getallorder",
		data: {
			'openid': openid,
			'page': page,
			'pageSize': pageSize
		}
	})
}

//分页查询（page 表示当前页数，pageSize 表示每页返回的数据条数）
export function getorderbystate(openid, state, page, pageSize) {
	return Request({
		method: 'post',
		path: "/api/takeing/getorderbystate",
		data: {
			'openid': openid,
			'state': state,
			'page': page,
			'pageSize': pageSize
		}
	})
}

//查询bydata
export function getorderbydata() {
	return Request({
		token: uni.getStorageSync('token'),
		method: 'post',
		path: "/api/takeing/getorderbydata"
	})
}

//查询byid
export function getorderbyid(id) {
	return Request({
		method: 'post',
		path: "/api/takeing/getorderbyid",
		data: {
			'id': id
		}
	})
}