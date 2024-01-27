'use strict';

exports.main = async (event, context) => {
	const db = uniCloud.database();
	const collection = db.collection('a-order');
	
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
			_id: param.id
		}).get()
		return {
			code: 200,
			message: "查询成功！",
			data: res.data[0]
		};
	} catch (err) {
		return {
			code: -1,
			message: "查询失败！",
			err
		};
	}
};