<template>
  <div
    @click="handle"
    class="reader-content-box"
    :class="night ? 'night' : ''"
    ref="readerview"
  >
    <h3 class="reader-title" :style="{ fontSize: Size + 'px' }">
      {{ content ? content.title : bookContent.title }}
    </h3>
    <p
      class="reader-content"
      :style="{ fontSize: Size - 15 + 'px' }"
      v-html="content ? content.content : bookContent.content"
    ></p>
    <van-button type="default" color="#ccc" @click.stop="NextChapter"
      >下一章</van-button
    >
  </div>
</template>
<script >
import { setItem, getItem } from '@/utils/storage'
import { mapState } from 'vuex'
export default {
  name: 'ReaderContent',

  data () {
    return {
      content: null,
      // 控制显示与隐藏
      isShow: false
    }
  },
  created () {
    console.log(this.bookContent)
  },
  computed: {
    ...mapState(['list', 'bookContent', 'night', 'Size'])
  },
  methods: {
    async NextChapter (item) {
      try {
        const { data } = await this.$axios.get('http://127.0.0.1:3333/book', {
          params: { book: this.list.id, id: getItem(`${this.bookContent.bookName}`) + 1 || 1 + this.bookContent.id }
        })
        console.log(data)
        if (data.err === 0) {
          this.$store.commit('setShowPurchase', true)
          this.$store.commit('setItem', data.id)
        }
        this.content = data
        setItem(`${data.bookName}`, data.id)
        this.$refs.readerview.scrollTop = 0
      } catch (e) {
        this.$toast('获取文章失败')
      }
    },

    handle () {
      this.isShow = !this.isShow
      this.$emit('close', this.isShow)
    }
  }

}
</script>
<style lang="scss" scoped>
.night {
  background-color: #555;
  color: #fff;
}
.reader-content-box {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
  padding: 15px 0;
  max-width: 900px;
  margin: 0 auto;
  .van-button {
    margin-left: 300px;
    border-radius: 10px;
  }
}
.reader-content {
  font-size: 32px;
  line-height: 3;
  margin: 0 25px;
  text-indent: 2em;
  word-break: break-all;
}
.reader-title {
  text-align: center;
  font-size: 60px;
  font-weight: 290;
  // line-height: 31px;
  margin-top: 120px;
}
</style>
