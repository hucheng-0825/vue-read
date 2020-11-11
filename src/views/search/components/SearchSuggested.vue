<template>
  <div class="suggested-container">
    <van-cell
      icon="search"
      v-for="item in bookList"
      :key="item.id"
      @click="$router.push(`/bookdetails/${item.id}`)"
    >
    <template #title>
        <div v-html="hightLight(item.name)"></div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggested',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      bookList: []
    }
  },
  methods: {
    async getSuggested (name) {
      // console.log(name)
      const { data } = await this.$axios.get('http://127.0.0.1:3333/bookselect', { params: { name: name } })
      // console.log(data)
      this.bookList = data
      // console.log(this.bookList)
    },
    hightLight (text) {
      // console.log(text)
      const hightLightStr = `<span class="active">${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, hightLightStr)
    }
  },
  watch: {
    searchText: {
      handler: debounce(function (value) {
        this.getSuggested(value)
        // console.log(value)
      }, 500),
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .suggested-container{
    ::v-deep .active {
      color: red;
    }
  }
</style>
