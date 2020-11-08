<template>
  <div class="my-account">

    <!-- 导航栏区域 -->
    <van-nav-bar
      title="我的账户"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 导航栏区域 -->

    <!-- 账户余额区域 -->
    <div class="account-balance">
      <div class="balance">
        <span>500</span>
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
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep.my-account {
  .account-balance {
    display: flex;
    /*左右居中*/
    justify-content: center;
    width: 100%;
    height: 384px;
    // background-color: pink;
    .balance {
      margin-top: 118px;
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
    .van-nav-bar__left {
      padding: 0;
      .van-icon {
        color: #888888;
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
