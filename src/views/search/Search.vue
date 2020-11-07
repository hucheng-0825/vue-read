<template>
  <div class="search-container">
    <div class="search-bar">
      <van-icon name="arrow-left" class="return" />
      <form action="/">
        <van-search
        v-model="value"
        clearable
        placeholder="请输入搜索关键词"
        @search="onSearch"
        />
      </form>
      <van-button>搜索</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchIndex',
  data () {
    return {
      value: ''
    }
  },
  methods: {
    onSearch (val) {

    }

  }
}
</script>

<style lang="scss" scoped>
  .search-container{
    .search-bar{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .return{
        width: 50px;

      }
    }
  }
</style>
