'use strict';

const crypto = require('crypto');

exports.main = async (event, context) => {
	const db = uniCloud.database();
	const collection = db.collection('a-users');

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

	const appid = 'wx17d0f25905bbb5a2'
	const key = 'e0bd1a3ff1006f464846091fc768f35e'

	const res = await uniCloud.httpclient.request('https://api.weixin.qq.com/sns/jscode2session', {
		method: 'GET',
		dataType: 'json',
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			'appid': appid,
			'secret': key,
			'js_code': param.code,
			'grant_type': 'client_credential',
		}
	});

	const openid = res.data.openid

	const timestamp = Date.now();
	const random = Math.floor(Math.random() * 1000);
	const data = `${timestamp}-${random}-${openid}`;
	const token = crypto.createHash('sha256').update(data).digest('hex');

	try {
		const res = await collection.where({
			openid: openid
		}).update({
			token: token
		});

		if (res.updated > 0) {
			// 数据库中存在匹配的数据，返回false
			return {
				code: 200,
				message: "登录成功！",
				token
			};
		} else {
			// 数据库中不存在匹配的数据，返回true
			let res = await collection.add(
				[{
					name: param.name,
					gender: param.gender,
					phone: param.phone,
					head: param.head,
					role: '普通用户',
					openid: openid,
					token: token,
					creation_time: timestamp
				}, ])
			return {
				code: 200,
				message: "登录成功！",
				token,
			};
		}
	} catch (err) {
		return {
			code: -1,
			message: "查询失败！",
			err
		};
	}
};