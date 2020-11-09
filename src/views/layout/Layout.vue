<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view />
    <!-- /子路由出口 -->

    <!-- 标签导航栏 -->
    <!--
      route: 开启路由模式
    -->
    <van-tabbar class="layout-tabbar" route>
      <van-tabbar-item to="/bookrack">
        <i class="iconfont icon-shujia"></i>
        <span class="text">书架</span>
      </van-tabbar-item>
      <van-tabbar-item to="/bookcity">
        <i class="iconfont icon-shucheng"></i>
        <span class="text">书城</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i class="iconfont icon-yonghu-copy"></i>
        <span class="text">我的</span>
      </van-tabbar-item>
    </van-tabbar>
    <!-- /标签导航栏 -->
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  components: {},
  props: {},
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="scss">
.layout-container {
  .layout-tabbar {
    border-top: 2px solid #ccc;
    .van-tabbar-item--active{
      color: red;
    }
    .van-tabbar-item{
      ::v-deep .van-tabbar-item__text{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .iconfont{
          font-size: 40px;
          margin-bottom: 10px;
        }
        .text{
          font-size: 30px;
        }
      }
    }

  }
}
</style>
