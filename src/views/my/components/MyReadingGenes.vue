<template>
  <div class="myreadinggenes">
    <!-- 导航栏区域 -->
    <van-nav-bar title="阅读基因" />
    <!-- 导航栏区域 -->
    <!-- 主题内容区域 -->
    <div class="content"><span>暂无浏览记录无法分析您的阅读基因</span></div>
    <!-- 主题内容区域 -->
  </div>
</template>
<script>
export default {
  name: 'MyReadingGenes',
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
::v-deep.myreadinggenes {
  .van-nav-bar {
    box-shadow: 0px 9px 9px #eeeeee;
    .van-nav-bar__title {
      margin: 0;
      margin-left: 120px;
      margin-top: 10px;
    }
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
</style>
