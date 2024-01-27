//问题反馈
<template>
	<view>
		<view class="idea-box">
			<view class="text">
				问题反馈与意见建议
			</view>
			<view class="qwe">
				<text style="color: red;">*</text>
			</view>
		</view>
		<view class="text-box">
			<uni-easyinput type="textarea" v-model="msg" placeholder="请输入内容"></uni-easyinput>
		</view>

		<view class="idea-box">
			<view class="text">
				联系电话
			</view>
			<view class="qwe">
				<text style="color: red;">*</text>
			</view>
		</view>

		<view class="text-box">
			<uni-easyinput class="uni-mt-5" trim="all" v-model="phone" placeholder="请输入联系电话"></uni-easyinput>
		</view>

		<view class="send" @click="send">
			发送
		</view>
		<button class="custom-button" open-type="contact">在线客服</button>
	</view>
</template>

<script setup>
	import {
		idea
	} from '../../../api/merchant.js'

	import {
		ref
	} from 'vue'

	const msg = ref('');
	const phone = ref('');

	const send = () => {
		if (!msg) {
			uni.showToast({
				title: '请输入意见！',
				icon: 'none'
			})
			return
		}
		if (!phone) {
			uni.showToast({
				title: '请输入联系电话！',
				icon: 'none'
			})
			return
		}
		if (!/^1[3-9]\d{9}$/.test(phone.value)) {
			uni.showToast({
				title: '手机号格式不正确！',
				icon: 'none'
			})
			return
		}
		console.log('校验完成')
		putidea()
	}

	//上传
	const putidea = () => {
		uni.showLoading({
			mask: true,
			title: '加载中'
		});
		idea(msg.value, phone.value)
			.then((res) => {
				console.log(res)
				uni.showToast({
					icon: 'success',
					title: '反馈成功'
				})
				msg.value = null
				phone.value = null
			})
			.catch((err) => {
				console.log(err)
				uni.showToast({
					icon: 'error',
					title: '反馈失败'
				})
			})
	}
</script>

<style>
	page {
		background: #f8f8f8;
	}

	.idea-box {
		margin: 0 auto;
		width: 94%;
		height: 45px;
		display: flex;
	}

	.text-box {
		margin: 0 auto;
		width: 95%;
	}

	.text {
		display: flex;
		justify-content: center;
		flex-direction: column;
	}

	.qwe {
		display: flex;
		justify-content: center;
		flex-direction: column;
	}

	.send {
		margin: 0 auto;
		margin-top: 15px;
		width: 95%;
		height: 45px;
		border-radius: 50px;
		background: #2979FF;
		color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.custom-button {
		margin: 0 auto;
		margin-top: 15px;
		width: 95%;
		height: 45px;
		background: #FFCC00;
		border-radius: 50px;
	}
</style>