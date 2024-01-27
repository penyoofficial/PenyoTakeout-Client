import Request from './utils/request.js';

//上传地址
export function addaddress(name, phone, address) {
	return Request({
		token: uni.getStorageSync('token'),
		method: 'post',
		path: "/api/takeing/add-address",
		data: {
			'name': name,
			'phone': phone,
			'address': address
		}
	})
}

//获取地址
export function getaddress() {
	return Request({
		token: uni.getStorageSync('token'),
		method: 'post',
		path: "/api/takeing/get-address",
	})
}


//获取地址详情
export function getaddressbyid(_id) {
	return Request({
		method: 'post',
		path: "/api/takeing/getaddressbyid",
		data: {
			'_id': _id
		}
	})
}


//删除地址
export function deleteaddress(_id) {
	return Request({
		method: 'post',
		path: "/api/takeing/deleteaddress",
		data: {
			'_id': _id
		}
	})
}

//修改地址
export function updateaddress(_id, name, phone, address) {
	return Request({
		method: 'post',
		path: "/api/takeing/updateaddress",
		data: {
			'_id': _id,
			'name': name,
			'phone': phone,
			'address': address
		}
	})
}