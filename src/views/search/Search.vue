<template>
  <div class="search-container">
    <div class="search-bar">
      <div class="return">
        <van-icon name="arrow-left" />
      </div>
      <van-search
        v-model="searchText"
        clearable
        placeholder="请输入搜索关键词"
        @search="onSearch"
        class="search-box"
        @focus="isSearchShow"
        @clear="isSearchResult=false"
      />
      <div class="search-text">搜索</div>
    </div>
    <van-divider />
    <!-- 搜索结果 -->
    <search-result v-if="isSearchResult" :searchText="searchText" />
    <!-- /搜索结果 -->
    <!-- 联想搜索 -->
    <search-suggested v-else-if="searchText" :searchText="searchText" />
    <!-- /联想搜索 -->
    <!-- 搜索历史 -->
    <search-history v-else-if="isHistory" :history="searchHistoryList" @remove="removeHistory" />
    <!-- /搜索历史 -->
    <!-- 大家都在搜 -->
    <div v-else>
      <van-cell title="大家都在搜" class="history-right">
        <template #default>
          <van-icon name="replay" class="delete-icon" />
          <span @click="getRecommendList()">换一批</span>
        </template>
      </van-cell>
      <van-tag
        type="primary"
        size="large"
        color="#c9c9c9"
        text-color="#000"
        v-for="item in recommendList"
        :key="item.id"
      >{{item.name}}</van-tag>
    </div>
    <!-- /大家都在搜 -->
  </div>
</template>

<script>
import SearchResult from '@/views/search/components/SearchResult.vue'
import SearchHistory from '@/views/search/components/SearchHistory.vue'
import SearchSuggested from '@/views/search/components/SearchSuggested.vue'
import { getItem, setItem, removeItem } from '@/public/localStorage.js'
export default {
  name: 'SearchIndex',
  data () {
    return {
      searchText: '',
      isSearchResult: false,
      isHistory: false,
      searchHistoryList: getItem('HISTORY') || [],
      // 推荐书籍列表
      recommendList: []
    }
  },
  created () {
    this.getRecommendList()
  },
  methods: {
    onSearch (val) {
      this.searchText = val
      const index = this.searchHistoryList.indexOf(val)
      if (index !== -1) {
        this.searchHistoryList.splice(index, 1)
      }
      this.searchHistoryList.unshift(val)
      this.isSearchResult = true
    },
    // 清空历史记录
    removeHistory () {
      removeItem('HISTORY')
      this.searchHistoryList = []
    },
    // 获取焦点时触发
    isSearchShow () {
      this.isSearchResult = false
      this.isHistory = true
    },
    async getRecommendList () {
      const data = await this.$axios.get('http://localhost:8080/getBooks')
      // console.log(data)
      this.recommendList = data.data.list
      console.log(this.recommendList)
    }
  },
  components: {
    SearchResult,
    SearchHistory,
    SearchSuggested
  },
  watch: {
    searchHistoryList (val) {
      setItem('HISTORY', val)
    },
    searchText () {
      if (this.searchText.trim().length === 0) {
        this.isHistory = true
      } else {
        this.isHistory = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search-container {
  .search-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    padding: 0 20px;
    .return {
      display: flex;
      align-items: center;
      .van-icon {
        font-size: 60px;
        color: #888;
      }
    }
    .search-box {
      flex: 1;
      height: 100%;
    }
    .search-text {
      font-size: 30px;
    }
    .van-search {
      padding: 10px 20px;
      box-sizing: border-box;
    }
    .van-search__content {
      border: 1px solid #ccc;
      background-color: #fff;
    }
  }
  .van-divider {
    margin: 0;
    // width: 1px;
    // color: #f2f2f2;
  }
  .history-right {
    .van-cell__value {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      border-bottom: none;
      .delete-icon {
        font-size: 30px;
      }
    }
    &:after {
      border: none;
    }
  }
  .van-tag--large {
    margin: 10px 20px;
  }
}
</style>
