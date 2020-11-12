<template>
  <div class="bookrack-container">
    <div class="title-item">
      <div class="cell-item">
        <span class="s1">春暖阅读</span>
        <span class="s2">面朝大海，春暖花开</span>
      </div>
      <div class="icon-item">
        <van-icon name="ellipsis" />
      </div>
    </div>
    <!-- 书籍列表区域 -->
    <top-book :topBook="list" />
    <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad"
      class="van-list-item"
    >
      <book-list v-for="v in list" :key="v.id" :list="v" />
    </van-list>
  </div>
</template>

<script>
import BookList from './components/BookList'
import TopBook from './components/TopBook'
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
    BookList,
    TopBook
  },
  created () {
    this.onLoad()
  },
  methods: {
    async getBookList (id) {
      const { data } = await this.$axios.get('http://127.0.0.1:3333/booklist/', {
        params: { id }
      })
      // console.log(data)
      this.list.push(data)
    },
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求

      for (let i = 1; i < 10; i++) {
        this.getBookList(i)
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
  .title-item {
    position: fixed;
    display: flex;
    justify-content: space-between;
    top: 0;
    left: 0;
    right: 0;
    height: 114px;
    padding-left: 35px;
    padding-right: 35px;
    line-height: 114px;
    background-color: rgba(102, 102, 102);
    z-index: 999;
    .s1 {
      font-size: 44px;
      color: #fff;
      font-weight: 290;
      margin-right: 30px;
    }
    .s2 {
      font-weight: 290;
      font-style: normal;
      font-size: 28px;
      color: #999999;
    }
    .icon-item {
      color: #fff;
      font-size: 55px;
      padding-top: 15px;
    }
  }

  .van-cell__value {
    flex: unset;
    .van-icon-ellipsis {
      font-size: 60px;
      color: #ccc;
    }
  }
  .van-list-item {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin-top: 30px;
  }
}
</style>
