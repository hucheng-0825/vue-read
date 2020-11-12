<template>
  <div class="bookrack-container" @click="ellipsis = false">
    <div class="title-item">
      <div class="cell-item">
        <span class="s1">春暖阅读</span>
        <span class="s2">面朝大海，春暖花开</span>
      </div>
      <div class="icon-item">
        <van-icon name="ellipsis" @click.stop="ellipsis = !ellipsis" />
      </div>
      <!--  -->
      <div class="serch-item" v-if="ellipsis">
        <div class="search-item1" @click="$router.push('/search')">
          <van-icon name="search" /><span>搜索</span>
        </div>
        <div class="search-item2" @click="bookshelves">
          <van-icon name="label-o" /><span>整理书架</span>
        </div>
      </div>
    </div>
    <!-- 书籍列表区域 -->
    <top-book :topBook="content.length > 0 ? content : booklocalStorage" />
    <div class="van-list-item">
      <book-list
        v-for="v in content.length > 0 ? content : booklocalStorage"
        :key="v.id"
        :list="v"
      />
    </div>
  </div>
</template>

<script>
import BookList from './components/BookList'
import TopBook from './components/TopBook'
import { mapState } from 'vuex'
export default {
  name: 'BookRack',
  data () {
    return {
      content: [],
      ellipsis: false
    }
  },
  computed: {
    ...mapState(['booklocalStorage'])
  },
  components: {
    BookList,
    TopBook
  },
  created () {
    if (this.booklocalStorage.length === 0) {
      this.getBook()
    }
  },
  methods: {
    // 整理书架
    bookshelves () {

    },
    async getBook () {
      try {
        const { data } = await this.$axios.get('http://127.0.0.1:3333/booklimit', {
          params: {
            pagenum: 1,
            pagesize: 6
          }
        })
        console.log(data)
        this.content.push(...data)
      } catch (e) {
        this.$toast('获取书籍失败')
      }
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
    .serch-item {
      position: fixed;
      right: 30px;
      top: 95px;
      width: 230px;
      height: 160px;
      background-color: #fff;
      border: 1px solid #ccc;
      z-index: 3333;
      font-size: 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 80px;
      border-radius: 10px;
      box-sizing: border-box;
      .search-item1 {
        padding-left: 20px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ccc;
      }
      .search-item2 {
        padding-left: 20px;
        display: flex;
        align-items: center;
      }
      span {
        margin-left: 10px;
        font-size: 28px;
      }
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
    height: 53vh;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin-top: 30px;
  }
}
</style>
