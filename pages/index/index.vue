//首页
<template>
	<view class="content">
		<HomePage></HomePage>

		<view class="headline" style="margin-top: 10px;margin-left: 15px;">
			<text style="font-weight: bold;">今日订单</text>
		</view>

		<view class="empty" v-if="datafile.length ==0">
			<uni-card>
				<view class="noorder">
					<image src="https://mp-33420585-9183-4b24-8565-0e60180fbb5d.cdn.bspapp.com/images/noorder.png">
					</image>
				</view>
				<view class="text" style="margin-top: -40px; height: 70px; text-align: center;">
					<text>今天还没有订单哟！</text>
					<text>快去下一单吧！</text>
				</view>
			</uni-card>
		</view>

		<view class="order" v-if="datafile.length !=0">
			<view v-for="(item, index) in datafile" :key="index">
				<uni-card @click="gotopage(item._id)" :title="item.designation" padding="0px">
					<uni-section :title=" `取： ${item.pickupaddress.address}` " titleFontSize="16px" subTitleColor="#333"
						type="circle">
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
				</uni-card>
			</view>
		</view>
		<uni-load-more :status="no-more" v-if="datafile.length !=0" />
	</view>
</template>

<script setup>
	import {
		getorderbydata
	} from '../../api/order.js'
	import HomePage from '../index/module/home-page.vue'
	import jsSdk from "../../uni_modules/uni-pay/js_sdk/js_sdk.js"
	import {
		defineComponent,
		onMounted,
		onActivated,
		onDeactivated,
		ref
	} from 'vue'

	const datafile = ref([]);

	const Home = defineComponent({
		components: {
			HomePage
		},
	})

	const timeFormat = jsSdk.timeFormat

	const gotopage = (id) => {
		uni.navigateTo({
			url: '/pages/order-details/order-details?id=' + id
		})
	}

	//获取今日订单
	const getdataorder = () => {
		uni.showLoading({
			mask: true,
			title: '加载中'
		});
		getorderbydata()
			.then((res) => {
				console.log(res)
				datafile.value = res.data.reverse()
				uni.hideLoading();
			})
			.catch((err) => {
				uni.clearStorage()
				uni.hideLoading();
			})
	}

	onMounted(() => {
		getdataorder()
	});
</script>

<style>
	page {
		background-color: #F8F8F8;
	}

	.module {
		margin-left: 2.5%;
		background-color: #FFFFFF;
		width: 46.25%;
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