<template>
  <div class="my-account">
    <!-- 导航栏区域 -->
    <van-nav-bar title="我的账户" />
    <!-- 导航栏区域 -->

    <!-- 账户余额区域 -->
    <div class="account-balance">
      <div class="balance">
        <span>{{balance}}</span>
        <span>春卷</span>
      </div>
    </div>
    <!-- 账户余额区域 -->

    <!-- 个性功能区域 -->
    <div class="personal-function"></div>
    <!-- 个性功能区域 -->

  </div>
</template>
<script>
export default {
  name: 'MyAccount',
  data () {
    return {
      balance: 0
    }
  },
  created () {
    this.getbalance()
  },
  methods: {
    async getbalance () {
      const { data } = await this.$axios.get('http://localhost:8080/q')
      // console.log(data)
      this.balance = data.data.balance
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep.my-account {
  .account-balance {
    background-color: #f5f5f5;
    display: flex;
    /*左右居中*/
    justify-content: center;
    align-items: center; /* 垂直居中 */
    width: 100%;
    height: 382px;
    // background-color: pink;
    .balance {
      height: 96px;
      :first-child {
        font-family: "微软雅黑 Regular", "微软雅黑";
        font-weight: 400;
        font-style: normal;
        font-size: 72px;
      }
      :last-child {
        font-family: "微软雅黑 Regular", "微软雅黑";
        font-weight: 400;
        font-style: normal;
        font-size: 12px;
        color: #cccccc;
      }
    }
  }
  .van-nav-bar {
    box-shadow: 0px 9px 9px #eeeeee;
    .van-nav-bar__left {
      padding: 0;
      .van-icon {
        color: #e9e9e9;
        &::before {
          font-size: 46px;
        }
      }
    }
  }
  .personal-function {
    width: 100%;
    height: 858px;
    box-sizing: border-box;
    border: 2px solid #cccccc;
  }
}
</style>
