//订单统计
<template>
	<view>
		<view>
			<view class="content" v-for="(item, index) in datafile" :key="index">
				<view class="coard" @click="gotodetail(item._id)">
					<view style="display: flex; padding: 10px 10px 0px 10px;">
						<view>
							<uni-tag v-if="item.designation === '快递代取'" :text="item.designation" type="primary" />
							<uni-tag v-if="item.designation === '垃圾处理'" :text="item.designation" type="warning" />
							<uni-tag v-if="item.designation === '打赏'" :text="item.designation" type="success" />
						</view>
						<view style="margin-left: auto;">
							<text style="color: #37dd42; font-weight: 500;">+{{item.datafile.price}}元</text>
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
		getorderbyrunstate
	} from '../../api/running.js'
	import {
		getuser
	} from '../../api/login.js'
	import {
		ref
	} from 'vue'
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import jsSdk from "../../uni_modules/uni-pay/js_sdk/js_sdk.js"

	const timeFormat = jsSdk.timeFormat

	const page = ref(1);
	const pageSize = ref(5);

	const runningfile = ref({})
	const datafile = ref([])

	const status = ref('');
	const contentText = ref({
		contentdown: '查看更多',
		contentrefresh: '加载中',
		contentnomore: '没有更多了'
	});
	
	//进入详情
	const gotodetail = (id) => {
		uni.navigateTo({
			url: '../order-details/order-details?id=' + id
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
				fetchMatch('3', '4')
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

	//加载更多
	const loadmore = () => {
		status.value = 'loading'
		page.value = page.value + 1
		fetchMatch('3', '4')
	}

	const fetchMatch = (num, state) => {
		uni.showLoading({
			mask: true,
			title: '加载中'
		});
		getorderbyrunstate(runningfile.value.openid, num, page.value, pageSize.value, state)
			.then((res) => {
				datafile.value.push(...res.data);
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

	onLoad(() => {
		usermsg()
	})
</script>

<style>
	page {
		background-color: #f8f8f8;
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