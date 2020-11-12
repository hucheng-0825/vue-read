<template>
  <div class="bulk-container">
    <van-nav-bar
      title="批量购买"
      right-text="全选"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <!-- 章节列表 -->
    <div class="catalog-item">
      <van-checkbox-group v-model="result" ref="checkboxGroup">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in list"
            clickable
            :key="item.id"
            :title="` ${item.title}`"
            @click="toggle(index, item.err)"
          >
            <template #right-icon>
              <van-checkbox :name="item" ref="checkboxes" checked-color="red" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </div>
    <!-- 购买章节区域 -->
    <div class="footer">
      <div class="box1">已选：{{ result.length }}章节</div>
      <div class="box">
        <span>价格：{{ result.length * 10 }} 春卷</span>
        <span>余额：{{ BookCurrency }} 春卷</span>
      </div>
      <van-button
        @click="PurchaseBTN"
        type="default"
        round
        :color="result.length !== 0 ? 'red' : '#ccc'"
        >{{ result.length !== 0 ? "购买" : "请选择购买章节" }}</van-button
      >
    </div>
    <!-- 支付模块 -->
    <van-popup
      v-model="showBulk"
      position="bottom"
      :style="{ height: '35%' }"
      class="popup-item"
    >
      <div class="popup-box">已选：{{ result.length }} 章</div>
      <div class="popup-box1">
        <span>价格：{{ result.length * 10 }} 春卷</span>
        <span>余额：{{ BookCurrency }} 春卷</span>
      </div>
      <div class="popup-box2">
        <p>余额不足，请充值并购买</p>
      </div>
      <ul class="ul-item">
        <li @click="$store.commit('setBookCurrency', 100)">
          <span>1元</span>
          <span>100春卷</span>
        </li>
        <li @click="$store.commit('setBookCurrency', 600)">
          <span>6元</span><span>600春卷</span>
        </li>
        <li @click="$store.commit('setBookCurrency', 1500)">
          <span>12元</span><span>1500春卷</span> <i>送3元</i>
        </li>
        <li @click="$store.commit('setBookCurrency', 3500)">
          <span>30元</span><span>3500春卷</span> <i>送5元</i>
        </li>
      </ul>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'BookBulkPurchase',
  props: {
    bookId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      list: [],
      result: [],
      flag: true,
      showBulk: false
    }
  },
  watch: {
    result () {
      if (this.result.length * 10 > this.BookCurrency) {
        this.showBulk = true
      }
    },
    BookCurrency () {
      this.showBulk = false
    }
  },
  components: {},
  created () {
    this.getBook()
  },
  computed: {
    ...mapState(['BookCurrency'])
  },
  methods: {
    async getBook () {
      try {
        const { data } = await this.$axios.get('http://127.0.0.1:3333/bookchapter', {
          params: { book: this.bookId }
        })
        this.list = []
        data.forEach(v => {
          if (v.err === 0) {
            this.list.push(v)
          }
        })
      } catch (e) {
        this.$toast('获取章节失败')
      }
    },
    onClickLeft () {
      this.$router.back()
    },
    // 全选反选
    onClickRight () {
      if (this.flag) {
        this.$refs.checkboxGroup.toggleAll(true)
        this.flag = false
      } else {
        this.$refs.checkboxGroup.toggleAll()
        this.flag = true
      }
    },
    toggle (i, v) {
      this.$refs.checkboxes[i].toggle()
    },
    // 购买章节功能
    async PurchaseBTN () {
      if (this.result.length !== 0) {
        if (this.result.length * 10 <= this.BookCurrency) {
          const arr = []
          this.result.forEach(v => {
            arr.push(v.id)
          })
          const data = { id: arr, book: this.bookId * 1, status: 1 }
          try {
            await this.$axios.post('http://127.0.0.1:3333/bookbulkupdate', data)
            this.$store.commit('setBookCurrency', -this.result.length * 10)
            this.result = []
            this.getBook()
          } catch (e) {
            this.$toast('购买失败')
          }
        } else {
          this.$toast('余额不足，请先充值')
        }
      } else {
        this.$toast('请选择需要购买的章节')
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.bulk-container {
  ::v-deep .van-nav-bar {
    border-bottom: 1px solid #ccc;
    .van-icon {
      color: #ccc;
      font-size: 50px;
    }
    .van-nav-bar__text {
      color: #000;
      font-size: 30px;
    }
    .van-nav-bar__title {
      font-size: 35px;
    }
  }
  .catalog-item {
    position: fixed;
    left: 0;
    right: 0;
    top: 94px;
    bottom: 300px;
    overflow-y: auto;
    ::v-deep .van-cell {
      .van-checkbox {
        color: #ccc;
      }
    }
  }
  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 290px;
    border-top: 1px solid #ccc;
    text-align: center;
    .box {
      font-size: 22px;
      margin-top: 40px;
      span {
        margin-right: 50px;
        color: red;
        &:last-child {
          margin-left: 50px;
          color: unset;
        }
      }
    }
    .box1 {
      font-size: 30px;
      margin-top: 30px;
    }
    .van-button--default {
      width: 648px;
      height: 82px;
      margin-top: 30px;
    }
  }
  .popup-item {
    text-align: center;
    .popup-box {
      font-size: 32px;
      margin: 40px 0;
    }
    .popup-box1 {
      font-size: 25px;
      span {
        margin-right: 30px;
        color: red;
        &:last-child {
          margin-left: 30px;
          color: unset;
        }
      }
    }
    .popup-box2 {
      position: relative;
      margin-top: 70px;
      font-size: 25px;
      border-bottom: 2px solid #ccc;
      p {
        position: absolute;
        left: 50%;
        top: -45px;
        transform: translateX(-50%);
        z-index: 999;
        background-color: #fff;
        padding: 0 20px;
      }
    }
    .ul-item {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      height: 220px;
      justify-content: space-evenly;
      align-items: center;
      font-size: 25px;
      li {
        display: flex;
        position: relative;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px solid #ccc;
        border-radius: 16px;
        height: 150px;
        width: 20%;
        span {
          &:first-child {
            margin-bottom: 10px;
          }
          &:nth-child(2) {
            color: #999;
          }
        }
        i {
          position: absolute;
          top: 0;
          right: 5px;
          font-style: normal;
          color: #999;
        }
      }
    }
  }
}
</style>
