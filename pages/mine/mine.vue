//我的
<template>
	<view class="content">
		<!-- 个人资料 -->
		<view style="margin-bottom: 10px;">
			<view class="top">
				<view class="center">
					<view class="center_top" v-if="loginverify">
						<view class="center_img" @click="gotopage('../other/data/data')">
							<image :src="usermsglist.head"></image>
						</view>
						<view class="center_info" @click="gotopage('../other/data/data')">
							<view class="center_name">
								<view>{{usermsglist.name}}</view>
							</view>
							<view class="center_vip">
								<image class="rank_icon" src="../../static/img/phone.png" />
								<view class="vip_text">
									<text>{{phone}}</text>
								</view>
							</view>
						</view>
						<view style="margin-left: 150rpx;margin-top: 15rpx;">
							<image @click="gotopage('../other/set/set')" style="width: 30px;height: 30px;"
								src="../../static/img/set.png"></image>
						</view>
					</view>

					<!--登录 -->
					<view class="login" v-if="!loginverify && !loginverifyshow" @click="gotopage('../login/login')">
						立即登录
					</view>
				</view>
				<image mode='scaleToFill' class='gif-wave'
					src="https://mp-33420585-9183-4b24-8565-0e60180fbb5d.cdn.bspapp.com/images/gifimage.gif"></image>
			</view>
		</view>

		<!-- 我的订单模块 -->
		<MyOrder></MyOrder>

		<view class="placeholder" style="width: 100%; height: 10px;"></view>

		<!-- 骑手终端 -->
		<Rider v-if="usermsglist.role === '员工'"></Rider>
		<!-- <Rider></Rider> -->

		<view class="placeholder" style="width: 100%; height: 10px;"></view>

		<!-- 功能模块 -->
		<Function></Function>

		<view class="placeholder" style="width: 100%; height: 10px;"></view>

		<!-- 更多推荐 -->
		<Recommend></Recommend>

		<!-- 版本号 -->
		<view class="version"
			style="width: 100%;height: 40px;font-size: 14px;color: #515151;display: flex;align-items: center;justify-content: center;flex-direction: column;">
			<text :key="appVersion">---{{appVersion}}---</text>
		</view>
	</view>
</template>

<script setup>
	import {
		getuser
	} from '../../api/login.js'

	import MyOrder from '../mine/module/my_order.vue'
	import Function from '../mine/module/function.vue'
	import Recommend from '../mine/module/recommend.vue'
	import Rider from '../mine/module/rider.vue'
	import {
		defineComponent,
		onMounted,
		ref
	} from 'vue'

	const Mine = defineComponent({
		components: {
			MyOrder,
			Function,
			Recommend,
			Rider
		},
	})

	const appVersion = ref('');
	const loginverify = ref(false);
	const loginverifyshow = ref(true);
	const usermsglist = ref([]);
	const phone = ref('');

	//进入页面
	const gotopage = (url) => {
		uni.navigateTo({
			url: url
		})
	}

	// 获取版本号
	const getversion = () => {
		let accountInfo = wx.getAccountInfoSync();
		let envVersion = accountInfo.miniProgram.envVersion;
		if (envVersion !== 'release') {
			appVersion.value = envVersion + uni.getSystemInfoSync().appVersion
		} else {
			appVersion.value = accountInfo.miniProgram.version
		}
		console.log(appVersion)
	}

	//获取用户信息
	const usermsg = () => {
		uni.showLoading({
			mask: true,
			title: '加载中'
		});
		getuser()
			.then((res) => {
				console.log(res)
				loginverify.value = true
				usermsglist.value = res.data
				updataphone(res.data.phone)
			})
			.catch((err) => {
				console.log(err)
				loginverifyshow.value = false
				uni.clearStorage()
				uni.hideLoading();
			})
	}

	//手机号处理
	const updataphone = (num) => {
		phone.value = num.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
		uni.hideLoading();
	}

	onMounted(() => {
		usermsg()
		getversion()
	});
</script>

<style>
	page {
		background-color: #F8F8F8;
	}

	.top {
		width: 100%;
		height: 130px;
		background: #00FFFF;
		padding-top: 15px;
		position: relative;
	}

	.center {
		width: 95%;
		height: 100px;
		background: white;
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		border-radius: 5px;
	}

	.center_top {
		display: flex;
		flex-direction: row;
		width: 90%;
		height: 80px;
		margin: 0 auto;
		margin-top: 20rpx;
		border-bottom: 1px solid #EEEEEE;
	}

	.center_img {
		margin-top: 10px;
		width: 60px;
		height: 60px;
		border-radius: 50%;
		overflow: hidden;
	}

	.center_img image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.center_img .user_head {
		width: 100%;
		height: 100%;
	}

	.center_info {
		display: flex;
		flex-direction: column;
		margin-top: 20rpx;
		margin-left: 30px;
	}

	.center_name {
		font-size: 19px;
		font-weight: bold;
	}

	.center_vip image {
		width: 25px;
		height: 25px;
		margin-top: 15rpx;
	}

	.vip_text {
		margin-top: -55rpx;
		margin-left: 50rpx;
		color: #AAAAAA;
	}

	.gif-wave {
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 100rpx;
	}

	.wrapper {
		position: absolute;
		top: 0;
		bottom: 0;

		width: 100%;
		background-color: #F4F4F4;
	}

	.login {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		font-size: 23px;
		font-weight: bold;
	}
</style>