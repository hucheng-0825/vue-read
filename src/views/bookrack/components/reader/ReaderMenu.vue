<template>
  <div class="reader-menu-container">
    <van-tabbar v-model="active" @change="onChange">
      <van-tabbar-item icon="bars" @click="$emit('showcatalog')"
        >目录</van-tabbar-item
      >
      <van-tabbar-item>
        <template #icon> <i class="iconfont icon-jindutiao"></i> </template
        >进度</van-tabbar-item
      >
      <van-tabbar-item>
        <template #icon> <i class="iconfont icon-zitidaxiao"></i> </template
        >设置</van-tabbar-item
      >
      <van-tabbar-item>
        <template #icon> <i class="iconfont icon-yejian1"></i> </template
        >夜间</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: 'ReaderMenu',
  props: {
    bookId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      active: ''
    }
  },
  methods: {
    onChange () {
      console.log(this.active)
      if (this.active === 0) {
        // this.$router.push('/booklistitem/' + this.bookId)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.reader-menu-container {
  .icon-zitidaxiao {
    font-size: 54px;
  }
  .icon-yejian1 {
    font-size: 34px;
  }
}
</style>
