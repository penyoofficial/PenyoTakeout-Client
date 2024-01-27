//首页组件
<template>
	<view class="content">
		<view class="top-baeder" style="width: 100%;height: 95px;display: flex;" @click="authorization">
			<view class="address-image">
				<image src="../../static/img/address.png"
					style="width: 20px;height: 20px;margin-left: 15px;margin-top: 57px;"></image>
			</view>
			<view class="address-name" style="margin-top: 57px;margin-left: 5px;">
				<text>{{address}}</text>
			</view>
			<view class="address-image">
				<image src="../../static/img/arrows.png" style="width: 20px;height: 20px;margin-top: 58px;"></image>
			</view>
		</view>

		<view class="advertising" style="margin: 0 15px;width: calc(100% - 30px);border-radius: 10px;">
			<image src="https://mp-33420585-9183-4b24-8565-0e60180fbb5d.cdn.bspapp.com/images/advertising.png"
				style="width: 100%;height: 150px;border-radius: 5px;"></image>
		</view>

		<view class="announcement" v-if="announcement"
			style="margin: 0 15px;width: calc(100% - 30px);margin-top: 10px;">
			<uni-notice-bar show-icon scrollable :text="announcement" />
		</view>

		<view class="forme" style="margin: 0 15px;width: calc(100% - 30px);display:flex;">
			<view class="module-box" @click="gotopage('../form-list/expressage/expressage')"
				style="margin-right: 10px;">
				<view class="image-box">
					<image src="../../static/img/expressage.png"></image>
				</view>
				<view class="text" style="display: flex;justify-content: center;flex-direction: column;">
					<view style="font-weight: bold;margin-left: 10px;margin-bottom: 10px;">
						<text>快递代取</text>
					</view>
					<view style="font-size: 14px;color: #2c2c2c;margin-left: 10px;">
						<text>最快30分钟送达</text>
					</view>
				</view>
			</view>

			<view class="module-box" @click="gotopage('../form-list/garbage/garbage')">
				<view class="image-box">
					<image src="../../static/img/rubbish.png"></image>
				</view>
				<view class="text" style="display: flex;justify-content: center;flex-direction: column;">
					<view style="font-weight: bold;margin-left: 10px;margin-bottom: 10px;">
						<text>垃圾处理</text>
					</view>
					<view style="font-size: 14px;color: #2c2c2c;margin-left: 10px;">
						<text>帮忙代扔垃圾</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		merchant
	} from '../../../api/merchant.js'
	
	import {
		onMounted,
		ref
	} from 'vue'
	import QQMapWX from '../../../utils/qqmap-wx-jssdk.min.js'
	const address = ref('定位中...');
	const announcement = ref('');
	
	//获取商家信息
	const getmerchant = () => {
		merchant('1000')
			.then((res) => {
				console.log(res)
				announcement.value = res.data.msg
			})
			.catch((err) => {
				console.log(err)
			})
	}
	

	//进入页面
	const gotopage = (url) => {
		uni.navigateTo({
			url: url
		})
	}

	//校验定位授权
	const authorization = () => {
		address.value = '定位中...'
		uni.getSetting({
			success(res) {
				console.log(res)
				if (!res.authSetting['scope.userLocation']) {
					pullup()
				} else {
					getLocation()
				}
			}
		})
	}

	//拉起定位授权
	const pullup = () => {
		uni.authorize({
			scope: 'scope.userLocation',
			success() {
				getLocation()
			},
			fail(error) {
				uni.showModal({
					title: '提示',
					content: '若点击不授权，将无法使用位置功能',
					cancelText: '不授权',
					cancelColor: '#999',
					confirmText: '授权',
					confirmColor: '#f94218',
					success(res) {
						console.log(res)
						if (res.confirm) {
							// 选择弹框内授权
							uni.openSetting({
								success: (res) => {
									if (res.authSetting['scope.userLocation']) {
										// 授权成功
										uni.showToast({
											title: '授权成功',
											icon: 'none'
										})
									} else {
										// 未授权
										uni.showToast({
											title: '授权失败',
											icon: 'none'
										})
									}
								}
							})
						} else if (res.cancel) {
							// 选择弹框内 不授权
							console.log('用户点击不授权')
						}
					}
				})
			}
		})
	}


	//获取定位
	const getLocation = () => {
		uni.getLocation({
			type: 'wgs84',
			success: function(res) {
				console.log(res)
				console.log('当前位置的经度：' + res.longitude)
				console.log('当前位置的纬度：' + res.latitude)
				analysis(res.latitude, res.longitude)
			},
			fail(error) {
				address.value = '定位失败'
				console.log('失败', error)
			}
		})
	}

	//逆经纬度解析地址
	const analysis = (latitude, longitude) => {
		// var QQMapWX = require('@/utils/qqmap-wx-jssdk.min.js');
		// 实例化API核心类
		var qqmapsdk = new QQMapWX({
			key: 'RLQBZ-EFCWG-2B6QG-Q7FNU-UFMDO-IHBB6' // 必填
		});
		//逆地址解析  坐标转地址信息
		qqmapsdk.reverseGeocoder({
			//Object格式
			location: {
				latitude: latitude,
				longitude: longitude
			},
			success: function(res) { //成功后的回调
				console.log(res)
				address.value = res.result.formatted_addresses.recommend
			},
			fail: function(error) {
				console.error(error);
				address.value = '定位失败'
			}
		})
	}

	onMounted(() => {
		getmerchant()
		authorization()
	});
</script>

<style>
	page {
		background-color: #F8F8F8;
	}

	.module-box {
		background-color: #FFFFFF;
		width: calc(50% - 5px);
		border-radius: 5px;
		display: flex;
	}

	.image-box {
		height: 90px;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}

	.image-box image {
		margin-left: 10px;
		width: 50px;
		height: 50px;
	}
</style>