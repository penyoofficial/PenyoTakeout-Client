'use strict';

exports.main = async (event, context) => {
	const db = uniCloud.database();
	const collection1 = db.collection('a-users');
	const collection2 = db.collection('a-address');

	const token = event.headers.token;

	try {
		const res = await collection1.where({
			token: token
		}).get()

		if (res.affectedDocs > 0) {
			const openid = res.data[0].openid
			let msg = await collection2.where({
				openid: openid
			}).get()
			return {
				code: 200,
				message: "查询成功！",
				data: msg.data
			};
		} else {
			return {
				code: -1,
				message: "查询失败！",
				res
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