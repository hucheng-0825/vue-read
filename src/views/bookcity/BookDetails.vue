import { removeItem } from '@/public/localStorage.js';
<template>
  <div class="BookDetails-contaniner" >
    <!-- 头部区域  -->
 <van-nav-bar
 class="BookDetails-header "
 :class="isNum>0?'biankuang':''"
  left-arrow
  @click-left="onClickLeft"
>
  <template #title>
    <span :class="isNum>0?'':'isNoShow'">书籍详细</span>
    <!-- <div class="biankuang"></div> -->
  </template>
 </van-nav-bar>

<div class="BookDetails-main" ref="bookdetails" @scroll="gundong">
<div class="BookDetails-main-top">
  <div class="BookDetails-main-top-left">
    <van-image class="left-img" :src="value.images" />
  </div>
  <div class="BookDetails-main-top-right">
    <div class="right-one margin-left">{{value.name}}</div>
    <div class="right-two margin-left">
      <van-rate v-model="value.ratings"  disabled />
      <span class="fenshu"> {{value.ratings}}</span>
    </div>
    <div class="right-three margin-left">
      <span>{{value.author}}</span> | <span>{{value.type}}</span>
    </div>
    <div class="right-four margin-left">
      <span>5春卷/千字</span>  <span class="four-padding">{{value.wordcount +"万字"}}</span>
    </div>

  </div>
</div>
<div class="BookDetails-main-bottom">

  <span class="bottom-span geshi" ref="wanwan">{{chulichange}}
    <span v-if="isArrowShow">
      <van-icon class="jiantou" name="arrow-down" v-if="isShow" @click="handleUp" />
  <van-icon   class="jiantou" name="arrow-up" v-else @click="handleLower" />
    </span>

  </span>

</div>
  <!-- 这是小说更新状态的区域  -->

  <van-cell class="BookDetails-main-cell"  is-link >
    <template #title>
      <span class="span-one">目录</span>
      <span class="span-two">5月4日20:00更新至1400章 王权富贵</span>
      <span class="span-three">{{value.serialize}}</span>
    </template>

  </van-cell>
  <div class="kongzhibai"></div>
  <!-- 子组件，推荐书区域  -->
  <introduce-book @close="handleAllChange($event)" :kongzhidianji="kongzhidianji"></introduce-book>
  <div class="kongzhibai"></div>
  <author-other :dianji="dianji" @close="handleChange($event)"></author-other>
  <div class="kongzhibai"></div>
  <div class="BookInformation">
    <span class="span-one">
      书籍信息
    </span>
    <span class="span-two">版权:跃文集团旗下创世中文网</span>
    <span class="span-two">本书由春暖阅读电子版制作与发行</span>
    <span class="span-two">版权所有·侵权必究</span>
  </div>
</div>
<!-- 底部的  -->
<div class="BookDetails-footer" active-color="#fff">
  <div class="footer-item felx">下载</div>
  <div class="footer-item red ">免费试读</div>
  <div class="footer-item felx">加入书架</div>

</div>
  </div>
</template>

<script>
import AuthorOther from './AuthorOther'
import IntroduceBook from './IntroduceBook'
export default {
  name: 'BookDetails',
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  components: {
    IntroduceBook,
    AuthorOther
  },
  created () {
    // this.push({name:'jsajjaf',query:value})
    // this.value = this.$route.params
    this.getBookDetails()
  },
  data () {
    return {
      value: '',
      // 控制箭头的上下方向,true为下,false为上
      isShow: true,
      isArrowShow: true,
      isNum: '',
      dianji: false,
      kongzhidianji: false,
      histo: 999
    }
  },
  mounted () {
    // this.handleIsArrowShow()
  },
  methods: {
    // 通过书籍ID获取书籍详情
    async getBookDetails () {
      const { data } = await this.$axios.get('http://127.0.0.1:3333/booklist', { params: { id: this.id } })
      // console.log(this.id)
      this.value = data
      // console.log(data)
    },
    //  点击nav左侧的返回箭头
    onClickLeft () {
      // console.log('我要回去')
      // console.log(this.histo)
      this.$router.push({ name: window.sessionStorage.getItem('name') })
    },
    handleUp () {
      this.isShow = false
      this.$refs.wanwan.classList.remove('geshi')
    },
    handleLower () {
      this.isShow = true
      this.$refs.wanwan.classList.add('geshi')
    },
    // 控制箭头的显示，如果少于三行，则隐藏
    handleIsArrowShow () {
      if (this.value.intro.length < 70) {
        this.isArrowShow = false
      } else {
        this.isArrowShow = true
      }
    },
    gundong (value) {
      this.isNum = value.target.scrollTop
      // console.log(value.target.scrollTop)
    },
    // 子组件传过来的事件和参数
    handleChange (item) {
      this.value = item
      this.handleIsArrowShow()
      this.kongzhidianji = !this.kongzhidianji
    },
    handleAllChange (item) {
      location.assign(location.href.slice(0, 36) + item.id)
      this.value = item
      this.handleIsArrowShow()

      this.dianji = !this.dianji
    }
  },
  computed: {
    chulichange () {
      if (this.value instanceof Object) {
        this.handleIsArrowShow()
        if (this.isShow && this.isArrowShow) {
          if (this.value.intro.length >= 70) {
            return this.value.intro.slice(0, 70) + '...'
          } else {
            return this.value.intro
          }
        }
      }
      // console.log('我在最后')
      return this.value.intro
    }
  },
  beforeRouteEnter (to, from, next) {
    // console.log(to)
    // console.log(from)
    // console.log(this)
    next(vm => {
      // console.log(to)
      // console.log(from)
      if (from.name === 'BookCity' || from.name === 'SecondarySort') {
        // console.log('我的')
        vm.histo = from.name
        window.sessionStorage.setItem('name', from.name)
        // console.log(852)
      }
      // console.log(to)
      // console.log(from)
      // console.log(vm.histo)
    })
  }
}
</script>

<style lang="scss" scoped>
::v-deep.BookDetails-contaniner{
  // background-color: #ccc;

 .BookDetails-header{
   height: 74px;
   position: relative;
   .van-icon{
     color: #ccc;
     font-size: 40px;
   }
   .isNoShow{
     visibility: hidden;
   }

 }

 // 去掉nav的底部的边框
 .BookDetails-header::after{
   border-bottom-width: 0;

 }
 .biankuang::after{
   border-bottom: 4px solid #ccc;
  //  border-bottom-width: 3px !important;
 }
//  中间区域
.BookDetails-main{
  width: 100%;
  top: 74px;
  bottom: 95px;
  overflow-y: auto;
  overflow-x: hidden;
  position: fixed;
  // height: 450px;
  // background-color: hotpink;
  // 上边区域
  .BookDetails-main-top{
    display: flex;
    height: 290px;
    // background-color: #ff6666;
    .BookDetails-main-top-left{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 230px;
      height: 100%;
      // background-color: orange;
      .left-img{
        width: 186px;
        height: 250px;
      }
    }
    .BookDetails-main-top-right{

      // 右边控制所有的margin-left
      .margin-left{
 margin-left: 17px;
      }
      .right-one{
        margin-top: 22px;
        font-size: 35px;

      }
      .right-two{
        margin-top: -5px;
              .van-rate__item{
                .van-icon{
                  font-size: 20px;
                }
              }
              .fenshu{
                padding-left: 8px;
                font-size: 22px;
              }
      }
      .right-three{
        margin-top: 15px;
        font-size: 25px;
      }
      .right-four{
        margin-top: 15px;
        font-size: 25px;
        .four-padding{
          padding-left: 5px;
        }
      }
    }
  }
  // 下边区域
  .BookDetails-main-bottom{
    // span中的样式s
    .bottom-span{
      padding-left: 25px;
 font-size: 28px;
display: -webkit-box; -webkit-box-orient: vertical;
    }
    .geshi{
  -webkit-line-clamp: 3; overflow: hidden;
    }
    // 这是两个箭头的样式
    .jiantou{
      // float: right;
      font-size: 30px;
    }

  }
  .BookDetails-main-cell{
    position: relative;
    height: 92px;
    // margin-bottom: 15px;
    // border-bottom: 16px solid #ccc;
    .span-one{
      font-size: 30px;
      font-weight: 500;
      color: #2a2a2a;
      padding-right: 30px;
    }
    .span-two{
      font-size: 25px;
      color: #797979;
    }
    .span-three{
      margin-left: 80px;
      font-size: 25px;
      color: #797979;
    }
    .van-icon{
      position: absolute;
      right: 15px;
    }
  }
  .BookDetails-main-cell::after{
    display: block;
    position: absolute;
    top: 0;
    content: "";
    width: 100%;
    height: 2px;
    background-color: #cccc;
  }
  .BookDetails-main-cell::before{
    display: block;
    position: absolute;
    bottom: 0;
    content: "";
    width: 100%;
    height: 2px;
    background-color: #cccc;
  }
  .kongzhibai{
    width: 100%;
    height: 16px;
    background-color: #f3f3f3;
  }
  .BookInformation{
    display: flex;
    flex-direction: column;
    height: 250px;
    .span-one{
        font-size: 35px;
        color: #1e1e1e;
        font-weight: 600;
        padding-top: 25px;
        padding-left: 28px;
        padding-bottom: 30px;

    }
    .span-two{
      font-size: 25px;
      padding-left: 28px;
      padding-bottom: 15px;
      color: #969398;

    }
  }
}
//  底部区域的
 .BookDetails-footer{
   background-color: #fff;
   left: 0;
   bottom: 0;
  width: 100%;
   position: fixed;
   display: flex;
   height: 95px;
   .felx{
     flex: 1;
   }
   .footer-item{
     display: flex;
     justify-content: center;
     align-items: center;

    font-size: 30px;
    color: #1e1e1e;

   }
   .red{

     width: 330px;
     background-color: #ff6666;
      .van-tabbar-item__text{
     color: #fff !important;

   }
   }

 }
 .BookDetails-footer::after{
   display: block;
   content: '';
   position: absolute;
   top: 0;
   width: 100%;
   height: 1px;
   background-color: #cccccc;
 }

}
</style>
