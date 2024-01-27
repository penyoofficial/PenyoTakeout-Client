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

	const skip = (param.page - 1) * param.pageSize;
	// page 表示当前页数，pageSize 表示每页返回的数据条数
	try {
		const res = await collection.where({
				['usermessage.gender']: param.gender,
				state: param.state
			}).orderBy("creation_time", "desc")
			.skip(skip).limit(param.pageSize).get()
		return {
			code: 200,
			message: "查询成功！",
			data: res.data
		};
	} catch (err) {
		return {
			code: -1,
			message: "查询失败！",
			err
		};
	}
};