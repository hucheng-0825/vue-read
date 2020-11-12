import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
import { Toast } from 'vant'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    BookCurrency: getItem('BookCurrency'),
    showPurchase: false,
    // 章节ID
    itemId: 1,
    // 书籍
    list: getItem('list'),
    bookContent: null,
    // 控制请求文章的参数
    falg: false,
    // 控制夜间模式切换
    night: false,
    // 设置字体大小
    Size: 30,
    show: 8,
    // 书架本地存储
    booklocalStorage: getItem('booklocalStorage') || []
  },
  mutations: {
    setBookCurrency (state, data) {
      if (data > 0) {
        Toast('充值成功')
        state.BookCurrency += data
        setItem('BookCurrency', state.BookCurrency)
      } else {
        Toast('购买章节成功')
        state.BookCurrency += data
        setItem('BookCurrency', state.BookCurrency)
      }
    },
    setShowPurchase (state, data) {
      state.showPurchase = data
    },
    setItem (state, data) {
      state.itemId = data
    },
    setList (state, data) {
      state.list = data
      setItem('list', state.list)
    },
    setBookContent (state, data) {
      state.bookContent = data
    },
    setFlag (state, data) {
      state.falg = data
    },
    setNight (state, data) {
      state.night = data
    },
    setSize (state, data) {
      if (data > 0 && state.Size <= 50) {
        state.Size += data
      } else if (data < 0 && state.Size >= 10) {
        state.Size += data
      }
    },
    setShow (state, data) {
      state.show = data
    },
    setbooklocalStorage (state, data) {
      state.booklocalStorage.push(data)
      setItem('booklocalStorage', state.booklocalStorage)
    }
  },
  actions: {
  },
  modules: {
  }
})
