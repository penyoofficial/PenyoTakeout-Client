'use strict';

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


	try {
		const res = await collection.where({
			_id: param._id
		}).update({
			name: param.name,
			gender: param.gender,
			head: param.head,
			phone: param.phone
		});
		return {
			code: 200,
			message: "修改成功！",
			res
		};
	} catch (err) {
		return {
			code: -1,
			message: "修改失败！",
			err
		};
	}
};