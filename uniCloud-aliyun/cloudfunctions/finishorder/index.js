'use strict';

exports.main = async (event, context) => {
	const db = uniCloud.database();
	const collection1 = db.collection('a-order');
	const collection2 = db.collection('a-account');

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
		const msg = await collection2.add(
			[{
				runningmsg: param.runningmsg,
				price: param.price,
				creation_time: timestamp,
				zeroTimestamp: zeroTimestamp
			}, ])
		const ids = msg.ids[0]
		if (msg.inserted == 1) {
			try {
				const res = await collection1.where({
					_id: param.id,
				}).update({
					state: '4',
					runstate: '3',
					finishtime: timestamp,
					finishzeroTimestamp: zeroTimestamp
				});
				return {
					code: 200,
					message: "修改成功！",
					res
				};
			} catch (err) {
				try {
					const result = await collection2.doc(ids).remove()
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
			}
		}
	} catch (err) {
		return {
			code: -1,
			message: "修改失败！",
			err
		};
	}
};