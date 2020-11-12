<template>
  <transition name="readerslide">
    <div class="reader-container">
      <reader-content
        :bookContent="content"
        @close="showMenuPopup = $event"
        v-if="!showLeft"
      />
      <!-- 上方弹出层 -->
      <van-popup
        class="right-item"
        v-model="showMenuPopup"
        position="top"
        :style="{ height: '8%' }"
        :overlay="false"
      >
        <van-nav-bar left-arrow @click-left="closePupop">
          <template #right>
            <i class="iconfont icon-xiazai"></i>
            <i class="iconfont icon-shuqian"></i>
            <van-icon name="ellipsis" @click="ellipsis = !ellipsis" />
          </template>
        </van-nav-bar>
        <div class="serch-item" v-if="ellipsis">
          <div class="search-item1" @click="$router.push('/search')">
            <van-icon name="search" /><span>搜索</span>
          </div>
          <div class="search-item2" @click="bookDetails">
            <van-icon name="label-o" /><span>书籍详情</span>
          </div>
        </div>
      </van-popup>
      <!-- 下方弹出层 -->
      <van-popup
        v-model="showMenuPopup"
        position="bottom"
        :style="{ height: `${show}%` }"
        :overlay="false"
      >
        <reader-menu :bookId="list.id" @showcatalog="showLeft = true" />
      </van-popup>
      <!-- 目录弹出层 -->
      <van-popup
        v-model="showLeft"
        position="left"
        :style="{ height: '100%', width: '90%' }"
      >
        <book-catalog
          :itemId="list.id"
          @closeCatalog="closeCatalog"
          v-if="showLeft"
        />
      </van-popup>

      <!-- 购买章节弹出层 -->
      <van-popup
        class="pruchase-item"
        v-model="showPurchase"
        position="bottom"
        :overlay="false"
        :close-on-click-overlay="false"
        :style="{ height: '60%' }"
      >
        <book-purchase :bookId="list.id" />
      </van-popup>
      <!-- 进度条区域 -->
    </div>
  </transition>
</template>

<script>
import ReaderContent from '@/views/bookrack/components/reader/ReaderContent'
import ReaderMenu from '@/views/bookrack/components/reader/ReaderMenu'
import BookCatalog from '@/views/bookrack/components/BookListItem.vue'
import BookPurchase from '@/views/bookrack/components/BookPurchase.vue'
import { mapState } from 'vuex'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'BookRead',
  data () {
    return {
      content: null,
      showMenuPopup: false,
      showLeft: false,
      ellipsis: false
    }
  },
  watch: {
    showMenuPopup () {
      if (this.showMenuPopup === false) {
        this.$store.commit('setShow', 8)
        this.ellipsis = false
      }
    }
  },
  created () {
    this.getBook()
  },
  components: {
    ReaderContent,
    ReaderMenu,
    BookCatalog,
    BookPurchase
  },
  computed: {
    ...mapState(['showPurchase', 'list', 'falg', 'bookContent', 'night', 'show'])
  },
  methods: {
    // 获取指定书籍类容
    async getBook () {
      if (this.falg) {
        var bookid = this.bookContent.id
        setItem(`${this.bookContent.bookName}`, this.bookContent.id)
        this.$store.commit('setFlag', false)
      } else {
        bookid = getItem(`${this.list.name}`) || 1
      }
      try {
        const { data } = await this.$axios.get('http://127.0.0.1:3333/book', {
          params: { book: this.list.id, id: bookid }
        })
        console.log(data)
        if (data.err === 0) {
          this.$store.commit('setShowPurchase', true)
          this.$store.commit('setItem', data.id)
          setItem(`${data.bookName}`, data.id)
        } else if (data.err === 1) {
          this.$store.commit('setShowPurchase', false)
        }
        this.content = data
        this.$store.commit('setBookContent', this.content)
      } catch (e) {
        this.$toast('获取文章失败')
      }
    },
    // 返回书架
    closePupop () {
      this.$router.back()
      this.$store.commit('setShowPurchase', false)
    },
    closeCatalog () {
      this.getBook()
      // this.$store.commit('setFlag', false)
      this.showLeft = false
      this.showMenuPopup = false
    },
    // 查询书籍详情
    bookDetails () {
      this.$router.push('/bookdetails/' + this.list.id)
    }
  }

}
</script>

<style lang="scss" scoped>
.reader-container {
  .pruchase-item {
    border-top: 2px solid red;
  }
  ::v-deep .van-nav-bar__left {
    .van-icon {
      font-size: 50px;
      color: #ccc;
    }
  }
  .right-item {
    position: relative;
    .serch-item {
      position: fixed;
      right: 30px;
      top: 95px;
      width: 230px;
      height: 160px;
      background-color: #fff;
      border: 1px solid #ccc;
      z-index: 3333;
      font-size: 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 80px;
      border-radius: 10px;
      box-sizing: border-box;
      .search-item1 {
        padding-left: 20px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ccc;
      }
      .search-item2 {
        padding-left: 20px;
        display: flex;
        align-items: center;
      }
      span {
        margin-left: 10px;
        font-size: 28px;
      }
    }
    ::v-deep .van-nav-bar__right {
      font-size: 50px;
      .van-icon-ellipsis {
        padding-left: 20px;
        color: #ccc;
        font-weight: 700;
      }
      .iconfont {
        padding-left: 20px;
        font-size: 50px;
        color: #ccc;
      }
    }
  }
}
.readerslide-enter-active {
  transition-duration: 0.5s;
}
.readerslide-enter {
  transform: translate3d(100vw, 0, 0);
}
.reader-container {
  position: relative;
}
</style>
