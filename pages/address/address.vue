//地址管理
<template>
	<view class="viewport">
		<!-- 地址列表 -->
		<scroll-view class="scroll-view" scroll-y>
			<view v-for="(item, index) in addresslist" :key="index">
				<view class="address" @click="selectadress(item)">
					<uni-swipe-action>
						<!-- //right-options 右滑出现的内容。left-options：左滑出现的内容 -->
						<uni-swipe-action-item :right-options="options" @click="onClick(item._id)">
							<view class="item">
								<view class="item-content">
									<view class="user">
										{{item.name}}
										<text class="contact">{{item.phone}}</text>
									</view>
									<view class="locate">{{item.address}}</view>
									<view class="edit" hover-class="none" @click="gotoexit(item._id)">
										修改
									</view>
								</view>
							</view>
						</uni-swipe-action-item>
					</uni-swipe-action>
				</view>
			</view>
			<view v-if="addresslist.length == 0" class="blank">暂无收货地址</view>
		</scroll-view>
		<!-- 添加按钮 -->
		<view class="add-btn">
			<navigator hover-class="none" url="../address/add/add">
				新建地址
			</navigator>
		</view>
	</view>
</template>

<script setup>
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app"
	import {
		getaddress,
		deleteaddress
	} from '../../api/address.js'

	import {
		ref
	} from 'vue'

	const num = ref('');
	const addresslist = ref([]);
	const options = ref([{
		text: '删除',
		style: {
			backgroundColor: '#dd524d'
		}
	}]);

	const gotoexit = (id) => {
		uni.navigateTo({
			url: '../address/exit/exit?_id=' + id
		})
	}

	//选择地址
	const selectadress = (item) => {
		if (num.value === '1') {
			let pages = getCurrentPages()
			let prevPage = pages[pages.length - 2]
			prevPage.onLoad(item)
			uni.navigateBack({
				delta: 1
			})
		} else if (num.value === '2') {
			let pages = getCurrentPages()
			let prevPage = pages[pages.length - 2]
			prevPage.onLoad(item)
			uni.navigateBack({
				delta: 1
			})
		}
	}
	//删除地址
	const onClick = (_id) => {
		uni.showLoading({
			mask: true,
			title: '加载中'
		});
		deleteaddress(_id)
			.then((res) => {
				console.log(res)
				uni.hideLoading();
				addressget()
			})
			.catch((err) => {
				console.log(err)
				uni.showToast({
					icon: 'error',
					title: '删除失败'
				})
			})
	}

	const checkout = () => {
		let verify = uni.getStorageSync('token')
		if (!verify) {
			uni.showToast({
				icon: 'error',
				title: '请登录小程序！'
			})
			setTimeout(() => {
				uni.reLaunch({
					url: '../mine/mine'
				})
			}, 1000)
		} else {
			addressget()
		}
	}

	//address获取
	const addressget = () => {
		uni.showLoading({
			mask: true,
			title: '加载中'
		});
		getaddress()
			.then((res) => {
				console.log(res)
				addresslist.value = res.data
				uni.hideLoading();
			})
			.catch((err) => {
				console.log(err)
				uni.showToast({
					icon: 'error',
					title: '查询失败'
				})
			})
	}

	onShow(() => {
		checkout()
	});

	onLoad((option) => {
		console.log(option)
		num.value = option.num
	});
</script>

<style lang="scss">
	page {
		background-color: #F8F8F8;
	}

	/* 删除按钮 */
	.delete-button {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 50px;
		height: 100%;
		font-size: 28rpx;
		color: #fff;
		border-radius: 0;
		padding: 0;
		background-color: #cf4444;
	}

	.viewport {
		display: flex;
		flex-direction: column;
		height: 100%;
		background-color: #F8F8F8;

		.scroll-view {
			padding-top: 20rpx;
		}
	}

	.address {
		padding: 0 20rpx;
		margin: 0 20rpx;
		margin-bottom: 10px;
		border-radius: 5px;
		background-color: #fff;

		.item-content {
			line-height: 1;
			padding: 40rpx 10rpx 38rpx;
			position: relative;

			.edit {
				position: absolute;
				top: 35px;
				right: 30rpx;
				padding: 2rpx 0 2rpx 20rpx;
				border-left: 1rpx solid #666;
				font-size: 15px;
				color: #666;
				line-height: 1;
			}
		}

		.item:last-child .item-content {
			border: none;
		}

		.user {
			font-size: 17px;
			margin-bottom: 20rpx;
			color: #333;

			.contact {
				margin-left: 10px;
				color: #666;
			}

			.badge {
				display: inline-block;
				padding: 4rpx 10rpx 2rpx 14rpx;
				margin: 2rpx 0 0 10rpx;
				font-size: 26rpx;
				color: #27ba9b;
				border-radius: 6rpx;
				border: 1rpx solid #27ba9b;
			}
		}

		.locate {
			line-height: 1.6;
			font-size: 15px;
			color: #333;
		}
	}

	.blank {
		margin-top: 300rpx;
		text-align: center;
		font-size: 32rpx;
		color: #888;
	}

	.add-btn {
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		margin: 30rpx 20rpx;
		color: #fff;
		border-radius: 80rpx;
		font-size: 30rpx;
		background-color: #27ba9b;
	}
</style>