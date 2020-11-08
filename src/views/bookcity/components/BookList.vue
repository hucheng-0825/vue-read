<template>
  <div class="BookList-container">

     <!-- 轮播图  -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
  <van-swipe-item><van-image class="main-image"  fit="cover" src="https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=176998383,27345077&fm=26&gp=0.jpg" /></van-swipe-item>
  <van-swipe-item><van-image class="main-image"  fit="cover" src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4021895125,1084551872&fm=26&gp=0.jpg" /></van-swipe-item>
  <van-swipe-item><van-image class="main-image"  fit="cover" src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2497546778,4206277609&fm=26&gp=0.jpg" /></van-swipe-item>
  <van-swipe-item><van-image class="main-image"  fit="cover" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=367462202,527001410&fm=26&gp=0.jpg" /></van-swipe-item>
</van-swipe>
    <!-- 每一项书籍的数据  -->
    <div class="BookList-item" v-for="(value,index) in list" :key="index">
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
  props: ['list'],
  data () {
    return {

    }
  },
  methods: {

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
