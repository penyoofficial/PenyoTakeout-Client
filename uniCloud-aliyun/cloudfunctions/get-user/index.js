'use strict';

exports.main = async (event, context) => {
	const db = uniCloud.database();
	const collection = db.collection('a-users');

	const token = event.headers.token;

	try {
		const res = await collection.where({
			token: token
		}).get()
		if (res.affectedDocs == 0) {
			return {
				code: -1,
				message: "token验证过期了！",
				res
			};
		} else {
			return {
				code: 200,
				message: "查询成功！",
				data: res.data[0]
			};
		}
	} catch (err) {
		return {
			code: -1,
			message: "出错了！",
			err
		};
	}
};