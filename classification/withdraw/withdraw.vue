//提现页面
<template>
	<view>
		<uni-section title="提现金额" :subTitle="`可提现金额： ${price} 元` " titleFontSize="16px" subTitleFontSize="15px"
			type="line" padding>
			<uni-easyinput v-model="withdraw" type="number" placeholder="请输入提现金额" />
		</uni-section>
		<uni-section title="请上传微信收款二维码" titleFontSize="16px" type="line" padding>
			<view class="example-body">
				<uni-file-picker :sourceType="way" @success="addsuccess" @fail="addfail" @delete="deleteimg" limit="1"
					title="最多选择1张图片"></uni-file-picker>
			</view>
		</uni-section>
		<view style="padding: 10px;">
			<button type="primary" @click="submit">提交申请</button>
		</view>
	</view>
</template>

<script setup>
	import {
		addwithdraw,
		addaccount
	} from '../../api/running.js'
	import {
		ref
	} from 'vue'
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		getuser
	} from '../../api/login.js'

	const runningfile = ref({})
	const way = ref(['album', 'camera'])

	const price = ref();
	const withdraw = ref()
	const identityimg = ref('')

	//提交
	const submit = () => {
		uni.showLoading({
			mask: true,
			title: '加载中'
		});
		if (!withdraw.value) {
			uni.showToast({
				icon: 'error',
				title: '请输入提现金额'
			})
			return
		}
		if (withdraw.value > price.value) {
			uni.showToast({
				icon: 'error',
				title: '金额大于余额'
			})
			return
		}
		if (!identityimg.value) {
			uni.showToast({
				icon: 'error',
				title: '请上传微信收款码'
			})
			return
		}
		withdrawDeposit()
	}

	const withdrawDeposit = () => {
		addwithdraw(runningfile.value, withdraw.value, identityimg.value)
			.then((res) => {
				console.log(res)
				addaccountmsg()
				uni.hideLoading();
			})
			.catch((err) => {
				console.log(err)
				uni.showToast({
					icon: 'error',
					title: '出错了！'
				})
				uni.hideLoading();
			})
	}


	const addaccountmsg = () => {
		var negativeNum = -withdraw.value;
		addaccount(runningfile.value, negativeNum)
			.then((res) => {
				console.log(res)
				uni.showToast({
					icon: 'none',
					title: '提现成功！'
				})
				setTimeout(() => {
					uni.navigateBack()
				}, 1000)
				uni.hideLoading();
			})
			.catch((err) => {
				console.log(err)
				uni.showToast({
					icon: 'error',
					title: '出错了！'
				})
				uni.hideLoading();
			})
	}

	//图片上传成功
	const addsuccess = (e) => {
		console.log(e)
		identityimg.value = e.tempFilePaths[0]
	}

	//图片上传失败
	const addfail = (e) => {
		console.log(e)
		uni.showToast({
			icon: 'error',
			title: '图片上传失败！'
		})
	}

	//删除图片
	const deleteimg = (e) => {
		console.log(e)
	}

	const usermsg = () => {
		uni.showLoading({
			mask: true,
			title: '加载中'
		});
		getuser()
			.then((res) => {
				console.log(res)
				runningfile.value = res.data
				uni.hideLoading();
			})
			.catch((err) => {
				console.log(err)
				uni.showToast({
					icon: 'error',
					title: '出错了！'
				})
				setTimeout(() => {
					uni.navigateBack()
				}, 1000)
				uni.hideLoading();
			})
	}

	onLoad((option) => {
		console.log(option)
		price.value = Number(option.price)
		usermsg()
	})
</script>

<style>
</style>