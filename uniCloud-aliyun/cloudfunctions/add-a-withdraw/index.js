'use strict';

exports.main = async (event, context) => {
	const db = uniCloud.database();
	const collection = db.collection('a-withdraw');

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
		let res = await collection.add(
			[{
				runningfile: param.runningfile,
				withdraw: param.withdraw,
				image: param.image,
				state: "1",
				creation_time: timestamp
			}, ])
		return {
			code: 200,
			message: "添加成功！",
			timestamp,
			res
		};
	} catch (err) {
		return {
			code: -1,
			message: "添加失败！",
			err
		};
	}
};