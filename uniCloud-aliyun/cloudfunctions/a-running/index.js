'use strict';

exports.main = async (event, context) => {
	const db = uniCloud.database();
	const collection1 = db.collection('a-users');
	const collection2 = db.collection('a-running');

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

	const token = event.headers.token;
	const timestamp = Date.now();

	try {
		const res = await collection1.where({
			token: token
		}).get()

		if (res.affectedDocs > 0) {
			const userid = res.data[0]._id
			const openid = res.data[0].openid
			const name = res.data[0].name
			const gender = res.data[0].gender
			const phone = res.data[0].phone
			const head = res.data[0].head
			let msg = await collection2.add(
				[{
					userid: userid,
					openid: openid,
					name: name,
					gender: gender,
					phone: phone,
					head: head,
					identity: param.identity,
					identityimg: param.identityimg,
					role: '0',
					creation_time: timestamp
				}, ])
			return {
				code: 200,
				message: "添加成功！",
				msg
			};
		} else {
			return {
				code: -1,
				message: "添加失败！",
				res
			};
		}
	} catch (err) {
		return {
			code: -1,
			message: "添加失败！",
			err
		};
	}
};