<template>
  <div class="top-book">
    <div class="left">
      <van-image
        fit="cover"
        :src="
          topBook
            ? topBook[Math.round(Math.random() * topBook.length)].images
            : ''
        "
      />
    </div>
    <div class="intro-item">
      <div class="van-multi-ellipsis--l2">
        {{ topBook[0] ? topBook[0].name + " ： " + topBook[0].intro : "" }}
      </div>
      <!-- <span class="span-item">11111</span> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopBook',
  props: {
    topBook: {
      type: [Object, Array],
      required: true
    }
  }

}
</script>

<style lang="scss" scoped>
.top-book {
  display: flex;
  // justify-content: space-between;
  box-sizing: border-box;
  height: 480px;
  padding-top: 120px;
  background-color: rgba(102, 102, 102);
  .left {
    width: 222px;
    height: 320px;
    margin-left: 35px;
    .van-image {
      height: 100%;
      width: 100%;
    }
  }
  .intro-item {
    flex: 1;
    max-width: 324px;
    .van-multi-ellipsis--l2 {
      margin-left: 20px;
      font-size: 36px;
      color: #fff;
      font-weight: 290;
    }
    .span-item {
      // margin-top: 200px;
      // padding-top: 800px;
      background-color: red;
    }
  }
}
</style>
