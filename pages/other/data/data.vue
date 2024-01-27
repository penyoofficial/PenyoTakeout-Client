//我的资料
<template>
	<view>
		<view class="example" style="padding: 0rpx 20rpx 0rpx 20rpx;" v-if="usermsglist">

			<view class="top-box" style="height: 90px;">
				<view class="text">
					头像
				</view>
				<view class="right-text">
					<image style="width: 60px; height: 60px; border-radius: 50%;" :src="usermsglist.head">
					</image>
				</view>
				<view class="compile" @click="chooseimg">
					<image style="width: 25px;height: 25px;margin-left: 10px;" src="../../../static/img/pen.png">
					</image>
				</view>
			</view>

			<view class="top-box" style="height: 60px;">
				<view class="text">
					昵称
				</view>
				<view class="right-text">
					{{usermsglist.name}}
				</view>
				<view class="compile" @click="inputDialogToggle">
					<image style="width: 25px;height: 25px;margin-left: 10px;" src="../../../static/img/pen.png">
					</image>
				</view>
			</view>

			<view class="top-box" style="height: 60px;">
				<view class="text">
					性别
				</view>
				<view class="right-text">
					{{usermsglist.gender}}
				</view>
				<view class="compile">
					<picker @change="bindPickerChange" :value="index" :range="array">
						<image style="width: 25px;height: 25px;margin-left: 10px;" src="../../../static/img/pen.png">
						</image>
					</picker>
				</view>
			</view>

			<view class="top-box" style="height: 60px;">
				<view class="text">
					手机
				</view>
				<view class="right-text">
					{{phone}}
				</view>
				<view class="compile" @click="inputDialogTogglephone">
					<image style="width: 25px;height: 25px;margin-left: 10px;" src="../../../static/img/pen.png">
					</image>
				</view>
			</view>
		</view>

		<view>
			<uni-popup ref="inputDialog" type="dialog">
				<uni-popup-dialog ref="inputClose" mode="input" title="输入昵称" :value="usermsglist.name"
					placeholder="请输入昵称" @confirm="dialogInputConfirm"></uni-popup-dialog>
			</uni-popup>
		</view>

		<view>
			<uni-popup ref="inputDialogphone" type="dialog">
				<uni-popup-dialog ref="inputClose" mode="input" title="输入电话号码" placeholder="请输入电话号码"
					@confirm="dialogInputConfirmphone"></uni-popup-dialog>
			</uni-popup>
		</view>

		<!-- 提交按钮 -->
		<button @click="setrunning" class="button">保存并使用</button>
	</view>
</template>

<script setup>
	import {
		upadterunning
	} from '../../../api/running.js'
	import {
		getuser,
		upadteuser
	} from '../../../api/login.js'

	import {
		onMounted,
		ref,
		getCurrentInstance
	} from 'vue'

	const array = ref(['男', '女'])
	const usermsglist = ref([]);
	const phone = ref('');
	const id = ref('');
	const index = ref(0)

	const instance = getCurrentInstance()

	//性别选择器
	const bindPickerChange = (e) => {
		console.log(e)
		usermsglist.value.gender = array.value[e.detail.value]
	}

	//打开弹出层
	const inputDialogToggle = () => {
		instance.refs.inputDialog.open()
	}
	const inputDialogTogglephone = () => {
		instance.refs.inputDialogphone.open()
	}

	//弹出层函数
	const dialogInputConfirm = (e) => {
		if (e) {
			usermsglist.value.name = e
		} else {
			uni.showToast({
				icon: 'error',
				title: '昵称不能为空'
			})
		}
	}
	const dialogInputConfirmphone = (e) => {
		if (!e) {
			uni.showToast({
				title: '手机号码不能为空！',
				icon: 'error'
			})
			return
		}
		if (!/^1[3-9]\d{9}$/.test(e)) {
			uni.showToast({
				title: '手机号格式不正确！',
				icon: 'none'
			})
			return
		}
		usermsglist.value.phone = e
		updataphone(e)
	}

	//选择头像
	const chooseimg = () => {
		uni.chooseImage({
			count: 1, // 最多可选择的图片数量
			sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			success: (res) => {
				console.log(res)
				putcloud(res.tempFilePaths[0])
			}
		})
	}

	//图片上传云函数
	const putcloud = (file) => {
		uni.showLoading({
			mask: true,
			title: '加载中'
		});
		const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		let result = '';

		for (let i = 0; i < 20; i++) {
			const randomIndex = Math.floor(Math.random() * letters.length);
			result += letters.charAt(randomIndex);
		}

		const name = result + '.jpg'
		console.log(name)

		uniCloud.uploadFile({
			url: 'https://file-uninlzguzw-mp-33420585-9183-4b24-8565-0e60180fbb5d.oss-cn-zhangjiakou.aliyuncs.com',
			filePath: file,
			cloudPath: name,
			onUploadProgress: function(progressEvent) {
				console.log(progressEvent);
				var percentCompleted = Math.round(
					(progressEvent.loaded * 100) / progressEvent.total
				);
				console.log(percentCompleted)
			}
		}).then(res => {
			console.log(res)
			usermsglist.value.head = res.fileID
			uni.hideLoading();
		}).catch((err) => {
			console.log(err)
			uni.showToast({
				icon: 'error',
				title: '上传失败'
			})
		})
	}

	const setrunning = () => {
		uni.showLoading({
			mask: true,
			title: '加载中'
		});
		upadterunning(id.value, usermsglist.value.name, usermsglist.value.gender, usermsglist.value.head, usermsglist
				.value
				.phone)
			.then((res) => {
				console.log(res)
				setuser()
			})
			.catch((err) => {
				console.log(err)
				uni.showToast({
					icon: 'error',
					title: '上传失败'
				})
			})
	}

	//修改用户信息
	const setuser = () => {
		upadteuser(id.value, usermsglist.value.name, usermsglist.value.gender, usermsglist.value.head, usermsglist
				.value
				.phone)
			.then((res) => {
				console.log(res)
				uni.showToast({
					icon: 'success',
					title: '修改成功'
				})
				setTimeout(() => {
					uni.reLaunch({
						url: '../../mine/mine'
					})
				}, 500)
			})
			.catch((err) => {
				console.log(err)
				uni.showToast({
					icon: 'error',
					title: '上传失败'
				})
			})
	}

	//获取用户信息
	const usermsg = () => {
		uni.showLoading({
			mask: true,
			title: '加载中'
		});
		getuser()
			.then((res) => {
				console.log(res)
				usermsglist.value = res.data
				id.value = res.data._id
				updataphone(res.data.phone)
			})
			.catch((err) => {
				console.log(err)
				uni.hideLoading();
			})
	}

	//手机号处理
	const updataphone = (num) => {
		phone.value = num.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
		uni.hideLoading();
	}

	onMounted(() => {
		usermsg()
	});
</script>

<style>
	page {
		background-color: #F8F8F8;
	}

	.top-box {
		width: 100%;
		display: flex;
		justify-content: space-between;
		border-bottom: 1rpx solid #ddd;
	}

	.text {
		display: flex;
		justify-content: center;
		flex-direction: column;
	}

	.right-text {
		text-align: end;
		margin-left: auto;
		font-size: 15px;
		color: #515151;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}

	.compile {
		display: flex;
		justify-content: center;
		flex-direction: column;
	}

	.button {
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		margin: 50px 20rpx;
		color: #fff;
		border-radius: 80rpx;
		font-size: 30rpx;
		background-color: #27ba9b;
	}
</style>