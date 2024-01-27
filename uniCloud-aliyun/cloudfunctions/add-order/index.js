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
	const zeroTimestamp = new Date(timestamp).setHours(0, 0, 0, 0);

	try {
		let res = await collection.add(
			[{
				usermessage: param.usermessage,
				datafile: param.datafile,
				pickupaddress: param.pickupaddress,
				closedaddress: param.closedaddress,
				designation: param.designation,
				state: param.state,
				creation_time: timestamp,
				zeroTimestamp: zeroTimestamp,
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