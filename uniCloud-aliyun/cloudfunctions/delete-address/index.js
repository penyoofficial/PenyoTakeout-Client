'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database();
	const collection = db.collection('a-address');

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

	const _id = param._id
	try {
		const result = await collection.doc(_id).remove()
		return {
			code: 200,
			message: "删除成功！",
			result
		};
	} catch (err) {
		return {
			code: -1,
			message: "删除失败！",
			err
		};
	}
};