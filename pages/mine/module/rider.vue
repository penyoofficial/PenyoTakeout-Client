//跑手终端
<template>
	<view class="center" style="height: 125px;">
		<view class="farme">
			<view class="center-box" style="width: 100%;padding-top: 10px;">
				<view class="top-box" style="width: 100%; display: flex;">
					<view class="text" style="font-weight: bold;font-size: 17px;">
						跑手终端
					</view>
				</view>
			</view>

			<view class="logo-bx" style="display: flex;width: 100%;">
				<view class="module-box" @click="gotopage('/classification/system/system')">
					<image src="../../../static/mine_logo/goxitonf.png" style="width: 40px;height: 40px;"></image>
					<text style="font-size: 14px;font-weight: 500; margin-top: 5px;">进入系统</text>
				</view>
				<view class="module-box" @click="gotopage('/classification/account/account')">
					<image src="../../../static/mine_logo/zhanghu.png" style="width: 40px;height: 40px;"></image>
					<text style="font-size: 14px;font-weight: 500; margin-top: 5px;">我的账户</text>
				</view>
				<view class="module-box" @click="gotopage('/classification/statistics/statistics')">
					<image src="../../../static/mine_logo/ordertongji.png" style="width: 40px;height: 40px;"></image>
					<text style="font-size: 14px;font-weight: 500; margin-top: 5px;">订单统计</text>
				</view>
				<view class="module-box" @click="gotopage('/classification/fund/fund')">
					<image src="../../../static/mine_logo/monnyr.png" style="width: 40px;height: 40px;"></image>
					<text style="font-size: 14px;font-weight: 500; margin-top: 5px;">资金明细</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	const gotopage = (url) => {
		uni.navigateTo({
			url: url
		})
	}
</script>

<style>
	.farme {
		margin: 0 auto;
		width: 95%;
		height: 200px;
		background-color: #ffffff;
		border-radius: 5px;
	}

	.module-box {
		margin-top: 15px;
		width: 20%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
</style>