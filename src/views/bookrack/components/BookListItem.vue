<template>
  <div class="catalog-container">
    <!-- <van-nav-bar title="目录" /> -->
    <div class="catalog-item">
      <van-cell
        v-for="v in title"
        :key="v.id"
        :class="v.err === 0 ? 'cell-suo' : ''"
      >
        <template #title>
          <span>{{ v.title }}</span>
        </template>
        <template #right-icon>
          <i class="iconfont icon-suo" v-if="v.err === 0"></i>
        </template>
      </van-cell>
    </div>

    <van-tabbar class="tabbar-item" v-model="active" active-color="red">
      <van-tabbar-item class="box1">目录</van-tabbar-item>
      <van-tabbar-item>书签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'BookListItem',
  props: {
    itemId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      title: [],
      active: 0
    }
  },
  created () {
    this.getBook()
  },
  methods: {
    async getBook () {
      const { data } = await this.$axios.get('http://127.0.0.1:3333/bookchapter', {
        params: { book: this.itemId }
      })
      data.forEach(v => {
        this.title.push(v)
      })
    },
    // 返回功能
    onClickLeft () {
      // this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.catalog-container {
  .catalog-item {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 50px;
    overflow-y: auto;
    .cell-suo {
      color: #ccc;
    }
    .icon-suo {
      font-size: 33px;
    }
  }
  .tabbar-item {
    border-top: 1px solid #ccc;
    .box1 {
      border-right: 1px solid #ccc;
    }
    .van-tabbar-item {
      font-size: 30px;
    }
  }
}
</style>
