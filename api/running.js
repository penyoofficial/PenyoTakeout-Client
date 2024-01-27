import Request from './utils/request.js';

//提交申请
export function addrunning(identity, identityimg) {
	return Request({
		token: uni.getStorageSync('token'),
		method: 'post',
		path: "/api/takeing/addrunning",
		data: {
			'identity': identity,
			'identityimg': identityimg
		}
	})
}

//查询申请
export function getrunning() {
	return Request({
		token: uni.getStorageSync('token'),
		method: 'post',
		path: "/api/takeing/getrunning"
	})
}

//修改用户信息
export function upadterunning(_id, name, gender, head, phone) {
	return Request({
		method: 'post',
		path: "/api/takeing/upadterunning",
		data: {
			'userid': _id,
			'name': name,
			'gender': gender,
			'head': head,
			'phone': phone
		}
	})
}

//查询订单
export function getorderbyrun(state, gender, page, pageSize) {
	return Request({
		method: 'post',
		path: "/api/takeing/getorderbyrun",
		data: {
			'state': state,
			'gender': gender,
			'page': page,
			'pageSize': pageSize
		}
	})
}

//抢单
export function roborder(id, runningfile) {
	return Request({
		method: 'post',
		path: "/api/takeing/roborder",
		data: {
			'id': id,
			'runningfile': runningfile
		}
	})
}

//待取件、待配送
export function getorderbyrunstate(openid, runstate, page, pageSize, state) {
	return Request({
		method: 'post',
		path: "/api/takeing/getorderbyrunstate",
		data: {
			'openid': openid,
			'runstate': runstate,
			'page': page,
			'pageSize': pageSize,
			'state': state,
		}
	})
}

//已经取货
export function updataclaimorder(id) {
	return Request({
		method: 'post',
		path: "/api/takeing/updataclaimorder",
		data: {
			'id': id
		}
	})
}

//完成配送
export function finishorder(id, runningmsg, price) {
	return Request({
		method: 'post',
		path: "/api/takeing/finishorder",
		data: {
			'id': id,
			'runningmsg': runningmsg,
			'price': price
		}
	})
}

//今日单量与收入
export function getsingledose(openid) {
	return Request({
		method: 'post',
		path: "/api/takeing/getsingledose",
		data: {
			'openid': openid
		}
	})
}

//总利润
export function getaccountprice(openid) {
	return Request({
		method: 'post',
		path: "/api/takeing/getaccountprice",
		data: {
			'openid': openid
		}
	})
}

//资金明细
export function getaccount(openid, page, pageSize) {
	return Request({
		method: 'post',
		path: "/api/takeing/getaccount",
		data: {
			'openid': openid,
			'page': page,
			'pageSize': pageSize
		}
	})
}

//提现
export function addwithdraw(runningfile, withdraw, image) {
	return Request({
		method: 'post',
		path: "/api/takeing/addwithdraw",
		data: {
			'runningfile': runningfile,
			'withdraw': withdraw,
			'image': image
		}
	})
}

//添加资金明细
export function addaccount(runningmsg, price) {
	return Request({
		method: 'post',
		path: "/api/takeing/addaccount",
		data: {
			'runningmsg': runningmsg,
			'price': price
		}
	})
}