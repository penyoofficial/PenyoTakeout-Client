//物件大小
<template>
	<view>
		<view class="farme">
			<uni-section title="物件信息" titleFontSize="16px" type="line"></uni-section>
			<view class="example-body">
				<radio-group class="uni-list" @change="styleChange">
					<view v-for="(item, index) in msglist" :key="index" class="uni-list-item">
						<view class="uni-list-item__container">
							<view class="uni-list-item__content">
								<text class="uni-list-item__content-title">{{item.content}}</text>
								<text class="uni-list-item__content-title"
									style="color: #fc0606;">（{{item.price}}元）</text>
							</view>
							<view class="uni-list-item__extra">
								<radio :value="index" />
							</view>
						</view>
					</view>
				</radio-group>
			</view>
		</view>

		<view class="buttom-box"
			style="position: fixed; bottom: 0; width: 100%; height: 100px;background-color: #ffffff;">
			<button type="default" @click="confirm" size="default"
				style="margin: 0 auto; margin-top: 15px; width: 50%; border-radius: 20px;">
				<text class="word-btn-white" style="color: grey;">选好了</text>
			</button>
		</view>
	</view>
</template>

<script setup>
	import {
		getexpressage
	} from '../../../api/merchant.js'

	import {
		ref,
		onMounted,
	} from 'vue'

	const msglist = ref([])
	const index = ref([])

	const confirm = () => {
		let pages = getCurrentPages()
		let prevPage = pages[pages.length - 2]
		prevPage.onLoad(msglist.value[index.value])
		uni.navigateBack({
			delta: 1
		})
	}


	const styleChange = (e) => {
		console.log(e)
		index.value = e.detail.value
	}

	const getmsg = () => {
		uni.showLoading({
			mask: true,
			title: '加载中'
		});
		getexpressage()
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

<style lang="scss">
	page {
		background-color: #f8f8f8;
	}

	.farme {
		margin: 0 auto;
		margin-bottom: 10px;
		width: 95%;
		background-color: #ffffff;
		border-radius: 5px;
		padding-bottom: 25px;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		padding: 0;
	}

	.uni-common-mt {
		margin-top: 30px;
	}

	.uni-padding-wrap {
		// width: 750rpx;
		padding: 0px 30px;
	}

	.content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
		height: 150px;
		text-align: center;
	}

	.content-text {
		font-size: 14px;
		color: #666;
	}

	.color-tag {
		width: 25px;
		height: 25px;
	}

	.uni-list {
		flex: 1;
	}

	.uni-list-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		flex-direction: row;
		background-color: #FFFFFF;
	}


	.uni-list-item__container {
		padding: 12px 15px;
		width: 100%;
		flex: 1;
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom-style: solid;
		border-bottom-width: 1px;
		border-bottom-color: #eee;
	}

	.uni-list-item__content-title {
		font-size: 14px;
	}
</style>