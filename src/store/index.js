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
    bookContent: null
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
    }
  },
  actions: {
  },
  modules: {
  }
})
