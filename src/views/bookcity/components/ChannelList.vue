<template>
  <div class="ChannelList-container">
    <!-- 频道列表  -->
    <van-nav-bar
    class="ChannelList-header"
  title="全部列表"

>
 <template #right>
   <van-icon name="cross" @click="$emit('close',false)" />
 </template>
</van-nav-bar>
<van-cell  class="ChannelList-cell" >
    <template #title>
      <span v-if="isbtn===false">切换频道</span>
      <span v-else>拖动排序</span>
    </template>
    <template #default>
      <van-button type="default" round  size="small" class="ChannelList-btn" v-if="isbtn===false" @click="handleDragle">编辑</van-button>
      <van-button type="default" round  size="small" class="ChannelList-btn" v-else @click="handleWancheng">完成</van-button>
    </template>
</van-cell>
   <!-- 标签页区域  -->
<div class="ChannelList-tag">
  <draggable :disabled="drag" :sort= "true" v-model="upList" chosenClass="chosen" group="name" >
   <transition-group>
     <span class="ChannelList-item" :class="index==0?'lived':''" v-for="(element,index) in upList" :key="index">
       {{element}}<van-icon name="clear" class="item-cha" v-if="index!==0&isbtn==true"  @click="shanchu(element)"/>
       </span>
    </transition-group>
</draggable>
</div>
  <!-- 下面的cell区域  -->
  <van-cell  class="ChannelList-cell" >
    <template #title>
      <span >点击添加更多频道</span>

    </template>

</van-cell>
 <!-- 下面的tag的区域  -->
 <div class="ChannelList-lowTag">
   <span class="ChannelList-lowItem" v-for="(value,index) in lowerList" :key="index" @click="handleAdd(value)">
     <div class="value"><van-icon name="plus" class="jiahao" />

  <span>{{value}}</span></div>

     </span>
 </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'ChannelList',
  props: ['someList', 'list'],
  components: {
    draggable
  },

  data () {
    return {
      // 控制按钮显示完成和编辑的,上面的
      isbtn: false,

      // 控制拖拽
      drag: true,
      // 上面的数组,tag上面的
      upList: [],
      // 这是下面的tag数组
      lowerList: []

    }
  },
  mounted () {
    // console.log(this.someList)
    // this.upList = this.someList
    this.handlediaoyong()
  },
  watch: {

  },
  methods: {

    // 点击编辑开始拖拽
    handleDragle () {
      this.isbtn = true
      this.drag = false
    },
    // 点击完成结束
    handleWancheng () {
      this.isbtn = false
      this.drag = true
    },
    // 处理下面的编辑，开始添加
    handleLower () {
      this.lowerBtn = true
    },
    // 处理下面的,让整个数组进行遍历，得到剩下的

    handlediaoyong () {
      this.upList = this.someList
      this.list.forEach(value => {
        if (this.upList.indexOf(value) === -1) {
          this.lowerList.push(value)
          // console.log(852)
        }
      })
    },
    // 点击下面的加号后，添加进入
    handleAdd (value) {
      this.upList.push(value)
      this.lowerList = this.lowerList.filter(item => {
        return item !== value
      })
    },
    // 点击X号删除
    shanchu (value) {
      this.upList = this.upList.filter(item => {
        return item !== value
      })
      this.lowerList.push(value)
    }

  }
}
</script>

<style lang="scss" scoped>
::v-deep.ChannelList-container{
 .ChannelList-header{
  .van-nav-bar__title{
    color: #4f4e4d;

  }
  .van-nav-bar__right{
    .van-icon-cross{
    color: #9e9e9e;
    font-size: 40px;
  }
  }

 }
 // nav的下边框取消
 .van-hairline--bottom::after{
    border-bottom-width: 0;
  }
  //切换频道和编辑区域
  .ChannelList-cell{
    margin-bottom: 15px;
    .van-cell__title{
      display: flex;
      align-items: center;
    }
    .ChannelList-btn{
          width: 1.38667rem;
    height: .64rem;
    font-size: .34667rem;
    color: #f85959;
    border: .01333rem solid #f85959
    }
  }
  // cell的下边框取消
  .ChannelList-cell::after{
    border: 0;
  }
  .ChannelList-tag{
    .ChannelList-item{
      position: relative;
      display: inline-block;
      text-align: center;
      line-height: 55px;
      font-size: 30px;
      padding: 5px 45px;
      border-radius: 50px;
      margin: 10px 10px;
      color: #3d3828;

            border: solid 1px #dcdcdc;

            cursor: move;
            // 这个是上面的tag中的X的定位
            .item-cha{
              position: absolute;
              right: 0px;
              top: 2px;
              color: #cccccc;
              font-size: 35px;
            }
    }
    .lived{
      color: #f85959;
      border: 1px solid #f85959;
    }
    // 被选中的样式
    .chosen {
            border: solid 1px hotpink !important;
        }
  }
  // 下面的tag样式
  .ChannelList-lowItem{
     display: inline-block;
      text-align: center;
      line-height: 55px;
      font-size: 30px;
      padding: 5px 30px;
      border-radius: 50px;
      margin: 10px 10px;
      color: #3d3828;

            border: solid 1px #dcdcdc;

            cursor: move;
            .value{
              display: flex;
              align-items: center;
              .jiahao{
                padding-right: 10px;
              }
            }

  }
}
</style>
