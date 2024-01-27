import Request from './utils/request.js';

//获取手机号
export function login(code) {
	return Request({
		method: 'post',
		path: "/api/takeing/login",
		data: {
			'code': code
		}
	})
}

//登录
export function authorization(code, name, gender, phone, head) {
	return Request({
		method: 'post',
		path: "/api/takeing/authorization",
		data: {
			'code': code,
			'name': name,
			'gender': gender,
			'phone': phone,
			'head': head
		}
	})
}

//查询个人信息
export function getuser() {
	return Request({
		token: uni.getStorageSync('token'),
		method: 'post',
		path: "/api/takeing/get-user",
	})
}

//修改用户信息
export function upadteuser(_id, name, gender, head, phone) {
	return Request({
		method: 'post',
		path: "/api/takeing/upadteuser",
		data: {
			'_id': _id,
			'name': name,
			'gender': gender,
			'head': head,
			'phone': phone
		}
	})
}