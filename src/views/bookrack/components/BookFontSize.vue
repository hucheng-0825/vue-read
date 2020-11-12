<template>
  <div class="booksize-item">
    <!-- <div class="box1"><span>亮度</span><van-progress :percentage="50" /></div> -->
    <div class="box2">
      <span class="size">字号</span>
      <span class="btn-item">
        <span>12</span>
        <span>123</span>
        <span>123</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookFontSize'

}
</script>

<style lang="scss" scoped>
.booksize-item {
  color: #ccc;
  // .box1 {
  //   display: flex;
  //   // justify-content: center;
  //   align-items: center;
  //   margin-top: 40px;
  //   width: 100%;
  //   span {
  //     margin-right: 50px;
  //   }
  // }
  .box2 {
    height: 120px;
    line-height: 120px;
    padding-left: 40px;
    .size {
      font-size: 30px;
    }
    .btn-item {
      // display: flex;
      font-size: 80px;
      width: 400px;
      border: 1px solid #ccc;
      margin-left: 20px;
    }
  }
}
</style>
