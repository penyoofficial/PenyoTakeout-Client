//订单详情
<template>
	<view>
		<view v-if="datafile.length == 1">
			<view class="frome">
				<text v-if="datafile[0].state == '2'" style="margin-left: 15px;">待接单</text>
				<text v-if="datafile[0].state == '3' && datafile[0].runstate == '1'"
					style="margin-left: 15px;">未取件</text>
				<text v-if="datafile[0].state == '3' && datafile[0].runstate == '2'"
					style="margin-left: 15px;">已取件</text>
				<text v-if="datafile[0].state == '4'" style="margin-left: 15px;">已完成</text>
				<text v-if="datafile[0].state == '1'" style="margin-left: 15px;">已取消</text>
				<text v-if="datafile[0].state == '5'" style="margin-left: 15px;">退款/售后</text>
			</view>
			<uni-section title="配送信息" titleFontSize="18px" v-if="datafile[0].pickupaddress.address">
			</uni-section>
			<uni-section :subTitle=" `取： ${datafile[0].pickupaddress.address}` "
				:title=" `${datafile[0].pickupaddress.name} -- ${datafile[0].pickupaddress.phone}` "
				titleFontSize="15px" subTitleFontSize="14px" type="circle" v-if="datafile[0].pickupaddress.address">
				<template v-slot:right>
					<image src="../../../static/img/jiantou.png" style="width: 15px; height: 15px;"></image>
				</template>
			</uni-section>
			<uni-section :subTitle=" `送： ${datafile[0].closedaddress.address}` "
				:title=" `${datafile[0].closedaddress.name} -- ${datafile[0].closedaddress.phone}` "
				titleFontSize=" 15px" subTitleFontSize="14px" type="circle" v-if="datafile[0].closedaddress.address">
				<template v-slot:right>
					<image src="../../../static/img/jiantou.png" style="width: 15px; height: 15px;"></image>
				</template>
			</uni-section>

			<uni-section title="备注" v-if="datafile[0].datafile.describe" titleFontSize="15px" padding="0 10px 0 10px">
				<uni-easyinput type="textarea" disabled v-model="datafile[0].datafile.describe"
					autoHeight></uni-easyinput>
			</uni-section>

			<uni-section title="配送员" v-if="datafile[0].runningfile" titleFontSize=" 15px">
				<template v-slot:right>
					<view style="display: flex;">
						<view style="margin-top: 5px; margin-right: 5px;">
							<text
								style="color: #999;">{{datafile[0].runningfile.name}}--{{datafile[0].runningfile.phone}}</text>
						</view>
						<view>
							<button type="default" @click="call(datafile[0].runningfile.phone)"
								size="mini">拨打电话</button>
						</view>
					</view>
				</template>
			</uni-section>
			<view class="line" style="margin-top: 10px;"></view>
			<uni-section title="商品信息" titleFontSize="18px"></uni-section>

			<view style="width: 100%; display: flex; margin-bottom: 5px; font-size: 15px;">
				<view style="margin-left: 10px;">
					<text style="color: #333;">商品名称</text>
				</view>
				<view style="text-align: end;margin-left: auto; margin-right: 10px;">
					<text style="color: #999;">{{datafile[0].designation}}</text>
				</view>
			</view>

			<view v-if="datafile[0].datafile.content"
				style="width: 100%; display: flex; margin-bottom: 5px; font-size: 15px;">
				<view style="margin-left: 10px;">
					<text style="color: #333;">物件大小</text>
				</view>
				<view style="text-align: end;margin-left: auto; margin-right: 10px;">
					<text style="color: #999;">{{datafile[0].datafile.content}}</text>
				</view>
			</view>

			<view v-if="datafile[0].datafile.tailnumber"
				style="width: 100%; display: flex; margin-bottom: 5px; font-size: 15px;">
				<view style="margin-left: 10px;">
					<text style="color: #333;">快递手机尾号</text>
				</view>
				<view style="text-align: end;margin-left: auto; margin-right: 10px;">
					<text style="color: #999;">{{datafile[0].datafile.tailnumber}}</text>
				</view>
			</view>

			<view v-if="datafile[0].datafile.expcode"
				style="width: 100%; display: flex; margin-bottom: 5px; font-size: 15px;">
				<view style="margin-left: 10px;">
					<text style="color: #333;">取件码</text>
				</view>
				<view style="text-align: end;margin-left: auto; margin-right: 10px;">
					<text style="color: #999;">{{datafile[0].datafile.expcode}}</text>
				</view>
			</view>

			<view style="width: 100%; display: flex; margin-bottom: 5px; font-size: 15px;">
				<view style="margin-left: 10px;">
					<text style="color: #333;">总计</text>
				</view>
				<view style="text-align: end;margin-left: auto; margin-right: 10px;">
					<text style="color: #e98f36;">¥{{datafile[0].datafile.price}}</text>
				</view>
			</view>

			<view class="line"></view>
			<uni-section title="订单信息" titleFontSize="18px"></uni-section>

			<view style="width: 100%; display: flex; margin-bottom: 5px; font-size: 15px;">
				<view style="margin-left: 10px;">
					<text style="color: #333;">下单时间</text>
				</view>
				<view style="text-align: end;margin-left: auto; margin-right: 10px;">
					<text style="color: #999;">{{ timeFormat(datafile[0].creation_time,'yyyy-MM-dd hh:mm:ss') }}</text>
				</view>
			</view>

			<view v-if="datafile[0].receivetime"
				style="width: 100%; display: flex; margin-bottom: 5px; font-size: 15px;">
				<view style="margin-left: 10px;">
					<text style="color: #333;">接单时间</text>
				</view>
				<view style="text-align: end;margin-left: auto; margin-right: 10px;">
					<text style="color: #999;">{{ timeFormat(datafile[0].receivetime,'yyyy-MM-dd hh:mm:ss') }}</text>
				</view>
			</view>

			<view v-if="datafile[0].claimtime" style="width: 100%; display: flex; margin-bottom: 5px; font-size: 15px;">
				<view style="margin-left: 10px;">
					<text style="color: #333;">取件时间</text>
				</view>
				<view style="text-align: end;margin-left: auto; margin-right: 10px;">
					<text style="color: #999;">{{ timeFormat(datafile[0].claimtime,'yyyy-MM-dd hh:mm:ss') }}</text>
				</view>
			</view>

			<view v-if="datafile[0].finishtime"
				style="width: 100%; display: flex; margin-bottom: 5px; font-size: 15px;">
				<view style="margin-left: 10px;">
					<text style="color: #333;">送达时间</text>
				</view>
				<view style="text-align: end;margin-left: auto; margin-right: 10px;">
					<text style="color: #999;">{{ timeFormat(datafile[0].finishtime,'yyyy-MM-dd hh:mm:ss') }}</text>
				</view>
			</view>

			<view style="width: 100%; display: flex; margin-bottom: 5px; font-size: 15px;">
				<view style="margin-left: 10px;">
					<text style="color: #333;">订单编号</text>
				</view>
				<view style="text-align: end;margin-left: auto; margin-right: 10px; display: flex;">
					<view
						style="width: 220px; margin-right: 5px;white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
						<text style="color: #999;">{{datafile[0].datafile.ordernum}}</text>
					</view>
					<view style="margin-top: -3px;">
						<button type="default" @click="copyText(datafile[0].datafile.ordernum)" size="mini">复制</button>
					</view>
				</view>
			</view>

			<view style="padding: 10px;" v-if="datafile[0].state == '2'">
				<button type="primary" @click="refundmsg">
					发起退款
				</button>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		refund,
		selectorder,
		updataorder
	} from '../../api/refund.js'
	import {
		getorderbyid
	} from '../../api/order.js'
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		ref
	} from 'vue'
	import jsSdk from "../../uni_modules/uni-pay/js_sdk/js_sdk.js"
	import BigNumber from '../../node_modules/bignumber.js/bignumber.js'

	const datafile = ref([])
	const id = ref('')

	const timeFormat = jsSdk.timeFormat

	const getfile = (id) => {
		uni.showLoading({
			mask: true,
			title: '加载中'
		});
		getorderbyid(id)
			.then((res) => {
				datafile.value.push(res.data)
				console.log(datafile)
				uni.hideLoading();
			})
			.catch((err) => {
				uni.hideLoading();
			})
	}

	//发起退款
	const refundmsg = () => {
		uni.showLoading({
			mask: true,
			title: '加载中'
		});
		var a = new BigNumber(datafile.value[0].datafile.price);
		var b = new BigNumber(100);
		var pricenum = a.times(b);
		var randomString = generateRandomString(24);
		// refund(datafile.value[0].datafile.ordernum, randomString, pricenum)
		// 	.then((res) => {
		// 		console.log(res)
		// 		if (res.resultCode === "SUCCESS") {
		// 			uni.showToast({
		// 				title: '退款成功',
		// 				icon: 'success'
		// 			});
		// 			setTimeout(() => {
		// 				updata()
		// 			}, 1000)
		// 		} else {
		// 			uni.showToast({
		// 				title: '退款失败',
		// 				icon: 'success'
		// 			});
		// 		}
		// 		uni.hideLoading();
		// 	})
		// 	.catch((err) => {
		// 		uni.showToast({
		// 			title: '退款失败',
		// 			icon: 'success'
		// 		});
		// 		uni.hideLoading();
		// 	})
		updata()
	}

	//订单状态修改
	const updata = () => {
		updataorder(id.value)
			.then((res) => {
				console.log(res)
				datafile.value = []
				getfile(id.value)
				uni.hideLoading();
			})
			.catch((err) => {
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

	//跳转本地电话
	const call = (number) => {
		uni.showModal({
			title: '拨号确认',
			content: '确定要拨打电话吗？',
			success: (res) => {
				if (res.confirm) {
					uni.makePhoneCall({
						phoneNumber: number
					})
				}
			},
		})
	}

	//复制
	const copyText = (text) => {
		uni.setClipboardData({
			data: text,
			success() {
				uni.showToast({
					title: '复制成功',
					icon: 'success'
				});
			},
			fail() {
				uni.showToast({
					title: '复制失败',
					icon: 'none'
				});
			}
		});
	}

	onLoad((option) => {
		console.log(option)
		id.value = option.id
		getfile(option.id)
	})
</script>

<style>
	.frome {
		width: 100%;
		height: 45px;
		font-size: 23px;
		font-weight: bold;
		border-bottom: 1px solid #999;
	}

	.line {
		width: 100%;
		height: 1px;
		background-color: #999;
	}
</style>