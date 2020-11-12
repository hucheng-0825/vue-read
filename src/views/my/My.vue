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
        to="/myaccount"
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
      />
      <van-cell
        title="充值记录"
        is-link
        icon="cash-back-record"
      />
      <van-cell
        title="购买记录"
        is-link
        icon="cart-circle-o"
      />
      <van-cell
        title="浏览历史"
        icon="underway-o"
        is-link
      />
      <van-cell
        title="我的阅读基因"
        icon="browsing-history-o"
        is-link
      />
      <van-cell
        title="设置"
        icon="setting-o"
        is-link
        to="/setting"
      />
    </div>

    <!-- 弹出层 -->
    <van-popup
      v-model="show"
      :overlay=overlay
      closeable
      close-icon="arrow-left"
      close-icon-position="top-left"
      position="right"
      :style="{width:'100%', height: '100%' }"
    >
      <!-- 导航栏 -->
      <van-nav-bar
        title="充值"
        :placeholder=placeholder
      />
      <!-- 导航栏 -->

      <!-- banner图 -->
      <div class="banner">
        <img
          src="../../assets/2.jpg"
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
          :class="appearance"
          @click="addbgc"
        >
          <div class="jiage"><span class="shuzhi">{{item.jiage}}</span><span class="wenzi">元</span></div>
          <span class="yuebin">{{item.yuebin}}阅饼</span>
        </van-grid-item>
      </van-grid>
      <!-- 宫格 -->
    </van-popup>
    <!-- 弹出层 -->
  </div>

</template>

<script>
export default {
  name: 'Myindex',
  data () {
    return {
      list: {
      },
      // 是否显示弹出层
      show: false,
      // 是否显示遮罩层
      overlay: false,
      placeholder: true,
      appearance: false,
      jiage: []
    }
  },
  created () {
    this.getusername()
    this.getbalance()
  },
  methods: {
    goCZ () {
      // console.log(111)
      this.show = true
    },
    onClickLeft () {
      this.$router.back(-1)
    },
    async getusername () {
      const { data } = await this.$axios.get('http://localhost:8080/t')
      // console.log(data)
      this.list = data.data
      // console.log(this.list)
    },
    async getbalance () {
      const { data } = await this.$axios.get('http://localhost:8080/y')
      // console.log(data)
      this.jiage = data.data
      // console.log(this.jiage)
    },
    addbgc () {
      this.appearance = true
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
  ::v-deep.van-popup {
    .van-nav-bar {
      position: fixed;
      width: 100%;
      // background-color: pink;
      .van-nav-bar__title {
        margin: 0;
        margin-left: 120px;
        margin-top: 10px;
      }
    }
    .banner {
      width: 750px;
      height: 312px;
      margin-top: 92px;
      img {
        width: 750px;
        height: auto;
      }
    }
    .amount {
      display: flex;
      // justify-content: center; /* 水平居中 */
      align-items: center; /* 垂直居中 */
      // background-color: pink;
      height: 8%;
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
      .appearance {
          border: 5px solid #c06560;
          background-color: #faeaea;
      }
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
      }
    }
  }
}
</style>
