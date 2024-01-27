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

	const timestamp = Date.now();

	try {
		const res = await collection.where({
			_id: param.id,
			state: '2'
		}).update({
			state: '3',
			runningfile: param.runningfile,
			runstate: '1',
			receivetime: timestamp
		});
		return {
			code: 200,
			message: "抢单成功！",
			res
		};
	} catch (err) {
		return {
			code: -1,
			message: "抢单失败！",
			err
		};
	}
};