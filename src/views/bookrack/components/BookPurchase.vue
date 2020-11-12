<template>
  <div class="purchase-container">
    <p>需要购买后阅读！</p>
    <div class="box">
      <span>本节价格：10 春卷</span>
      <span>余额：{{ BookCurrency }} 春卷</span>
    </div>
    <van-button type="danger" round @click="buyBook">购买本章</van-button>
    <div class="box-item" @click="$router.push('/bookbulkpurchase/' + bookId)">
      批量购买章节
    </div>
    <div @click="addBTN">
      <van-checkbox v-model="checked" checked-color="#ccc" icon-size="15px"
        >自动购买章节</van-checkbox
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'BookPurchase',
  props: {
    // 文章ID
    bookId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      checked: false
    }
  },
  watch: {
    showPurchase () {
      if (this.showPurchase && this.isBuy) {
        this.buyBook()
      }
    }
  },
  computed: {
    ...mapState(['BookCurrency', 'itemId', 'isBuy', 'showPurchase'])
  },
  methods: {
    // 购买章节功能
    async buyBook () {
      if (this.BookCurrency >= 10) {
        try {
          const { data } = await this.$axios.get('http://127.0.0.1:3333/bookupdate',
            { params: { book: this.bookId, id: this.itemId, status: 1 } }
          )
          // console.log(data)
          if (data.changedRows === 1) {
            this.$store.commit('setBookCurrency', -10)
            this.$store.commit('setShowPurchase', false)
          }
        } catch (e) {
          this.$toast('购买失败')
        }
      } else {
        this.$toast('余额不足，请先充值！')
      }
    },
    addBTN () {
      this.checked = !this.checked
      this.$store.commit('setIsbuy', this.checked)
    }
  }
}
</script>

<style lang="scss" scoped>
.purchase-container {
  text-align: center;
  p {
    text-align: center;
    font-weight: 300;
    font-size: 35px;
    color: #000;
  }
  .box {
    font-size: 25px;
    text-align: center;
    margin-top: 90px;
    span {
      margin-right: 30px;
      &:first-child {
        color: red;
      }
    }
  }
  .van-button--danger {
    margin-top: 30px;
    width: 482px;
    height: 82px;
    background-color: #ff6666;
  }
  .box-item {
    font-size: 25px;
    margin-top: 40px;
  }
  .van-checkbox {
    display: flex;
    justify-content: center;
    margin-top: 60px;
    font-size: 25px;
  }
}
</style>
