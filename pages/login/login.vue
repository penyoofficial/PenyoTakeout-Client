//登录
<template>
	<view class="viewport">
		<view class="logo">
			<image src="https://mp-33420585-9183-4b24-8565-0e60180fbb5d.cdn.bspapp.com/images/logo.png"></image>
		</view>
		<view class="login">
			<button class="button phone" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
				<text class="icon icon-phone"></text>
				手机号快捷登录
			</button>
			<view class="extra">
				<view class="caption">
					<text>登录享受更多服务</text>
				</view>
			</view>
			<view class="tips">登录/注册即视为你同意《服务条款》和《小熊代拿隐私协议》</view>
		</view>
	</view>
</template>

<script setup>
	import {
		login,
		authorization
	} from '../../api/login.js'
	import {
		h,
		ref
	} from 'vue'

	const phone = ref('');
	const name = ref('');
	const gender = ref('');
	const head = ref('');

	//获取手机号
	const getPhoneNumber = (e) => {
		uni.clearStorage()
		console.log(e)
		if (e.detail.errMsg == "getPhoneNumber:ok") {
			uni.showLoading({
				mask: true,
				title: '加载中'
			});
			let code = e.detail.code
			login(code)
				.then((res) => {
					console.log(res)
					phone.value = res.msg.data.phone_info.phoneNumber
					usersmsg()
				})
				.catch((err) => {
					console.log(err)
					uni.showToast({
						title: '授权失败',
						icon: 'none'
					})
				})
		}
	}

	//授权用户信息
	const usersmsg = () => {
		uni.hideLoading();
		uni.showModal({
			title: '提示',
			content: '授权获取用户信息！',
			cancelText: '不授权',
			cancelColor: '#999',
			confirmText: '授权',
			confirmColor: '#f94218',
			success(res) {
				console.log(res)
				if (res.confirm) {
					// 选择弹框内授权
					authorizationusers()
				} else if (res.cancel) {
					// 选择弹框内 不授权
					console.log('用户点击不授权')
					uni.showToast({
						title: '授权失败',
						icon: 'none'
					})
				}
			}
		})
	}

	//授权用户信息
	const authorizationusers = () => {
		uni.showLoading({
			mask: true,
			title: '加载中'
		});
		uni.getUserProfile({
			desc: "用于完善用户信息",
			success: (res) => {
				console.log(res)
				name.value = res.userInfo.nickName
				if (res.userInfo.gender == 0) {
					gender.value = '男'
				} else {
					gender.value = '女'
				}
				head.value = res.userInfo.avatarUrl
				getcode()
			},
			fail: (err) => {
				console.log(err)
				uni.showToast({
					title: '授权失败',
					icon: 'none'
				})
			}
		})
	}

	//获取code
	const getcode = () => {
		uni.login({
			provider: 'weixin',
			onlyAuthorize: true,
			success: function(loginRes) {
				console.log(loginRes)
				background(loginRes.code)
			},
			fail: (err) => {
				console.log(err)
				uni.showToast({
					title: '授权失败',
					icon: 'none'
				})
			}
		});
	}

	//请求后台
	const background = (code) => {
		console.log('请求后台')
		authorization(code, name.value, gender.value, phone.value, head.value)
			.then((res) => {
				console.log(res)
				uni.setStorageSync('token', res.token)
				uni.showToast({
					title: '授权成功',
					icon: 'none'
				})
				setTimeout(() => {
					uni.reLaunch({
						url: '../mine/mine'
					})
				}, 500)
			})
			.catch((err) => {
				console.log(err)
				uni.showToast({
					title: '授权失败',
					icon: 'none'
				})
			})
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.viewport {
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: 20rpx 40rpx;
	}

	.logo {
		flex: 1;
		text-align: center;

		image {
			width: 280rpx;
			height: 280rpx;
			margin-top: 15vh;
			border-radius: 50%;
		}
	}

	.login {
		display: flex;
		flex-direction: column;
		height: 60vh;
		padding: 40rpx 20rpx 20rpx;

		.button {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 80rpx;
			font-size: 28rpx;
			border-radius: 72rpx;
			color: #fff;

			.icon {
				font-size: 40rpx;
				margin-right: 6rpx;
			}
		}

		.phone {
			background-color: #28bb9c;
		}

		.wechat {
			background-color: #06c05f;
		}

		.extra {
			flex: 1;
			padding: 70rpx 70rpx 0;

			.caption {
				width: 440rpx;
				line-height: 1;
				border-top: 1rpx solid #ddd;
				font-size: 26rpx;
				color: #999;
				position: relative;

				text {
					transform: translate(-40%);
					background-color: #fff;
					position: absolute;
					top: -12rpx;
					left: 50%;
				}
			}

			.options {
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 70rpx;

				button {
					padding: 0;
					background-color: transparent;
				}
			}

			.icon {
				font-size: 24rpx;
				color: #444;
				display: flex;
				flex-direction: column;
				align-items: center;

				&::before {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 80rpx;
					height: 80rpx;
					margin-bottom: 6rpx;
					font-size: 40rpx;
					border: 1rpx solid #444;
					border-radius: 50%;
				}
			}

			.icon-weixin::before {
				border-color: #06c05f;
				color: #06c05f;
			}
		}
	}

	.tips {
		position: absolute;
		bottom: 80rpx;
		left: 20rpx;
		right: 20rpx;
		font-size: 22rpx;
		color: #999;
		text-align: center;
	}
</style>