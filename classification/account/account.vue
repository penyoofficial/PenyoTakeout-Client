//我的账户
<template>
	<view>
		<view style="margin: 0 auto; width: 95%; height: 100px; border-radius: 10px; background-color: #fea826;">
			<view style="padding: 10px;">
				<view style="font-weight: 500;">
					账户余额
				</view>
				<view style="margin-top: 15px; display: flex;">
					<view>
						<text style="font-size: 30px; font-weight: 500;">{{price}}</text>
						<text style="font-weight: 500;">元</text>
					</view>
					<view style="margin-left: auto; margin-top: 10px;">
						<button type="warn" size="mini"
							@click="gotopage('/classification/withdraw/withdraw?price=')">提现</button>
					</view>
				</view>
			</view>
		</view>

		<view class="logo-bx"
			style="margin: 0 auto; margin-top: 15px; display: flex;width: 95%; padding-bottom: 10px; border-bottom: 2px solid #EEEEEE;">
			<view class="module-box" @click="gotopage('/classification/statistics/statistics?price=')">
				<image src="../../../static/mine_logo/ordertongji.png" style="width: 40px;height: 40px;"></image>
				<text style="font-size: 14px;font-weight: 500; margin-top: 5px;">订单统计</text>
			</view>
			<view class="module-box" @click="gotopage('/classification/fund/fund?price=')">
				<image src="../../../static/mine_logo/monnyr.png" style="width: 40px;height: 40px;"></image>
				<text style="font-size: 14px;font-weight: 500; margin-top: 5px;">资金明细</text>
			</view>
			<view class="module-box" @click="gotopage('/classification/withdraw/withdraw?price=')">
				<image src="../../../static/img/tixian.png" style="width: 40px;height: 40px;"></image>
				<text style="font-size: 14px;font-weight: 500; margin-top: 5px;">立即提现</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		getaccountprice
	} from '../../api/running.js'
	import {
		getuser
	} from '../../api/login.js'
	import {
		ref
	} from 'vue'
	import {
		onShow
	} from "@dcloudio/uni-app"

	const price = ref('');
	const runningfile = ref({})

	const gotopage = (url) => {
		uni.navigateTo({
			url: url + price.value
		})
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
				prcice()
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

	//获取余额
	const prcice = () => {
		uni.showLoading({
			mask: true,
			title: '加载中'
		});
		getaccountprice(runningfile.value.openid)
			.then((res) => {
				price.value = res.data
				uni.hideLoading();
			})
			.catch((err) => {
				uni.hideLoading();
			})
	}

	onShow(() => {
		usermsg()
	})
</script>

<style>
	page {
		background-color: #f8f8f8;
	}

	.module-box {
		margin-top: 15px;
		width: 25%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
</style>