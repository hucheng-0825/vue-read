<template>
  <div class="book-classification">
<!-- 头部导航栏 -->
    <van-nav-bar class="headbar" title="全部分类" left-arrow   @click-left="onClickLeft"
  @click-right="onClickRight">
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
<!-- ———————————————————————————————————————————— -->
<!-- —————————————————男生分区——————————————————— -->
  <div class="man">
    <van-icon
     name="friends-o"/>
     <span class="sexone">男生</span>
  </div>
  <div class="manlist">
    <van-grid :border="false" :column-num="3">
      <van-grid-item class="vgrid"  :key="index" v-for="(value,index) in booknameone"  :text="value.num" @click="$router.push({name:'SecondarySort',params:value})">
        <template #icon>
              <span class="objectname">{{value.title}}</span>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
<!-- ———————————————————————————————————————————— -->
<!-- —————————————————女生分区——————————————————— -->
  <div class="woman">
    <van-icon
     name="friends-o"/>
     <span class="sexone">女生</span>
  </div>
  <div class="manlist">
    <van-grid :border="false" :column-num="3" >
      <van-grid-item class="vgrid" :key="index" v-for="(value,index) in booknametwo"  :text="value.num" @click="$router.push({name:'SecondarySort',params:value})">
        <template #icon>
              <span class="objectname">{{value.title}}</span>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
<!-- ———————————————————————————————————————————— -->

<!-- 搜索弹出层 -->

<!-- ———————————————————————————————————————————— -->
  </div>
</template>

<script>

export default {
  name: 'PrimarySort',
  components: {},
  props: {},
  data () {
    return {
      show: false,
      booknameone: [{ title: '玄幻', num: '共191443册' },
        { title: '奇幻', num: '共191443册' }, { title: '武侠', num: '共191443册' }, { title: '仙侠', num: '共191443册' }, { title: '都市', num: '共191443册' }, { title: '职场', num: '共191443册' }, { title: '历史', num: '共191443册' }, { title: '军事', num: '共191443册' }, { title: '游戏', num: '共191443册' }, { title: '体育', num: '共191443册' }, { title: '科幻', num: '共191443册' }, { title: '灵异', num: '共191443册' }, { title: '二次元', num: '共191443册' }, { title: '短篇', num: '共191443册' }
      ],
      booknametwo: [{ title: '古代言情', num: '共191443册' }, { title: '现代言情', num: '共191443册' }, { title: '玄幻言情', num: '共191443册' }, { title: '仙侠奇缘', num: '共191443册' }, { title: '浪漫清楚', num: '共191443册' }, { title: '游戏竞技', num: '共191443册' }, { title: '科幻空间', num: '共191443册' }, { title: '玄幻灵异', num: '共191443册' }, { title: '同人小说', num: '共191443册' }]
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    onClickRight () {
      this.show = true
    }
  }
}
</script>

<style lang="scss" scoped>
 ::v-deep.book-classification{
   .van-nav-bar{
     border-bottom: 1px solid gray;
   }
   .van-icon{
     color:gray
   }
   .man{
     display: flex;
     padding-top: 10px;
     .van-icon-friends-o::before{
       margin-left: 30px;
       color:#359aff
     }
     .sexone{
       margin-top: 6px;
       font-size: 12px;

     }
   }
      .woman{
     display: flex;
     padding-top: 10px;
     .van-icon-friends-o::before{
       margin-left: 30px;
       color:#fe8fb4
     }
     .sexone{
       margin-top: 6px;
       font-size: 12px;
     }
   }
   .objectname{
     font-size: 28px;
   }
  .vgrid{
    .van-grid-item__text{
      color:gray
    }
  }
 }
</style>
