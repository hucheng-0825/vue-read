<template>
  <div class="BookCity-container">
    <!-- 头部的搜索区域  -->
    <div class="header">
      <van-button class="header-button-left" type="default" size="large" plain hairline icon-position="right" icon="search" @click="$router.push('/search')"></van-button>
      <van-button type="default" class="header-button-right" @click="$router.push('/primarysort')">分类</van-button>
    </div>
    <div class="main">
<van-tabs v-model="active" class="main-tabs"    swipeable  @click="change">
 <!-- 这是向下的箭头  -->
<div class="lower-arrow" slot="nav-right"  @click="chuli">
    <van-icon name="arrow-down" />
  </div>

  <van-tab class="main-tab" :title="value" v-for="(value,index) in list" :key="index">
    <!-- 内容区域  -->

    <!-- 导入的组件  -->
  <book-list></book-list>
  </van-tab>

</van-tabs>
    </div>

<van-popup v-model="isShow" position="bottom" :style="{ height: '100%' }" >
  <channel-list @close="isShow=$event"  :list="list" :someList="someList"></channel-list>
</van-popup>
  </div>
</template>

<script>
import BookList from './components/BookList'
import ChannelList from './components/ChannelList'

export default {
  name: 'BookCity',
  components: {
    BookList,
    ChannelList
  },
  data () {
    return {
      active: '',
      // tab列表中的,这个是tab的channels列表
      list: [],
      // 这个是书籍列表
      bookList: [],
      // 展示弹出层
      isShow: false,
      // 上面的一些
      someList: [],
      // 这是所有的书籍
      all: []
    }
  },
  created () {
    this.getList()
    this.getBookList()
    this.getsomeChannel()
  },
  methods: {
    async getList () {
      const { data } = await this.$axios.get('http://localhost:8080/channels')
      // console.log(data)

      this.list = data
    },
    async getBookList () {
      const { data } = await this.$axios.get('http://localhost:8080/getBooks')
      // console.log(data)
      this.bookList = data
      this.all = data
    },
    async getsomeChannel () {
      const { data } = await this.$axios.get('http://localhost:8080/somechannels')
      this.someList = data
    },
    // 打开弹出层的时候触发

    chuli () {
      this.isShow = true
      this.getsomeChannel()
    },
    // 这是随机返回的函数
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
    },
    // 切换tab栏时
    change () {
      // console.log('输出')
      // console.log(this.getRandom({ arry: this.all, range: 50 }))
      this.bookList = this.getRandom({ arry: this.all, range: 50 })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep.BookCity-container{

  .header{
    width: 100%;
    height: 86px;
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 22;
    background-color: #fff;

    .header-button-left{
    width: 600px;
    height: 55px;
    align-self: center;
    margin-left: 30px;
    border: 1px solid #ccc;
    .van-button__content{
      justify-content: flex-end;
      .van-button__icon{
        padding-right: 10px;
      }
    }
  }
  .header-button-right{
    width: 150px;
    height: 100%;
    border: 0;
    .van-button__text{
      font-size: 30px;
    }
  }
  }
  .header::after{
    display: block;
    content: "";
    width: 100%;
    height: 1px;
    background-color: #f6f6f6;
    position: absolute;
    bottom: 0;

  }
 .main {
   margin-top: 86px;
   .main-tabs{
     position: relative;
     // 列表的所有
     .main-tab{

       height: 80px;

     }
     //下箭头
     .lower-arrow{
       width: 80px;
       height: 80px;
       background-color: #fff;
       position: fixed;
       top: 86px;
       right: 0;
       display: flex;
       justify-content: center;
       align-items: center;
     }
     .van-tabs__nav{
margin-right: 80px;
       .van-tab{
padding: 0 15px;
     }
     }

   }
 }

}
</style>
