'use strict';

exports.main = async (event, context) => {
	const db = uniCloud.database();
	const collection = db.collection('a-rubbish');


	try {
		const res = await collection.get()
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