//关于我们
<template>
	<view>
		<view class="example-body" style="padding: 0px 10px 10px 10px;">
			<view v-for="(item, index) in msglist" :key="index">
				<view class="uni-box">
					<uni-title class="h3" type="h3" :title="item.headline"></uni-title>
				</view>
				<view>
					<text class="uni-text">{{item.content}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		getabout
	} from '../../../api/merchant.js'

	import {
		onMounted,
		ref
	} from 'vue'

	const msglist = ref([])

	const getmsg = () => {
		uni.showLoading({
			mask: true,
			title: '加载中'
		});
		getabout()
			.then((res) => {
				console.log(res)
				msglist.value = res.data
				uni.hideLoading();
			})
			.catch((err) => {
				console.log(err)
				uni.hideLoading();
			})
	}

	onMounted(() => {
		getmsg()
	});
</script>

<style>
	page {
		background-color: #f8f8f8;
	}
</style>