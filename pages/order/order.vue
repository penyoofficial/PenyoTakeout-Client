//订单管理
<template>
	<view>
		<view class="box-bg">
			<uni-nav-bar shadow left-icon="home" leftText="返回" title="订单管理" @clickLeft="quit" statusBar="true" dark
				fixed="true" />
		</view>

		<view style="width: 100%; position: fixed; background-color: #ffffff; z-index: 999;">
			<view class="uni-padding-wrap uni-common-mt">
				<uni-segmented-control :current="current" :values="items" style-type="text" active-color="#000000"
					@clickItem="onClickItem" />
			</view>
		</view>

		<view>
			<view style="height: 45px;"></view>
			<view class="content" v-for="(item, index) in datafile" :key="index">
				<view class="coard" @click="gotopage(item._id)">
					<view style="display: flex; padding: 10px 10px 0px 10px;">
						<view>
							<uni-tag v-if="item.designation === '快递代取'" :text="item.designation" type="primary" />
							<uni-tag v-if="item.designation === '垃圾处理'" :text="item.designation" type="warning" />
							<uni-tag v-if="item.designation === '打赏'" :text="item.designation" type="success" />
						</view>
						<view style="margin-left: auto;">
							<text style="color: #37dd42; font-weight: 500;">{{item.datafile.price}}元</text>
						</view>
					</view>
					<uni-section :title=" `取： ${item.pickupaddress.address}` " titleFontSize="16px" subTitleColor="#333"
						type="circle" v-if="item.pickupaddress.address">
						<template v-slot:right>
							<image src="../../../static/img/jiantou.png" style="width: 15px; height: 15px;"></image>
						</template>
					</uni-section>
					<uni-section :title=" `送： ${item.closedaddress.address}` " titleFontSize="16px" subTitleColor="#333"
						type="circle" v-if="item.closedaddress.address">
						<template v-slot:right>
							<image src="../../../static/img/jiantou.png" style="width: 15px; height: 15px;"></image>
						</template>
					</uni-section>
					<view style="padding: 0px 10px 10px 10px;">
						<view class="text-box" style="font-size: 14px; color: #999;">
							<text>订单编号：{{item.datafile.ordernum}}</text>
						</view>
						<view class="text-box" style="font-size: 14px; color: #999;">
							<text>下单时间：{{ timeFormat(item.creation_time,'yyyy-MM-dd hh:mm:ss') }}</text>
						</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="status" @clickLoadMore="loadmore" :content-text="contentText" />
		</view>
	</view>
</template>

<script setup>
	import {
		getallorder,
		getorderbystate
	} from '../../api/order.js'
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		getuser
	} from '../../api/login.js'
	import jsSdk from "../../uni_modules/uni-pay/js_sdk/js_sdk.js"
	import {
		ref,
		onMounted
	} from 'vue'

	const items = ref(['全部', '待接单', '待收货', '已完成', '已取消', '退款/售后']);
	const current = ref(0);
	const sc = ref('');
	const openid = ref('');
	const datafile = ref([]);

	const contentText = ref({
		contentdown: '查看更多',
		contentrefresh: '加载中',
		contentnomore: '没有更多了'
	});
	const status = ref('');

	const page = ref(1);
	const pageSize = ref(5);

	const timeFormat = jsSdk.timeFormat

	const gotopage = (id) => {
		uni.navigateTo({
			url: '/pages/order-details/order-details?id=' + id
		})
	}

	//顶部导航点击事件
	const onClickItem = (e) => {
		page.value = 1
		datafile.value = []
		current.value = e.currentIndex
		console.log(current)
		if (current.value == 0) {
			allorder()
		} else if (current.value == 1) {
			orderbystate('2')
		} else if (current.value == 2) {
			orderbystate('3')
		} else if (current.value == 3) {
			orderbystate('4')
		} else if (current.value == 4) {
			orderbystate('1')
		} else if (current.value == 5) {
			orderbystate('5')
		}
	}

	//退出
	const quit = () => {
		if (sc.value === '10') {
			uni.navigateBack()
		} else {
			uni.reLaunch({
				url: '../mine/mine'
			})
		}
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
				if (current.value == 0) {
					allorder()
				} else if (current.value == 1) {
					orderbystate('2')
				} else if (current.value == 2) {
					orderbystate('3')
				} else if (current.value == 3) {
					orderbystate('4')
				} else if (current.value == 4) {
					orderbystate('1')
				} else if (current.value == 5) {
					orderbystate('5')
				}
			})
			.catch((err) => {
				console.log(err)
				uni.clearStorage()
				uni.showToast({
					icon: 'error',
					title: '请登录小程序！'
				})
				setTimeout(() => {
					uni.navigateBack()
				}, 1000)
				uni.hideLoading();
			})
	}

	//获取订单
	const allorder = () => {
		uni.showLoading({
			mask: true,
			title: '加载中'
		});
		getallorder(openid.value, page.value, pageSize.value)
			.then((res) => {
				datafile.value.push(...res.data);
				console.log(datafile)
				if (res.data.length < pageSize.value) {
					status.value = 'no-more'
				} else {
					status.value = 'more'
				}
				uni.hideLoading();
			})
			.catch((err) => {
				uni.hideLoading();
			})
	}

	//获取订单
	const orderbystate = (num) => {
		uni.showLoading({
			mask: true,
			title: '加载中'
		});
		getorderbystate(openid.value, num, page.value, pageSize.value)
			.then((res) => {
				datafile.value.push(...res.data);
				console.log(datafile)
				if (res.data.length < pageSize.value) {
					status.value = 'no-more'
				} else {
					status.value = 'more'
				}
				uni.hideLoading();
			})
			.catch((err) => {
				uni.hideLoading();
			})
	}

	//触发更多
	const loadmore = () => {
		status.value = 'loading'
		page.value = page.value + 1
		if (current.value == 0) {
			allorder()
		} else if (current.value == 1) {
			orderbystate('2')
		} else if (current.value == 2) {
			orderbystate('3')
		} else if (current.value == 3) {
			orderbystate('4')
		} else if (current.value == 4) {
			orderbystate('1')
		} else if (current.value == 5) {
			orderbystate('5')
		}
	}

	onLoad((option) => {
		usermsg()
		console.log(option)
		current.value = parseInt(option.num)
		sc.value = option.sc
	})
</script>

<style lang="scss">
	page {
		background: #F8F8F8;
	}

	.coard {
		margin: 0 auto;
		margin-bottom: 10px;
		width: 95%;
		border-radius: 10px;
		background-color: #ffffff;
		z-index: 1;
	}
</style>