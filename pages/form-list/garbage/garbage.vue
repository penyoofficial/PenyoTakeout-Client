//垃圾处理
<template>
	<view>
		<view class="farme">
			<uni-section :title="pickupreveal.title" subTitleFontSize="14px" titleFontSize="16px" type="line"
				@click="gotoaddress('../../address/address?num=','1')" :subTitle="pickupreveal.msg ">
				<template v-slot:right>
					<image src="../../../static/img/jiantou.png" style="width: 15px; height: 15px;"></image>
				</template>
			</uni-section>
			<view class="section-box"></view>
			<uni-section title="描述你的需求" subTitleFontSize="14px" titleFontSize="16px" type="line"
				padding="0px 10px 10px 10px">
				<uni-easyinput type="textarea" v-model="datafile.describe" placeholder="请输入内容"></uni-easyinput>
			</uni-section>
			<view class="section-box"></view>
			<uni-section titleFontSize="16px" type="line" title="骑手打赏">
				<template v-slot:right>
					<view style="display: flex;">
						<input class="uni-input" type="number" @input="givereward" placeholder="添加消费小哥送的更快"
							placeholder-class="plaClass" />
						<image src="../../../static/img/jiantou.png"
							style="width: 15px; height: 15px; margin-top: 7rpx; margin-left: 5px;"></image>
					</view>
				</template>
			</uni-section>
		</view>

		<view class="buttom-box"
			style="position: fixed; bottom: 0; width: 100%; height: 100px;background-color: #ffffff;">
			<view class="content-box" style="display: flex; padding: 15px;">
				<view class="text-box" style="font-weight: 500;font-size: 17px">
					<text>预估总价：</text>
					<text style="color: #fc0606; font-weight: bold;">￥{{datafile.price}}</text>
					<view class="basics" style="font-size: 14px; color: #999; margin-top: 3rpx;">基础服务费，打赏费</view>
				</view>
				<view class="clike-box" @click="confirm">
					立即下单
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		addorder
	} from '../../../api/order.js'
	import {
		getuser
	} from '../../../api/login.js'
	import {
		payorderinfo
	} from '../../../api/pay-orderinfo.js'
	import {
		rubbish
	} from '../../../api/order.js'
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		ref,
		onMounted
	} from 'vue'
	import BigNumber from '../../../node_modules/bignumber.js/bignumber.js'

	const pickupreveal = ref({
		"title": "取件地址信息",
		"msg": "点击选择取件信息"
	}) //取件地址显示
	const pickupaddress = ref({}) //取件地址
	const closedaddress = ref({}) //取件地址
	const openid = ref(''); //openid
	const usermessage = ref({}); //用户信息
	const datafile = ref({}) //上传数据
	const judgment = ref(''); //页面判断
	const price = ref('') //价格
	const reward = ref('0') //打赏

	//信息校验
	const judge = () => {
		if (Object.keys(pickupaddress.value).length === 0) {
			uni.showToast({
				title: '请选择取件地址信息',
				icon: 'none'
			})
			return
		}
		confirm()
	}

	//下单
	const confirm = () => {
		var randomString = generateRandomString(24);
		datafile.value.ordernum = randomString
		console.log(datafile)
		var a = new BigNumber(datafile.value.price);
		var b = new BigNumber(100);
		var pricenum = a.times(b);
		var designation = '垃圾处理'
		uni.showLoading({
			mask: true,
			title: '加载中'
		});
		payorderinfo(openid.value, randomString, pricenum, designation)
			.then((res) => {
				console.log('209', res);
				uni.requestPayment({
					// #ifdef MP-WEIXIN
					...res.orderInfo,
					// #endif
					success: (success) => {
						uni.hideLoading();
						if (success.errMsg === "requestPayment:ok") {
							console.log("requestPayment:ok")
							uploading('2')
						}
					},
					fail: (err) => {
						if (err.errMsg === "requestPayment:fail cancel") {
							console.log("requestPayment:fail cancel")
							uploading('1')
						}
					}
				});
			})
			.catch((err) => {
				console.log(err)
				uni.hideLoading();
			})
	}

	//上传订单信息
	const uploading = (num) => {
		var designation = '垃圾处理'
		addorder(usermessage.value, datafile.value, pickupaddress.value, closedaddress.value, num, designation)
			.then((res) => {
				console.log(res)
				uni.hideLoading();
				if (num === '2') {
					uni.navigateTo({
						url: '/uni_modules/uni-pay/pages/success/success?total_fee=' + datafile.value
							.price +
							'&order_no=' + datafile.value.ordernum + '&pay_date=' + res.timestamp
					})
				} else {
					console.log('未付款！')
					uni.navigateTo({
						url: '/pages/order/order?num=' + 0 + '&sc=' + '0'
					});
				}
			})
			.catch((err) => {
				console.log(err)
				uni.hideLoading();
			})
	}

	//随机算法
	const generateRandomString = (length) => {
		var result = '';
		var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for (var i = 0; i < length; i++) {
			var randomIndex = Math.floor(Math.random() * characters.length);
			result += characters.charAt(randomIndex);
		}
		return result;
	}

	//打赏
	const givereward = (e) => {
		if (e.detail.value) {
			datafile.value.reward = e.detail.value
			reward.value = e.detail.value
			const a = new BigNumber(e.detail.value);
			const b = new BigNumber(price.value);
			const sum = a.plus(b);
			datafile.value.price = sum.toString()
		} else {
			datafile.value.price = price.value
		}
	}

	//选择地址
	const gotoaddress = (url, num) => {
		judgment.value = '1'
		uni.navigateTo({
			url: url + num
		})
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
				openid.value = res.data.openid
				usermessage.value = res.data
				getprice()
			})
			.catch((err) => {
				console.log(err)
				uni.clearStorage()
				uni.showToast({
					icon: 'error',
					title: '请登录小程序！'
				})
				setTimeout(() => {
					uni.reLaunch({
						url: '../../mine/mine'
					})
				}, 1000)
				uni.hideLoading();
			})
	}

	//获取垃圾处理基础收费
	const getprice = () => {
		rubbish()
			.then((res) => {
				console.log(res)
				datafile.value.price = res.data.price
				price.value = res.data.price
				uni.hideLoading();
			})
			.catch((err) => {
				console.log(err)
				uni.hideLoading();
			})
	}

	onMounted(() => {
		usermsg()
	});

	//传参
	onLoad((option) => {
		if (judgment.value === '1') {
			console.log('地址1')
			pickupaddress.value = option
			pickupreveal.value.title = option.name + '--' + option.phone
			pickupreveal.value.msg = option.address
		}
	});
</script>

<style>
	page {
		background-color: #f8f8f8;
	}

	.farme {
		margin: 0 auto;
		margin-bottom: 10px;
		width: 95%;
		background-color: #ffffff;
		border-radius: 5px;
	}

	.section-box {
		margin: 0 auto;
		width: 95%;
		border-bottom: 1px solid #EEEEEE;
	}

	.plaClass {
		text-align: right;
	}

	.uni-input {
		text-align: right;
	}

	.clike-box {
		width: 120px;
		height: 40px;
		border-radius: 50px;
		background-color: #27ba9b;
		color: #ffffff;
		margin-left: auto;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
</style>