<template>
  <div class="SecondarySort-container">
    <!-- 头部区域  -->
    <van-nav-bar
    class="SecondarySort-header"
  :title="title"

  left-arrow
@click-left="$router.push({name:'PrimarySort'})"
/>
<!-- tab栏区域  -->
<van-tabs v-model="active" swipeable @click="wanyixia">
  <van-tab :title="value" v-for="(value,index) in tabList" :key="index">
<scondary-book-list :allbook="someBook"></scondary-book-list>
  </van-tab>

</van-tabs>
  </div>
</template>

<script>
import ScondaryBookList from './SecondaryBookList'
// import BookList from './BookList'
export default {
  name: 'SecondarySort',
  components: {
    // BookList
    ScondaryBookList
  },
  data () {
    return {
      // tab栏的数据
      tabList: ['东方玄幻', '异世大陆', '王朝争霸', '高武世界'],
      // 所有的书籍
      // allBook: [],
      // 当前激活的index
      active: 0,
      // 头部名字
      title: '',
      someBook: []
    }
  },
  mounted () {
    this.getAllBook()
    if (this.$route.params.title) {
      this.title = this.$route.params.title
      window.sessionStorage.setItem('title', this.title)
      console.log(82)
    } else {
      if (window.sessionStorage.getItem('title')) {
        this.title = window.sessionStorage.getItem('title')
      } else {
        // this.title = this.$route.params.title
        // window.sessionStorage.setItem('title', this.title)
      }
    }
  },
  methods: {
    async getAllBook () {
      const { data } = await this.$axios.get('http://localhost:8080/getBooks')

      var book = data.list

      this.allBook = book
      this.someBook = this.list = this.getRandom({ arry: this.allBook, range: 50 })
    },
    wanyixia (va, ke) {
      this.active = va

      this.someBook = this.list = this.getRandom({ arry: this.allBook, range: 50 })
    },
    getRandom (opt) {
      var o = opt.arry
      var range = opt.range
      // 防止超过数组的长度
      range = range > o.length ? o.length : range

      var newArray = [].concat(o) // 拷贝原数组进行操作就不会破坏原数组
      var valArray = []

      for (var n = 0; n < range; n++) {
        var r = Math.floor(Math.random() * (newArray.length))
        valArray.push(newArray[r])
        // 在数组删掉，然后在下轮循环中就可以避免重复获取
        newArray.splice(r, 1)
      }
      return valArray
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
