<template>
  <div class="ChannelList-container">
    <!-- 频道列表  -->
    <van-nav-bar
    class="ChannelList-header"
    title="全部列表"
    >
      <template #right>
        <van-icon
        name="cross"
        @click="$emit('close',false)"
        />
      </template>
    </van-nav-bar>
    <van-cell  class="ChannelList-cell" >
      <template #title>
        <span v-if="isbtn===false">切换频道</span>
        <span v-else>拖动排序</span>
      </template>
      <template #default>
        <van-button
        type="default"
        round
        size="small"
        class="ChannelList-btn"
        v-if="isbtn===false"
        @click="handleDragle">
          编辑
        </van-button>
        <van-button
        type="default"
        round
        size="small"
        class="ChannelList-btn"
        v-else
        @click="handleWancheng">
          完成
        </van-button>
      </template>
    </van-cell>
   <!-- 标签页区域  -->
    <div class="ChannelList-tag">
      <draggable
      :disabled="drag"
      :sort= "true"
      v-model="myChannel"
      chosenClass="chosen"
      group="name"
      animation="300"
      @start="startEvent"
      @end="endEvent">
        <transition-group>
          <span
          class="ChannelList-item"
          :class="{active:index===active,shaky:isAnimationShow}"
          v-for="(element,index) in myChannel"
          :key="index"
          @click="handle(index)"
          >
            {{element}}
            <van-icon
            name="clear"
            class="item-cha"
            v-if="index!==0&isbtn==true"
            />
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
      <span
      class="ChannelList-lowItem"
      v-for="(value,index) in recommendChannels"
      :key="index"
      @click="handleAdd(value)">
        <div class="value">
          <van-icon name="plus" class="jiahao" />
          <span>{{value}}</span>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { setItem } from '@/public/localStorage.js'
export default {
  name: 'ChannelList',
  props: {
    myChannel: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  components: {
    draggable
  },

  data () {
    return {
      // 控制按钮显示完成和编辑的,上面的
      isbtn: false,

      // 控制拖拽
      drag: true,
      // 所有的频道
      allChannels: [],
      isAnimationShow: true
    }
  },
  created () {
    // console.log(this.someList)
    // this.allChannels = this.someList

    // this.allChannels = this.someList
    // console.log(this.someList)
    this.getAllChannel()
  },
  computed: {
    recommendChannels () {
      return this.allChannels.filter(channel => {
        return !this.myChannel.find(myChannel => {
          return myChannel === channel
        })
      })
    }
  },
  methods: {
    async getAllChannel () {
      const { data } = await this.$axios.get('http://localhost:8080/allchannels')
      this.allChannels = data
    },
    handle (index) {
      if (this.isbtn) {
        // 为true时，单击删除
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true)
        }
        this.myChannel.splice(index, 1)
      } else {
        // 为false时，单击跳转
        this.$emit('update-active', index, false)
      }
      setItem('CHANNELS', this.myChannel)
    },
    handleAdd (channel) {
      this.myChannel.push(channel)
      setItem('CHANNELS', this.myChannel)
    },
    // 点击编辑开始拖拽
    handleDragle () {
      this.isbtn = true
      this.drag = false
      this.isAnimationShow = false
    },
    // 点击完成结束
    handleWancheng () {
      this.isbtn = false
      this.drag = true
      this.isAnimationShow = true
    },
    startEvent (value) {
      // console.log(value.path[0].children)
      value.path[0].children.forEach(item => {
        item.classList.remove('shaky')
      })
    },
    endEvent (value) {
      console.log(7788120)
      value.path[0].children.forEach(item => {
        item.classList.add('shaky')
      })
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
    .active {
      color: #f85959;
      border: 1px solid #f85959;
    }
    // .lived{
    //   color: #f85959;
    //   border: 1px solid #f85959;
    // }
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
 // 元素摆动的动画
 .shaky {
        // display: inline-block;
        // padding: 1px;
        // font-size: 12px;
        -webkit-transform-origin: center center;
        -ms-transform-origin: center center;
        transform-origin: center center;
        -webkit-animation-name: shaky-slow;
        -ms-animation-name: shaky-slow;
        animation-name: shaky-slow;
        -webkit-animation-duration: 1s;
        -ms-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-iteration-count:1 ;
        -ms-animation-iteration-count: 1;
        animation-iteration-count: 1;
        -webkit-animation-timing-function: ease-in-out;
        -ms-animation-timing-function: ease-in-out;
        animation-timing-function: ease-in-out;
        -webkit-animation-delay: 0s;
        -ms-animation-delay: 0s;
        animation-delay: 0s;
        -webkit-animation-play-state: running;
        -ms-animation-play-state: running;
        animation-play-state: running;
    }
    @keyframes shaky-slow {
        0% {
            -webkit-transform:  rotate(10deg);
        }
        25% {
            -webkit-transform:  rotate(-10deg);
        }
        50% {
            -webkit-transform:  rotate(10deg);
        }
        75% {
            -webkit-transform:  rotate(-10deg);
        }
        100% {
            -webkit-transform:  rotate(0deg);
        }
    }
}
</style>
