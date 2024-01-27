'use strict';

exports.main = async (event, context) => {
	const db = uniCloud.database();
	const collection = db.collection('a-account');

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
	const zeroTimestamp = new Date(timestamp).setHours(0, 0, 0, 0);

	try {
		const res = await collection.where({
			['runningmsg.openid']: param.openid,
			zeroTimestamp: zeroTimestamp
		}).get()

		const totalPrice = res.data.reduce((acc, obj) => {
			const price = parseFloat(obj.price);
			return acc + (isNaN(price) ? 0 : price);
		}, 0);

		return {
			code: 200,
			message: "查询成功！",
			data: {
				'single': res.data.length,
				'price': totalPrice
			}
		};
	} catch (err) {
		return {
			code: -1,
			message: "查询失败！",
			err
		};
	}
};