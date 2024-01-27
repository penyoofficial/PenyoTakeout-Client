'use strict';

exports.main = async (event, context) => {
	const db = uniCloud.database();
	const collection1 = db.collection('a-users');
	const collection2 = db.collection('a-order');

	const token = event.headers.token;

	const timestamp = Date.now();
	const zeroTimestamp = new Date(timestamp).setHours(0, 0, 0, 0);

	try {
		const res = await collection1.where({
			token: token
		}).get()

		if (res.affectedDocs > 0) {
			const openid = res.data[0].openid
			const msg = await collection2.where({
				['usermessage.openid']: openid,
				zeroTimestamp: zeroTimestamp
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