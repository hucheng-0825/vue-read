<template>
  <div class="IntroduceBook-container">
    <van-cell title="作者其他书籍"  class="IntroduceBook-cell" >
      <span class="cell-span" slot='right-icon' @click="getBooks">
        <van-icon class="shuaxin" name="replay" />
         <span> 换一换</span>
      </span>
    </van-cell>
 <!-- 以下是图书区域 -->
  <div class="IntroduceBook-book">
    <div class="book-item wan" v-for="value in list" :key="value.id" @click="handle(value)">
      <van-image  class="item-image" :src="value.images" />
      <span class="item-span">{{value.name}}</span>
    </div>

  </div>
      <!-- <van-image  class="item-image" :src="value.images" /> -->

  </div>
</template>

<script>
export default {
  name: 'AuthorOther',
  props: ['dianji'],
  data () {
    return {
      list: [],
      all: []
    }
  },
  watch: {
    'dianji' () {
      this.getBooks()
    }
  },
  mounted () {
    this.getBooks()
  },
  methods: {
    async getBooks () {
      const { data } = await this.$axios.get('http://localhost:8080/getBooks')
      this.all = data.list
      this.list = this.getRandom({ arry: data.list, range: 4 })
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
    },
    handle (value) {
      // console.log('shuchu')
      // console.log(this.getRandom({ arry: this.all, range: 4 }))
      this.list = this.getRandom({ arry: this.all, range: 4 })
      this.$emit('close', value)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep.IntroduceBook-container{
  height: 370px;
  width: 100%;
  // 单元格中的
  .IntroduceBook-cell{
    .van-cell__title{
      font-weight: 500;
      font-size: 30px;
      color: #282828;
    }
    .shuaxin{
      display: flex;
      align-items: center;
      padding-right: 8px;
      font-size: 35px;
    }
    .cell-span{
      display: flex;
      cursor: pointer;
    }
    .cell-span:active{
      color: aqua;
    }
  }
  .IntroduceBook-cell::after{
    border: 0;
  }
  // 图书的区域
 .IntroduceBook-book{
   display: flex;
   height: 300px;

   .book-item{
     flex: 1;
     display: flex;
     flex-direction: column;
    // justify-content: center;
     align-items: center;
   }
   .wan{
    //  background-color: aqua;
     .item-image{
       padding-top: 10px;
       width: 150px;
       height: 190px;
      //  border: 2px solid #ccc;
     }
     .item-span{
       padding-top: 18px;
       font-size: 25px;
     }
   }
 }
}
</style>
