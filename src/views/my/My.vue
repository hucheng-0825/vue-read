<template>
  <div class="myindex-content">
    <div class="head-content">
      <van-image
        class="head-portrait"
        round
        width="73px"
        height="73px"
        :src="list.url"
      />
      <span class="user-name">{{list.name}}</span>
    </div>
    <div class="body-content">
      <van-cell
        title="我的账户"
        icon="gold-coin-o"
        is-link
        @click="showMyAccount"
      >
      </van-cell>
      <van-button
        round
        type="default"
        @click.stop="goCZ"
      >点击充值</van-button>
      <van-cell
        title="我的阅历"
        is-link
        icon="clock-o"
        @click="showExperience"
      />
      <van-cell
        title="充值记录"
        is-link
        icon="cash-back-record"
        @click="showRechargeRecord"
      />
      <van-cell
        title="购买记录"
        is-link
        icon="cart-circle-o"
        @click="showPurchaseRecords"
      />
      <van-cell
        title="浏览历史"
        icon="underway-o"
        is-link
        @click="showBrowsingHistory"
      />
      <van-cell
        title="我的阅读基因"
        icon="browsing-history-o"
        is-link
        @click="showMyReadingGenes"
      />
      <van-cell
        title="设置"
        icon="setting-o"
        is-link
      />
    </div>

    <!-- 我的账户弹出层 -->
    <van-popup
      :overlay=overlay
      closeable
      position="right"
      close-icon="arrow-left"
      close-icon-position="top-left"
      :style="{width:'100%', height: '100%' }"
      v-model="myAccountShow"
    >
      <!-- 我的账户组件 -->
      <my-account></my-account>
      <!--我的账户组件-->
    </van-popup>
    <!-- 我的账户弹出层 -->

    <!-- 点击充值弹出层 -->
    <van-popup
      v-model="show"
      closeable
      :overlay=overlay
      close-icon="arrow-left"
      close-icon-position="top-left"
      position="right"
      :style="{width:'100%', height: '100%' }"
    >
      <!-- 点击充值组件 -->
      <top-up></top-up>
      <!-- 点击充值组件 -->
    </van-popup>
    <!-- 点击充值弹出层 -->

    <!-- 我的阅历弹出层 -->
    <van-popup
      :overlay=overlay
      closeable
      position="right"
      close-icon="arrow-left"
      close-icon-position="top-left"
      :style="{width:'100%', height: '100%' }"
      v-model="experienceShow"
    >
      <my-experience></my-experience>
    </van-popup>
    <!-- 我的阅历弹出层 -->

    <!-- 充值记录弹出层 -->
    <van-popup
      :overlay=overlay
      closeable
      position="right"
      close-icon="arrow-left"
      close-icon-position="top-left"
      :style="{width:'100%', height: '100%' }"
      v-model="rechargeRecordShow"
    >
      <recharge-record></recharge-record>
    </van-popup>
    <!-- 充值记录弹出层 -->

    <!-- 购买记录弹出层 -->
    <van-popup
      :overlay=overlay
      closeable
      position="right"
      close-icon="arrow-left"
      close-icon-position="top-left"
      :style="{width:'100%', height: '100%' }"
      v-model="purchaseRecordsdShow"
    >
      <purchase-records></purchase-records>
    </van-popup>
    <!-- 购买记录弹出层 -->

    <!-- 浏览历史弹出层 -->
    <van-popup
      :overlay=overlay
      closeable
      position="right"
      close-icon="arrow-left"
      close-icon-position="top-left"
      :style="{width:'100%', height: '100%' }"
      v-model="browsingHistoryShow"
    >
      <browsing-history></browsing-history>
    </van-popup>
    <!-- 浏览历史弹出层 -->

    <!-- 阅读基因弹出层 -->
    <van-popup
      :overlay=overlay
      closeable
      position="right"
      close-icon="arrow-left"
      close-icon-position="top-left"
      :style="{width:'100%', height: '100%m' }"
      v-model="myReadingGenesShow"
    >
      <my-reading-genes></my-reading-genes>
    </van-popup>
    <!-- 阅读基因弹出层 -->
  </div>

</template>

<script>// 导入我的账户组件
import MyAccount from './components/MyAccount'
import TopUp from './components/TopUp'
import MyExperience from './components/MyExperience'
import RechargeRecord from './components/RechargeRecord'
import PurchaseRecords from './components/PurchaseRecords'
import BrowsingHistory from './components/BrowsingHistory'
import MyReadingGenes from './components/MyReadingGenes'
export default {
  name: 'Myindex',
  components: {
    MyAccount,
    TopUp,
    MyExperience,
    RechargeRecord,
    PurchaseRecords,
    BrowsingHistory,
    MyReadingGenes
  },
  data () {
    return {
      // 用户信息列表
      list: {
      },
      // 我的账户弹出层
      myAccountShow: false,
      // 点击充值弹出层
      show: false,
      // 我的阅历弹出层
      experienceShow: false,
      // 充值记录弹出层
      rechargeRecordShow: false,
      // 购买记录弹出层
      purchaseRecordsdShow: false,
      // 浏览历史弹出层
      browsingHistoryShow: false,
      // 阅读基因
      myReadingGenesShow: false,
      // 是否显示遮罩层
      overlay: false
      // 账户余额
    }
  },
  created () {
    this.getusername()
  },
  methods: {
    showMyAccount () {
      this.myAccountShow = true
    },
    goCZ () {
      this.show = true
    },
    // 获取用户信息
    async getusername () {
      const { data } = await this.$axios.get('http://localhost:8080/t')
      // console.log(data)
      this.list = data.data
      // console.log(this.list)
    },
    // 点击显示我的阅历
    showExperience () {
      this.experienceShow = true
    },
    // 点击显示充值记录
    showRechargeRecord () {
      this.rechargeRecordShow = true
    },
    // 点击显示购买记录
    showPurchaseRecords () {
      this.purchaseRecordsdShow = true
    },
    // 点击显示浏览历史
    showBrowsingHistory () {
      this.browsingHistoryShow = true
    },
    // 点击显示阅读基因
    showMyReadingGenes () {
      this.myReadingGenesShow = true
    }

  }
}
</script>

<style lang="scss" scoped>
.myindex-content {
  .head-content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 444px;
    // background-color: pink;
    .van-image {
      border: 1px solid #dadada;
    }
    .user-name {
      margin-top: 15px;
      font-size: 28px;
      font-family: "微软雅黑 Regular", "微软雅黑";
      color: #999999;
    }
  }
  .body-content {
    position: relative;
    .van-button {
      position: absolute;
      right: 80px;
      top: 20px;
      padding: 0;
      width: 140px;
      height: 52px;
      font-size: 12px;
    }
  }
}
</style>
