<template>
	<view>
		<view class="box-bg">
			<uni-nav-bar @clickLeft="showDrawer('showLeft')" height="44px" statusBar="true" dark fixed="true"
				left-icon="bars" leftText="菜单" title="跑手系统" />
		</view>

		<view style="width: 100%; position: fixed; background-color: #ffffff; z-index: 999;">
			<view class="uni-padding-wrap uni-common-mt">
				<uni-segmented-control :current="current" :values="items" style-type="text" active-color="#000000"
					@clickItem="onClickItem" />
			</view>
		</view>

		<view>
			<view style="height: 45px;"></view>
			<view class="content" v-for="(item, index) in datafile" :key="index">
				<view class="coard">
					<view @click="gotodetail(item._id)">
						<view style="display: flex; padding: 10px 10px 0px 10px;">
							<view>
								<uni-tag v-if="item.designation === '快递代取'" :text="item.designation" type="primary" />
								<uni-tag v-if="item.designation === '垃圾处理'" :text="item.designation" type="warning" />
								<uni-tag v-if="item.designation === '打赏'" :text="item.designation" type="success" />
							</view>
							<view style="margin-left: auto;">
								<text style="color: #37dd42; font-weight: 500;">{{item.datafile.price}}元</text>
							</view>
						</view>
						<uni-section :title=" `取： ${item.pickupaddress.address}` " titleFontSize="16px"
							subTitleColor="#333" type="circle" v-if="item.pickupaddress.address">
							<template v-slot:right>
								<image src="../../../static/img/jiantou.png" style="width: 15px; height: 15px;"></image>
							</template>
						</uni-section>
						<uni-section :title=" `送： ${item.closedaddress.address}` " titleFontSize="16px"
							subTitleColor="#333" type="circle" v-if="item.closedaddress.address">
							<template v-slot:right>
								<image src="../../../static/img/jiantou.png" style="width: 15px; height: 15px;"></image>
							</template>
						</uni-section>
						<view style="padding: 0px 10px 10px 10px;">
							<view class="text-box" style="font-size: 14px; color: #999;">
								<text>订单编号：{{item.datafile.ordernum}}</text>
							</view>
							<view class="text-box" style="font-size: 14px; color: #999;">
								<text>下单时间：{{ timeFormat(item.creation_time,'yyyy-MM-dd hh:mm:ss') }}</text>
							</view>
						</view>
					</view>
					<view style="padding: 10px;">
						<button type="primary" v-if="current == 0" @click="robOrder(item._id)">立即抢单</button>
						<button type="default" v-if="current == 1" @click="claimGoods(item._id)">已经取货</button>
						<button type="warn" v-if="current == 2"
							@click="finish(item._id,item.datafile.price)">配送完成</button>
					</view>
				</view>
			</view>
			<uni-load-more :status="status" @clickLoadMore="loadmore" :content-text="contentText" />
			<view v-if="current == 0" style="width: 100%; height: 100px;"></view>
		</view>

		<view class="buttom-box" v-if="current == 0"
			style="position: fixed; bottom: 0; width: 100%; height: 100px;background-color: #ffffff;">
			<button type="default" size="default" @click="refresh"
				style="margin: 0 auto; margin-top: 15px; width: 95%;">
				<text class="word-btn-white" style="color: grey;">刷新列表</text>
			</button>
		</view>

		<view class="example-body">
			<uni-drawer ref="showLeft" mode="left" :width="250" @change="change($event,'showLeft')">
				<view class="frame" style="display: flex; margin-top: 50px;">
					<view class="center-box">
						<uni-section titleFontSize="17px" type="line" title="我的账户"></uni-section>
						<text style="padding-bottom: 10px; font-weight: 500;">{{singl.price}}元</text>
						<text style="font-size: 14px; color: #999;">今日预计收入</text>
					</view>

					<view class="center-box">
						<uni-section titleFontSize="17px" type="line" title="订单统计"></uni-section>
						<text style="padding-bottom: 10px; font-weight: 500;">{{singl.single}}单</text>
						<text style="font-size: 14px; color: #999;">今日已完成单</text>
					</view>
				</view>

				<uni-section titleFontSize="17px" title="常用功能"></uni-section>
				<view class="tool-box" style="display: flex;">
					<view class="tabulation" @click="gotopage('/classification/account/account')">
						<image src="../../../static/mine_logo/zhanghu.png" style="width: 40px;height: 40px;"></image>
						<text style="font-size: 14px;font-weight: 500; margin-top: 5px;">我的账户</text>
					</view>
					<view class="tabulation" @click="gotopage('/classification/statistics/statistics')">
						<image src="../../../static/mine_logo/ordertongji.png" style="width: 40px;height: 40px;">
						</image>
						<text style="font-size: 14px;font-weight: 500; margin-top: 5px;">订单统计</text>
					</view>
					<view class="tabulation" @click="gotopage('/classification/fund/fund')">
						<image src="../../../static/mine_logo/monnyr.png" style="width: 40px;height: 40px;"></image>
						<text style="font-size: 14px;font-weight: 500; margin-top: 5px;">资金明细</text>
					</view>
				</view>

				<view class="close" style="position: fixed; bottom: 30px;">
					<button @click="quit" type="default" size="mini" style="width: 200px; margin-left: 15px;">
						<text class="word-btn-white" style="font-size: 16px; color: grey;">退出系统</text>
					</button>
				</view>
			</uni-drawer>
		</view>
	</view>
</template>

<script setup>
	import {
		getorderbyrun,
		roborder,
		getorderbyrunstate,
		updataclaimorder,
		finishorder,
		getsingledose
	} from '../../api/running.js'
	import {
		getuser
	} from '../../api/login.js'
	import {
		getCurrentInstance,
		ref
	} from 'vue'
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import jsSdk from "../../uni_modules/uni-pay/js_sdk/js_sdk.js"

	const datafile = ref([])

	const items = ref(['新订单', '待取货', '配送中', '已完成']);
	const current = ref(0);

	const status = ref('');
	const contentText = ref({
		contentdown: '查看更多',
		contentrefresh: '加载中',
		contentnomore: '没有更多了'
	});

	const page = ref(1);
	const pageSize = ref(5);

	const instance = getCurrentInstance()
	const timeFormat = jsSdk.timeFormat

	const runningfile = ref({})

	const singl = ref({});

	//抢单
	const robOrder = (id) => {
		uni.showLoading({
			mask: true,
			title: '加载中'
		});
		roborder(id, runningfile.value)
			.then((res) => {
				console.log(res)
				datafile.value = []
				getmsg()
				uni.hideLoading();
			})
			.catch((err) => {
				uni.hideLoading();
			})
	}

	//已经取货
	const claimGoods = (id) => {
		uni.showLoading({
			mask: true,
			title: '加载中'
		});
		updataclaimorder(id)
			.then((res) => {
				console.log(res)
				datafile.value = []
				fetchMatch('1', '3')
				uni.hideLoading();
			})
			.catch((err) => {
				uni.hideLoading();
			})
	}

	//代取货待配送
	const fetchMatch = (num, state) => {
		uni.showLoading({
			mask: true,
			title: '加载中'
		});
		getorderbyrunstate(runningfile.value.openid, num, page.value, pageSize.value, state)
			.then((res) => {
				datafile.value.push(...res.data);
				if (res.data.length < pageSize.value) {
					status.value = 'no-more'
				} else {
					status.value = 'more'
				}
				uni.hideLoading();
			})
			.catch((err) => {
				uni.hideLoading();
			})
	}

	//完成配送
	const finish = (id, price) => {
		uni.showLoading({
			mask: true,
			title: '加载中'
		});
		finishorder(id, runningfile.value, price)
			.then((res) => {
				console.log(res)
				datafile.value = []
				fetchMatch('2', '3')
				uni.hideLoading();
			})
			.catch((err) => {
				uni.hideLoading();
			})
	}

	//加载更多
	const loadmore = () => {
		status.value = 'loading'
		page.value = page.value + 1
		if (current.value == 0) {
			getmsg()
		} else if (current.value == 1) {
			fetchMatch('1', '3')
		} else if (current.value == 2) {
			fetchMatch('2', '3')
		} else if (current.value == 3) {
			fetchMatch('3', '4')
		}
	}

	//顶部导航点击事件
	const onClickItem = (e) => {
		page.value = 1
		pageSize.value = 5
		datafile.value = []
		current.value = e.currentIndex
		if (current.value == 0) {
			getmsg()
		} else if (current.value == 1) {
			fetchMatch('1', '3')
		} else if (current.value == 2) {
			fetchMatch('2', '3')
		} else if (current.value == 3) {
			fetchMatch('3', '4')
		}
	}

	//打开抽屉
	const showDrawer = (e) => {
		getsingle()
		instance.refs[e].open()
	}

	//关闭抽屉
	const closeDrawer = (e) => {
		instance.refs[e].close()
	}

	//单量与收入
	const getsingle = () => {
		uni.showLoading({
			mask: true,
			title: '加载中'
		});
		getsingledose(runningfile.value.openid)
			.then((res) => {
				singl.value = res.data
				uni.hideLoading();
			})
			.catch((err) => {
				uni.hideLoading();
			})
	}

	//抽屉change变化
	const change = (e, msg) => {
		console.log(e)
		console.log(msg)
	}

	//退出系统
	const quit = () => {
		uni.reLaunch({
			url: '/pages/mine/mine'
		});
	}

	//进入详情
	const gotodetail = (id) => {
		uni.navigateTo({
			url: '../order-details/order-details?id=' + id
		})
	}

	//页面跳转
	const gotopage = (url) => {
		uni.navigateTo({
			url: url
		})
	}

	//刷新
	const refresh = () => {
		page.value = 1
		pageSize.value = 5
		datafile.value = []
		getmsg()
	}

	//获取订单
	const getmsg = () => {
		uni.showLoading({
			mask: true,
			title: '加载中'
		});
		getorderbyrun('2', runningfile.value.gender, page.value, pageSize.value)
			.then((res) => {
				datafile.value.push(...res.data);
				if (res.data.length < pageSize.value) {
					status.value = 'no-more'
				} else {
					status.value = 'more'
				}
				uni.hideLoading();
			})
			.catch((err) => {
				uni.hideLoading();
			})
	}

	//获取跑男信息
	const usermsg = () => {
		uni.showLoading({
			mask: true,
			title: '加载中'
		});
		getuser()
			.then((res) => {
				console.log(res)
				runningfile.value = res.data
				getmsg()
			})
			.catch((err) => {
				console.log(err)
				uni.showToast({
					icon: 'error',
					title: '出错了！'
				})
				setTimeout(() => {
					uni.navigateBack()
				}, 1000)
				uni.hideLoading();
			})
	}

	onLoad(() => {
		usermsg()
	})
</script>

<style>
	page {
		background-color: #F8F8F8;
	}

	.center-box {
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.tabulation {
		width: 33.3333333333%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.coard {
		margin: 0 auto;
		margin-bottom: 10px;
		width: 95%;
		border-radius: 10px;
		background-color: #ffffff;
		z-index: 1;
	}
</style>