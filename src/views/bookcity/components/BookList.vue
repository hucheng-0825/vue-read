<template>
  <div class="BookList-container">

     <!-- 轮播图  -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in bannerImgs" :key="index">
        <van-image class="main-image"  fit="cover" :src="item"  />
      </van-swipe-item>
    </van-swipe>
    <!-- 每一项书籍的数据  -->
    <div class="BookList-item" v-for="value in booksList" :key="value.id" @click="$router.push(`/bookdetails/${value.id}`)">
      <!-- 每一项中左边的盒子  -->
      <div class="BookList-item-left">
        <van-image class="BookList-image" fit="cover" :src="value.images" />
      </div>
      <!-- 每一项中右边的盒子   -->
      <div class="BookList-item-right">
        <span class="font30">{{value.name}}</span>
        <span class="font20">{{value.author}}</span>
        <span class="font10">{{value.intro}}</span>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookList',
  data () {
    return {
      booksList: [],
      bannerImgs: []
    }
  },
  methods: {
    async getBannerImgs () {
      const { data } = await this.$axios.get('http://localhost:8080/bannerimgs')
      // console.log(data)
      this.bannerImgs = data.list
    },
    async getBookList () {
      const { data } = await this.$axios.get('http://localhost:8080/getBooks')
      // console.log(data)
      this.booksList = data.list
      // console.log(this.booksList)
    }
  },
  created () {
    this.getBannerImgs()
    this.getBookList()
  }
}
</script>

<style lang="scss" scoped>
::v-deep.BookList-container{
   position: fixed;
  top: 180px;
  bottom: 100px;
  overflow-y: auto;
  overflow-x: hidden;
  right: 0;
  left: 0;
.main-image{
         .van-image__img{
           width: 100%;
           height: 250px;
         }
       }
  .BookList-item{
    display: flex;
    width: 100%;
    height: 220px;
    // background-color: hotpink;
    .BookList-item-left{
      width: 180px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .BookList-image{
        .van-image__img{
          width: 137px;
          height: 180px;
        }
      }
    }
    .BookList-item-right{
      flex: 1;
      // background-color: red;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .font30{
        font-size: 35px;
        color: #2e2e2e;
        padding-bottom: 15px;
      }
      .font20{
        font-size: 20px;
        color: #4a5a6e;
        padding-bottom: 25px;
      }
      .font10{
        font-size: 15px;
        color: #b5b4b3;
      display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;
      }
    }
  }
}
</style>
