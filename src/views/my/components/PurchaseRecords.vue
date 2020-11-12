<template>
  <div class="purchaserpecords">
    <!-- 导航栏区域 -->
    <van-nav-bar title="购买记录" />
    <!-- 导航栏区域 -->

    <!-- 标签页区域 -->
    <van-tabs
      v-model="active"
      animated
    >
      <van-tab title="书籍">
        <!-- 主题内容区域 -->
        <div class="content"><span>暂无购买记录</span></div>
        <!-- 主题内容区域 -->
      </van-tab>
      <van-tab title="有声">
        <!-- 主题内容区域 -->
        <div class="content"><span>暂无购买记录</span></div>
        <!-- 主题内容区域 -->
      </van-tab>
      <van-tab title="其他">
        <!-- 主题内容区域 -->
        <div class="content"><span>暂无购买记录</span></div>
        <!-- 主题内容区域 -->
      </van-tab>
    </van-tabs>
    <!-- 标签页区域 -->
  </div>
</template>
<script>
export default {
  name: 'PurchaseRecords',
  data () {
    return {
      active: 2
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
::v-deep.purchaserpecords {
  .van-nav-bar {
    .van-nav-bar__title {
      margin: 0;
      margin-left: 120px;
      margin-top: 10px;
    }
  }
  .van-tabs {
    .van-tabs__wrap {
      box-shadow: 0px 9px 9px #eeeeee;
    }
    .content {
      height: 1242px;
      display: flex;
      /*左右居中*/
      justify-content: center;
      align-items: center; /* 垂直居中 */
      span {
        font-size: 22px;
        color: #a4a4a4;
      }
    }
  }
}
</style>
