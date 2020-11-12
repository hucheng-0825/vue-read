<template>
  <div class="topup">
    <!-- 导航栏 -->
    <van-nav-bar title="充值" />
    <!-- 导航栏 -->

    <!-- banner图 -->
    <div class="banner">
      <img
        src="@/assets/2.jpg"
        alt=""
      >
    </div>
    <!-- banner图 -->

    <div class="amount">
      <span>充值金额 </span><span> (说明:充值1元=100阅饼)</span>
    </div>

    <!-- 宫格 -->
    <van-grid
      :column-num="2"
      :gutter="20"
    >
      <van-grid-item
        v-for="(item,index) in jiage"
        :key="index"
      >
        <div class="jiage"><span class="shuzhi">{{item.jiage}}</span><span class="wenzi">元</span></div>
        <span class="yuebin">{{item.yuebin}}阅饼</span>
      </van-grid-item>
    </van-grid>
    <!-- 宫格 -->

    <!-- 支付方式 -->
    <div class="zhifufangshi">选择支付方式</div>
    <van-radio-group v-model="radio">
      <van-cell-group>
        <van-cell
          title="微信"
          clickable
          @click="radio = '1'"
          icon="wechat"
        >
          <template #right-icon>
            <van-radio name="1" />
          </template>
        </van-cell>
        <van-cell
          title="支付宝"
          clickable
          @click="radio = '2'"
          icon="alipay"
        >
          <template #right-icon>
            <van-radio name="2" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>

    <!-- 按钮 -->
    <van-button @click="fukuanlianjie">立即充值</van-button>

    <!-- 扫码支付 -->
    <van-popup v-model="payshow">
      <img
        src="@/assets/erweima.png"
        alt=""
      >
    </van-popup>
  </div>
</template>
<script>
export default {
  name: 'TopUp',
  data () {
    return {
      // 点击充值价格列表
      jiage: [],
      // 支付方式选择状态
      radio: 0,
      // 付款弹出层
      payshow: false
    }
  },
  created () {
    this.getbalance()
  },
  methods: {
    // 获取付款价格列表
    async getbalance () {
      const { data } = await this.$axios.get('http://localhost:8080/y')
      // console.log(data)
      this.jiage = data.data
      // console.log(this.jiage)
    },
    // 判断选择的支付方式弹出付款窗口
    fukuanlianjie () {
      if (this.radio === '1') {
        this.payshow = true
      }
    }
  }
}

</script>
<style lang="scss" scoped>
::v-deep.topup {
  .van-nav-bar {
    .van-nav-bar__title {
      margin: 0;
      margin-left: 120px;
      margin-top: 10px;
    }
  }
  .banner {
    width: 750px;
    height: 312px;
    img {
      width: 750px;
      height: auto;
    }
  }
  .amount {
    display: flex;
    // justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    :first-child {
      margin-left: 50px;
      font-size: 34px;
      color: #222222;
      font-weight: 700;
      white-space: pre;
    }
    :last-child {
      font-size: 28px;
      color: #6e6e6e;
      white-space: pre;
    }
  }
  .van-grid {
    .van-grid-item__content {
      border-radius: 12px;
      border: 2px solid #e9e9e9;
      .yuebin {
        font-size: 28px;
        color: #6e6e6e;
      }
      .shuzhi {
        font-size: 34px;
        font-weight: 700;
      }
      .wenzi {
        font-size: 28px;
      }
      &:hover {
        background-color: #faeaea;
        border: 2px solid #e3847f;
      }
    }
  }
  .zhifufangshi {
    margin-top: 46px;
    margin-left: 40px;
    font-size: 26px;
    font-weight: 700;
  }
  .van-button {
    width: 690px;
    height: 70px;
    margin: 0px 30px;
    color: #fffbf9;
    background-color: #e8534d;
    border-radius: 12px;
  }
  .van-radio-group {
    .van-icon-wechat {
      color: #51a549;
    }
    .van-icon-alipay {
      color: #1678ff;
    }
  }
  .van-popup {
    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>
