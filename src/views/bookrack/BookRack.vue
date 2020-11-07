<template>
  <div class="bookrack-container">
    <van-sticky class="title-item">
      <van-cell class="cell-item">
        <template #title>
          <span class="s1">春暖阅读</span>
          <span class="s2">面朝大海，春暖花开</span>
        </template>
        <template #default> <van-icon name="ellipsis" /> </template>
      </van-cell>
    </van-sticky>
    <!-- 书籍列表区域 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item" :title="item" />
      <book-list />
    </van-list>
  </div>
</template>

<script>
import BookList from './components/BookList'
export default {
  name: 'BookRack',
  data () {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },
  components: {
    BookList
  },
  created () {
    this.getBookList(4)
  },
  methods: {
    async getBookList (id) {
      const res = await this.$axios.get('http://127.0.0.1:3333/booklist/' + id)
      console.log(res)
    },
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求

      for (let i = 0; i < 10; i++) {
        // this.getBookList(i)
      }

      // 加载状态结束
      this.loading = false

      // 数据全部加载完成

      this.finished = true
    }
  }
}
</script>

<style lang="scss" scoped>
.bookrack-container {
  .van-cell__title {
    .s1 {
      font-size: 44px;
      color: #000;
      font-weight: 290;
      margin-right: 30px;
    }
    .s2 {
      font-weight: 290;
      font-style: normal;
      font-size: 28px;
      color: #999999;
    }
  }
  .van-cell__value {
    flex: unset;
    .van-icon-ellipsis {
      font-size: 60px;
      color: #ccc;
    }
  }
}
</style>
