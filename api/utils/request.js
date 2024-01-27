//生产服务器
const base_url = 'https://fc-mp-33420585-9183-4b24-8565-0e60180fbb5d.next.bspapp.com'
/** 
 * @param {Object} opts 接收4个属性：(1)path：业务api路径，以'/'开头；
 * (2)data：body中的请求参数(map或list)
 * (3)token请求头
 * (4)mothod请求方式
 */
export default function request(opts) {
	const path = opts['path']
	const url = base_url + path
	const token = opts['token']

	const options = {
		url: url,
		method: opts['method'],
		data: opts['data'],
		header: {
			'token': token
		},
	}
	return new Promise((resolve, reject) => {
		uni.request({
			...options,
			success: res => {
				if (res.data.code != 200) {
					console.log(`[业务请求]('${path}')失败，服务器返回异常的状态码:`, res)
					const fakeData = {
						err_code: 1
					}
					reject(fakeData)
					return
				}

				const bodyData = res.data
				console.log(`[业务请求]('${path}')响应:`, bodyData)
				resolve(bodyData)
			},
			fail: err => {
				console.log(`[业务请求]('${path}')错误:`, err)
				reject(err)
			}
		})
	})
}