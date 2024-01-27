'use strict';

exports.main = async (event, context) => {
	const db = uniCloud.database();
	const collection1 = db.collection('a-users');
	const collection2 = db.collection('a-address');

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

	const token = event.headers.token;

	try {
		const res = await collection1.where({
			token: token
		}).get()

		if (res.affectedDocs > 0) {
			const openid = res.data[0].openid
			let msg = await collection2.add(
				[{
					name: param.name,
					phone: param.phone,
					address: param.address,
					openid: openid,
				}, ])
			return {
				code: 200,
				message: "添加成功！",
				msg
			};
		} else {
			return {
				code: -1,
				message: "添加失败！",
				res
			};
		}
	} catch (err) {
		return {
			code: -1,
			message: "添加失败！",
			err
		};
	}
};