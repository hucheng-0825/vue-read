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
    <book-list />
  </div>
</template>

<script>
import BookList from './components/BookList'
export default {
  name: 'BookRack',
  data () {
    return {

    }
  },
  components: {
    BookList
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
