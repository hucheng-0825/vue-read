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
      />
    </div>
  </div>

</template>

<script>
export default {
  name: 'Myindex',
  data () {
    return {
      list: {
      }
    }
  },
  created () {
    this.getusername()
  },
  methods: {
    goCZ () {
      // console.log(111)
    },
    onClickLeft () {
      this.$router.back(-1)
    },
    async getusername () {
      const { data } = await this.$axios.get('http://localhost:8080/t')
      // console.log(data)
      this.list = data.data
      // console.log(this.list)
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
