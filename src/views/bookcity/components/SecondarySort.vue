<template>
  <div class="SecondarySort-container">
    <!-- 头部区域  -->
    <van-nav-bar
    class="SecondarySort-header"
  :title="$route.params.title"

  left-arrow
@click-left="$router.back()"
/>
<!-- tab栏区域  -->
<van-tabs v-model="active" swipeable>
  <van-tab :title="value" v-for="(value,index) in tabList" :key="index">
<scondary-book-list :allbook="allBook"></scondary-book-list>
  </van-tab>

</van-tabs>
  </div>
</template>

<script>
import ScondaryBookList from './SecondaryBookList'
export default {
  name: 'SecondarySort',
  components: {
    ScondaryBookList
  },
  data () {
    return {
      // tab栏的数据
      tabList: ['东方玄幻', '异世大陆', '王朝争霸', '高武世界'],
      // 所有的书籍
      allBook: [],
      // 当前激活的index
      active: 0
    }
  },
  mounted () {
    this.getAllBook()
  },
  methods: {
    async getAllBook () {
      const { data } = await this.$axios.get('http://localhost:8080/getBooks')
      // console.log(data)
      var book = data
      book.reverse()
      this.allBook = book
    }
  }

}
</script>

<style lang="scss" scoped>
::v-deep.SecondarySort-container{
 .SecondarySort-header{
 .van-icon{
   font-size: 50px;
   color: #878787;
 }
 }
}
</style>
