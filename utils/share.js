export default {
	onShareAppMessage(res) {
		return {
			path: "/pages/index/index", //不设置默认当前页面
			title: "小熊代拿"
		}
	},
	onShareTimeline() {
		return {
			path: "/pages/index/index", //不设置默认当前页面
			title: "小熊代拿"
		}
	},
}