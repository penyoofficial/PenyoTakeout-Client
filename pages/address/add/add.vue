//新建地址
<template>
	<view class="content">
		<view class="example"
			style="padding: 20rpx 20rpx 20rpx 20rpx; margin: 0 20rpx; border-radius: 15rpx; background-color: #fff;">
			<uni-forms ref="valiForm" :rules="rules" :modelValue="valiFormData">
				<uni-forms-item label="联系人 " required name="name">
					<uni-easyinput v-model="valiFormData.name" placeholder="请输入联系人" />
				</uni-forms-item>
				<uni-forms-item label="手机号" required name="phone">
					<uni-easyinput v-model="valiFormData.phone" placeholder="请输入手机号码" />
				</uni-forms-item>
				<uni-forms-item label="取件地" required name="address">
					<uni-easyinput v-model="valiFormData.address" type="textarea" placeholder="请输入详细的取件地址" />
				</uni-forms-item>
			</uni-forms>
		</view>

		<!-- 提交按钮 -->
		<button @click="submit('valiForm')" class="button">保存并使用</button>
	</view>
</template>

<script setup>
	import {
		addaddress
	} from '../../../api/address.js'

	import {
		ref,
		getCurrentInstance,
		onMounted
	} from 'vue'

	const instance = getCurrentInstance()

	const valiFormData = ref({});

	const rules = ref({
		name: {
			rules: [{
				required: true,
				errorMessage: '联系人不能为空'
			}]
		},
		phone: {
			rules: [{
				required: true,
				errorMessage: '手机号码不能为空'
			}, {
				pattern: /^1[2|3|4|5|6|7|8|9|]\d{9}$/,
				errorMessage: '请输入正确的电话号码',
			}]
		},
		address: {
			rules: [{
				required: true,
				errorMessage: '地址不能为空'
			}]
		}
	});

	const submit = (ref) => {
		uni.showLoading({
			mask: true,
			title: '加载中'
		});
		instance.refs[ref].validate().then(res => {
			console.log('success', res);
			putaddress(res)
		}).catch(err => {
			console.log('err', err)
			uni.showToast({
				icon: 'error',
				title: '请填写完整信息'
			})
		})
	}

	//上传
	const putaddress = (res) => {
		addaddress(res.name, res.phone, res.address)
			.then((res) => {
				console.log(res)
				uni.showToast({
					icon: 'success',
					title: '上传成功'
				})
				setTimeout(() => {
					uni.navigateBack()
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
</script>

<style>
	page {
		background-color: #F8F8F8;
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

	.form-item {
		display: flex;
		align-items: center;
	}

	.switch-container {
		text-align: end;
		margin-left: auto;
	}
</style>