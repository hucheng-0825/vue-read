<template>
  <div class="SecondaryBookList-container">

    <!-- 每一项书籍的数据  -->
    <div class="SecondaryBookList-item" v-for="(value,index) in allbook" :key="index" @click="$router.push({name:'BookDetails',query:value.id,params:value})">
      <!-- 每一项中左边的盒子  -->
      <div class="SecondaryBookList-item-left">
        <van-image class="SecondaryBookList-image" fit="cover" :src="value.images" />
      </div>
      <!-- 每一项中右边的盒子   -->
      <div class="SecondaryBookList-item-right">
        <span class="font30">{{value.name}}</span>
        <span class="font20">{{value.author}}</span>
        <span class="font10">{{value.intro}}</span>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SecondaryBookList',
  props: ['allbook'],
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
::v-deep.SecondaryBookList-container{
   position: fixed;
  top: 180px;
bottom: 0;
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
  .SecondaryBookList-item{
    display: flex;
    width: 100%;
    height: 220px;
    // background-color: hotpink;
    .SecondaryBookList-item-left{
      width: 180px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .SecondaryBookList-image{
        .van-image__img{
          width: 137px;
          height: 180px;
        }
      }
    }
    .SecondaryBookList-item-right{
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
