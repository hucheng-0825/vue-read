<template>
  <div class="reader-menu-container">
    <van-tabbar v-model="active" @change="onChange">
      <van-tabbar-item icon="bars" @click="tabBtn">目录</van-tabbar-item>
      <van-tabbar-item>
        <template #icon> <i class="iconfont icon-jindutiao"></i> </template
        >进度</van-tabbar-item
      >
      <van-tabbar-item>
        <template #icon>
          <i class="iconfont icon-zitidaxiao" @click="sizeBTN"></i> </template
        >设置</van-tabbar-item
      >
      <van-tabbar-item>
        <template #icon>
          <i
            class="iconfont"
            :class="night ? 'icon-yejian' : 'icon-yejian1'"
            @click="nightBtn"
          ></i> </template
        >夜间</van-tabbar-item
      >
    </van-tabbar>
    <!--  设置字体大小-->
    <div class="box2">
      <span class="size">字号</span>
      <div class="btn-item">
        <span class="a" @click="deleteSize">A-</span>
        <span class="b">{{ Size }}</span>
        <span class="c" @click="addSize">A+</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
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
      active: '',
      night: false,
      a: false
    }
  },
  computed: { ...mapState(['show', 'Size']) },
  methods: {
    onChange () {
      console.log(this.active)
      if (this.active !== 2) {
        this.$store.commit('setShow', 8)
      }
    },
    // 目录
    tabBtn () {
      this.$store.commit('setFlag', true)
      this.$emit('showcatalog')
    },
    sizeBTN () {
      this.a = !this.a
      if (this.a) {
        this.$store.commit('setShow', 18)
      } else {
        this.$store.commit('setShow', 8)
      }
    },
    // 夜间模式
    nightBtn () {
      this.night = !this.night
      this.$store.commit('setNight', this.night)
      console.log(this.night)
    },
    // 字体大小
    deleteSize () {
      this.$store.commit('setSize', -2)
    },
    addSize () {
      this.$store.commit('setSize', 2)
    }
  }
}
</script>
<style lang="scss" scoped>
.reader-menu-container {
  .box2 {
    position: relative;
    height: 120px;
    line-height: 120px;
    padding-left: 50px;
    border-top: 1px solid #ccc;
    border-bottom: 2px solid #ccc;
    .size {
      font-size: 30px;
    }
    .btn-item {
      display: flex;
      position: absolute;
      left: 110px;
      bottom: 20px;
      width: 550px;
      height: 80px;
      border: 1px solid #ccc;
      margin-left: 30px;
      border-radius: 50px;
      span {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        height: 100%;
      }
      .a,
      .b {
        border-right: 1px solid #ccc;
        font-size: 35px;
      }
      .a {
        font-size: 28px;
      }
      .c {
        font-size: 40px;
      }
    }
  }
  .icon-zitidaxiao {
    font-size: 54px;
  }
  .icon-yejian1 {
    font-size: 34px;
  }
}
</style>
