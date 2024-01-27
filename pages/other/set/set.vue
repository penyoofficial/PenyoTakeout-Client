//设置
<template>
	<view>
		<view class="example"
			style="padding: 20rpx 20rpx 20rpx 20rpx; margin: 0 20rpx; border-radius: 15rpx; background-color: #fff;">

			<view class="top-box" @click="gotopage('../../address/address')"
				style="height: 45px; border-bottom: 1rpx solid #ddd;">
				<view class="text">
					地址管理
				</view>
				<view class="compile">
					<image style="width: 15px;height: 15px;margin-left: 10px;" src="../../../static/img/jiantou.png">
					</image>
				</view>
			</view>

			<view class="top-box" @click="gotopage('../../other/data/data')"
				style="height: 50px; border-bottom: 1rpx solid #ddd;">
				<view class="text">
					个人资料
				</view>
				<view class="compile">
					<image style="width: 15px;height: 15px;margin-left: 10px;" src="../../../static/img/jiantou.png">
					</image>
				</view>
			</view>

			<view class="top-box" @click="gotopage('../../other/client/client')"
				style="height: 50px; border-bottom: 1rpx solid #ddd;">
				<view class="text">
					问题反馈
				</view>
				<view class="compile">
					<image style="width: 15px;height: 15px;margin-left: 10px;" src="../../../static/img/jiantou.png">
					</image>
				</view>
			</view>

			<view class="top-box" style="height: 45px;" @click="call">
				<view class="text">
					联系我们
				</view>
				<view class="right-text">
					{{phone}}
				</view>
				<view class="compile">
					<image style="width: 15px;height: 15px;margin-left: 10px;" src="../../../static/img/jiantou.png">
					</image>
				</view>
			</view>
		</view>

		<view class="example" @click="gotopage('../../other/about/about')"
			style="padding: 20rpx 20rpx 20rpx 20rpx; margin: 10px 20rpx; border-radius: 15rpx; background-color: #fff;">
			<view class="top-box" style="height: 35px;">
				<view class="text">
					关于小熊代拿
				</view>
				<view class="compile">
					<image style="width: 15px;height: 15px;margin-left: 10px;" src="../../../static/img/jiantou.png">
					</image>
				</view>
			</view>
		</view>

		<button class="button" @click="quit">退出登录</button>
	</view>
</template>

<script setup>
	import {
		merchant
	} from '../../../api/merchant.js'
	import {
		ref,
		onMounted
	} from 'vue'

	const phone = ref('')
	const phoneNamber = ref('')

	//获取商家信息
	const getmerchant = () => {
		uni.showLoading({
			mask: true,
			title: '加载中'
		});
		merchant('1001')
			.then((res) => {
				console.log(res)
				phoneNamber.value = res.data.msg
				updataphone(res.data.msg)
			})
			.catch((err) => {
				console.log(err)
				uni.hideLoading();
			})
	}

	//手机号处理
	const updataphone = (num) => {
		phone.value = num.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
		uni.hideLoading();
	}

	const call = () => {
		uni.showModal({
			title: '拨号确认',
			content: '确定要拨打电话吗？',
			success: (res) => {
				if (res.confirm) {
					uni.makePhoneCall({
						phoneNumber: phoneNamber.value
					})
				}
			},
		})
	}

	const gotopage = (url) => {
		uni.navigateTo({
			url: url
		})
	}

	const quit = () => {
		uni.showModal({
			title: '提示',
			content: '确定退出登录吗？',
			cancelText: "取消", // 取消按钮的文字  
			confirmText: "确认", // 确认按钮的文字  
			showCancel: true, // 是否显示取消按钮，默认为 true
			confirmColor: '#4CD964',
			cancelColor: '#303133',
			success: (res) => {
				if (res.confirm) {
					console.log('comfirm')
					uni.clearStorage()
					uni.reLaunch({
						url: '../../mine/mine'
					})
				} else {
					console.log('cancel')
				}
			}
		})
	}

	onMounted(() => {
		getmerchant()
	});
</script>

<style>
	page {
		background-color: #F8F8F8;
	}

	.top-box {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.text {
		display: flex;
		justify-content: center;
		flex-direction: column;
	}

	.compile {
		display: flex;
		justify-content: center;
		flex-direction: column;
	}

	.button {
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		margin: 30rpx 20rpx;
		color: #fff;
		border-radius: 80rpx;
		font-size: 30rpx;
		background-color: #27ba9b;
	}

	.right-text {
		text-align: end;
		margin-left: auto;
		font-size: 15px;
		color: #515151;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}
</style>