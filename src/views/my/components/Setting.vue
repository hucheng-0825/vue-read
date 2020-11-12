<template>
  <div class="setting-container">
    <!-- 顶部导航栏 -->
    <van-nav-bar
    class="nav-bar"
    title="设置"
    left-arrow
    @click-left="$router.back()"
  />
  <!-- /顶部导航栏 -->
    <van-cell title="自动订阅管理" is-link value="0本" />
    <van-cell title="阅读设置" is-link  />
    <van-cell title="隐私设置" is-link  />
    <van-cell title="全局护眼模式" is-link value="已关闭" />
    <van-cell title="推送通知" is-link value="未开启" />
    <van-cell title="仅Wi-Fi环境加载作品封面" is-link center>
      <template #default>
        <van-switch v-model="isCoverShow" size="20px" />
      </template>
    </van-cell>
    <van-cell title="使用移动网络听书" is-link>
      <template #default>
        <van-switch v-model="isListenShow" size="20px" />
      </template>
    </van-cell>
    <van-cell title="清理缓存" is-link value="27.00M" />
    <van-cell title="安全中心" is-link  />
    <van-cell title="吐个槽" is-link  />
    <van-cell title="客服与帮助" is-link  />
    <van-cell title="给我们评分" is-link  />
    <van-cell title="关于起点读书" is-link  />
    <div class="no-login" @click="$router.push('/login')">
      切换用户
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingIndex',
  data () {
    return {
      isCoverShow: false,
      isListenShow: false
    }
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep.setting-container {
    .nav-bar {
      .van-icon {
        color: #000;
        font-size: 40px;
      }
    }
    .no-login {
      color:#d75e84;
      text-align: center;
      font-size: 30px;
      font-weight: 600;
      margin: 15px 0;
    }
  }
</style>
