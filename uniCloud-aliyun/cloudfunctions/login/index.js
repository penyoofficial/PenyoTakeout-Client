'use strict';

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

	const appid = 'wx17d0f25905bbb5a2'
	const key = 'e0bd1a3ff1006f464846091fc768f35e'

	const res = await uniCloud.httpclient.request('https://api.weixin.qq.com/cgi-bin/token', {
		method: 'GET',
		dataType: 'json',
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			'grant_type': 'client_credential',
			'appid': appid,
			'secret': key
		}
	});

	const ACCESS_TOKEN = res.data.access_token

	const msg = await uniCloud.httpclient.request(
		'https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=' + ACCESS_TOKEN, {
			method: 'post',
			dataType: 'json',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				'code': param.code
			}
		});

	const phone = msg.data.phone_info.phoneNumber

	return {
		code: 200,
		msg,
		phone
	};
};