//更多推荐
<template>
	<view class="center" style="height: 125px;">
		<view class="farme">
			<view class="center-box" style="width: 100%;padding-top: 10px;">
				<view class="top-box" style="width: 100%; display: flex;">
					<view class="text" style="font-weight: bold;font-size: 17px;">
						更多推荐
					</view>
				</view>
			</view>

			<view class="logo-bx" style="display: flex;width: 100%;">
				<view class="module-box" @click="gotopage('../other/run/run')">
					<image src="../../../static/mine_logo/qishou.png" style="width: 40px;height: 40px;"></image>
					<text style="font-size: 14px;font-weight: 500; margin-top: 5px;">成为跑手</text>
				</view>

				<view class="module-box" @click="gotopage('../other/client/client')">
					<image src="../../../static/mine_logo/wenti.png" style="width: 40px;height: 40px;"></image>
					<text style="font-size: 14px;font-weight: 500; margin-top: 5px;">问题反馈</text>
				</view>

				<view class="module-box" @click="gotopage('../other/about/about')">
					<image src="../../../static/mine_logo/about.png" style="width: 40px;height: 40px;"></image>
					<text style="font-size: 14px;font-weight: 500; margin-top: 5px;">关于我们</text>
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