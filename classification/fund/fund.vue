//资金明细
<template>
	<view>
		<view class="farme" v-for="(item, index) in datafile" :key="index">
			<uni-section v-if="item.price > 0" :subTitle="timeFormat(item.creation_time,'yyyy-MM-dd hh:mm:ss')"
				title="配送收入" titleFontSize="15px" subTitleFontSize="14px">
				<template v-slot:right>
					<view style="color: #333; font-size: 15px;">
						<text>+{{item.price}}元</text>
					</view>
					<view style="color: #999; font-size: 14px;">
						<text>已经账</text>
					</view>
				</template>
			</uni-section>

			<uni-section v-if="item.price < 0" :subTitle="timeFormat(item.creation_time,'yyyy-MM-dd hh:mm:ss')"
				title="提现" titleFontSize="15px" subTitleFontSize="14px">
				<template v-slot:right>
					<view style="color: #333; font-size: 15px;">
						<text>{{item.price}}元</text>
					</view>
					<view style="color: #999; font-size: 14px;">
						<text>已经账</text>
					</view>
				</template>
			</uni-section>
		</view>

		<uni-load-more :status="status" @clickLoadMore="loadmore" :content-text="contentText" />
	</view>
</template>

<script setup>
	import {
		getuser
	} from '../../api/login.js'
	import {
		getaccount
	} from '../../api/running.js'
	import {
		ref
	} from 'vue'
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import jsSdk from "../../uni_modules/uni-pay/js_sdk/js_sdk.js"

	const runningfile = ref({})

	const datafile = ref([])

	const page = ref(1);
	const pageSize = ref(5);

	const status = ref('');
	const contentText = ref({
		contentdown: '查看更多',
		contentrefresh: '加载中',
		contentnomore: '没有更多了'
	});

	const timeFormat = jsSdk.timeFormat

	//加载更多
	const loadmore = () => {
		status.value = 'loading'
		page.value = page.value + 1
		getmsg()
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
				getmsg()
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

	//资金数据
	const getmsg = () => {
		uni.showLoading({
			mask: true,
			title: '加载中'
		});
		getaccount(runningfile.value.openid, page.value, pageSize.value)
			.then((res) => {
				console.log(res)
				datafile.value = res.data
				if (res.data.length < pageSize.value) {
					status.value = 'no-more'
				} else {
					status.value = 'more'
				}
				uni.hideLoading();
			})
			.catch((err) => {
				console.log(err)
				uni.hideLoading();
			})
	}

	onLoad(() => {
		usermsg()
	})
</script>

<style>
	.farme {
		border-bottom: 1px solid #EEEEEE;
	}
</style>