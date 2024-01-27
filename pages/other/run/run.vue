//成为跑手
<template>
	<view>
		<view>
			<view class="farme">
				<uni-section title="身份信息" titleFontSize="16px" type="line" padding>
					<uni-data-select v-model="identity" :localdata="candidates"></uni-data-select>
				</uni-section>

				<uni-section title="上传学生证或身份证" titleFontSize="16px" type="line" padding>
					<view class="example-body">
						<uni-file-picker :sourceType="way" @success="addsuccess" @fail="addfail" @delete="deleteimg"
							limit="1" title="最多选择1张图片"></uni-file-picker>
					</view>
				</uni-section>
			</view>

			<!-- 提交按钮 -->
			<button @click="submit" class="button">提交申请</button>
		</view>

		<view>
			<!-- 提示窗示例 -->
			<uni-popup ref="alertDialog" type="dialog">
				<uni-popup-dialog type="success" cancelText="关闭" confirmText="同意" title="提示" content="您已经是骑手,进入系统吗？"
					@confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
			</uni-popup>
		</view>
	</view>
</template>

<script setup>
	import {
		onShow
	} from "@dcloudio/uni-app"
	import {
		addrunning,
		getrunning
	} from '../../../api/running.js'

	import {
		onMounted,
		getCurrentInstance,
		ref
	} from 'vue'

	const way = ref(['album', 'camera'])
	const identity = ref('')
	const identityimg = ref('')
	const verify = ref('')
	const candidates = ref([{
			value: 0,
			text: "在校学生"
		},
		{
			value: 1,
			text: "校外人员"
		},
	])
	const instance = getCurrentInstance()

	//提交申请
	const submit = () => {
		uni.showLoading({
			mask: true,
			title: '加载中'
		});
		if (verify.value === 0) {
			uni.showToast({
				icon: 'error',
				title: '请勿重复提交'
			})
			return
		}
		if (!identity.value == 0 && !identity.value == 1) {
			uni.showToast({
				icon: 'error',
				title: '请选择身份'
			})
			return
		}
		if (!identityimg.value) {
			uni.showToast({
				icon: 'error',
				title: '请上传证件'
			})
			return
		}
		addrunning(candidates.value[identity.value].text, identityimg.value)
			.then((res) => {
				console.log(res)
				verify.value = 0
				uni.showToast({
					icon: 'success',
					title: '提交成功'
				})
			})
			.catch((err) => {
				console.log(err)
				uni.showToast({
					icon: 'error',
					title: '提交失败'
				})
			})
	}

	//图片上传成功
	const addsuccess = (e) => {
		console.log(e)
		identityimg.value = e.tempFilePaths[0]
	}

	//图片上传失败
	const addfail = (e) => {
		console.log(e)
		uni.showToast({
			icon: 'error',
			title: '图片上传失败！'
		})
	}

	//删除图片
	const deleteimg = (e) => {
		console.log(e)
	}

	//弹窗
	const dialogToggle = () => {
		instance.refs.alertDialog.open()
	}

	//确定
	const dialogConfirm = () => {
		uni.navigateTo({
			url: '/classification/system/system'
		})
	}

	//取消
	const dialogClose = () => {
		uni.navigateBack()
	}

	const runningget = () => {
		uni.showLoading({
			mask: true,
			title: '加载中'
		});
		getrunning()
			.then((res) => {
				console.log(res)
				versiy(res.data)
			})
			.catch((err) => {
				console.log(err)
				uni.hideLoading()
			})
	}

	const versiy = (data) => {
		console.log(data)
		if (data.role === '0') {
			verify.value = 0
			uni.showToast({
				icon: 'error',
				title: '请勿重复提交'
			})
		} else if (data.role === '1') {
			dialogToggle()
		}
		uni.hideLoading()
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
					url: '../../mine/mine'
				})
			}, 1000)
		} else {
			runningget()
		}
	}

	onShow(() => {
		checkout()
	});
</script>

<style>
	page {
		background-color: #F8F8F8;
	}

	.farme {
		margin: 0 auto;
		margin-bottom: 10px;
		width: 95%;
		background-color: #ffffff;
		border-radius: 5px;
	}

	.button {
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