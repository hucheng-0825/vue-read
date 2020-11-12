<template>
  <div class="search-result">
    <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    >
      <van-cell
      v-for="item in list"
      :key="item.id"
      @click="$router.push(`/bookdetails/${item.id}`)">
        <template #title>
          <div v-html="hightLight(item.name)"></div>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    async onLoad () {
      const { data } = await this.$axios.get('http://127.0.0.1:3333/bookselect', { params: { name: this.searchText } })
      // console.log(data)
      this.list.push(...data)
      this.loading = false
      this.finished = true
    },
    hightLight (text) {
      // console.log(text)
      const hightLightStr = `<span class="active">${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, hightLightStr)
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-result{
    ::v-deep .active {
      color: red;
    }
  }
</style>
