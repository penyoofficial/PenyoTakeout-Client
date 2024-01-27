//我的订单模块
<template>
	<view class="center" style="height: 125px;">
		<view class="farme">
			<view class="center-box" style="width: 100%;padding-top: 10px;">
				<view class="top-box" style="width: 100%; display: flex; justify-content: space-between;">
					<view class="text" style="font-weight: bold;font-size: 17px;">
						我的订单
					</view>
					<view class="right-text" @click="gontoorder('../order/order?num=',0)"
						style="text-align: end;margin-left: auto;font-size: 15px;color: #515151;">
						所有订单
					</view>
					<view class="jiantou">
						<image style="width: 15px;height: 15px;" src="../../../static/img/jiantou.png"></image>
					</view>
				</view>
			</view>

			<view class="logo-bx" style="display: flex;width: 100%;">
				<view class="module-box" @click="gontoorder('../order/order?num=',1)">
					<image src="../../../static/mine_logo/fukuan.png" style="width: 40px;height: 40px;"></image>
					<text style="font-size: 14px;font-weight: 500; margin-top: 5px;">待接单</text>
				</view>
				<view class="module-box" @click="gontoorder('../order/order?num=',2)">
					<image src="../../../static/mine_logo/shouhuo.png" style="width: 40px;height: 40px;"></image>
					<text style="font-size: 14px;font-weight: 500; margin-top: 5px;">待收货</text>
				</view>
				<view class="module-box" @click="gontoorder('../order/order?num=',3)">
					<image src="../../../static/mine_logo/wancheng.png" style="width: 40px;height: 40px;"></image>
					<text style="font-size: 14px;font-weight: 500; margin-top: 5px;">已完成</text>
				</view>
				<view class="module-box" @click="gontoorder('../order/order?num=',4)">
					<image src="../../../static/mine_logo/quxiao.png" style="width: 40px;height: 40px;"></image>
					<text style="font-size: 14px;font-weight: 500; margin-top: 5px;">已取消</text>
				</view>
				<view class="module-box" @click="gontoorder('../order/order?num=',5)">
					<image src="../../../static/mine_logo/tuikuan.png" style="width: 40px;height: 40px;"></image>
					<text style="font-size: 14px;font-weight: 500; margin-top: 5px;">退款/售后</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	const gontoorder = (url, num) => {
		uni.navigateTo({
			url: url + num + '&sc=' + '10'
		})
	}
</script>

<style>
	.farme {
		margin: 0 auto;
		width: 95%;
		background-color: #ffffff;
		border-radius: 5px;
	}

	.module-box {
		margin-top: 15px;
		width: 24%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
</style>