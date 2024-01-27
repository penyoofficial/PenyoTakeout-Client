//功能模块
<template>
	<view class="center" style="height: 125px;">
		<view class="farme">
			<view class="center-box" style="width: 100%;padding-top: 10px;">
				<view class="top-box" style="width: 100%; display: flex;">
					<view class="text" style="font-weight: bold;font-size: 17px;">
						功能模块
					</view>
				</view>
			</view>

			<view class="logo-bx" style="display: flex;width: 100%;">
				<view class="module-box" @click="gotopage('../address/address?num=','0')">
					<image src="../../../static/mine_logo/address.png" style="width: 40px;height: 40px;"></image>
					<text style="font-size: 14px;font-weight: 500; margin-top: 5px;">地址管理</text>
				</view>
				<view class="module-box" @click="gotopage('../other/data/data?num=','0')">
					<image src="../../../static/mine_logo/myziliao.png" style="width: 40px;height: 40px;"></image>
					<text style="font-size: 14px;font-weight: 500; margin-top: 5px;">我的资料</text>
				</view>
				<button open-type="contact" class="buttom-box">
					<view class="module-box" style="width: 100%;">
						<image src="../../../static/mine_logo/kefu.png" style="width: 40px;height: 40px;"></image>
						<text style="font-size: 14px;font-weight: 500;">我的客服</text>
					</view>
				</button>
			</view>
		</view>
	</view>
</template>

<script setup>
	const gotopage = (url, num) => {
		uni.navigateTo({
			url: url + num
		})
	}

	const openContact = () => {

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

	.buttom-box {
		background-color: #FFF;
		width: 20%;
		padding: 0;
		margin: 0;
		margin-top: 5px;
		margin-left: 2.5px;
	}

	.buttom-box::after {
		border: #FFF solid;
	}
</style>