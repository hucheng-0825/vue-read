<template>
  <div>
    <van-cell title="搜索历史">
    </van-cell>
    <van-cell :title="item" icon="clock-o" v-for="(item,index) in history" :key="index" @click="$emit('onsearch',item)"  />
    <div class="removehistory" @click="$emit('remove')" v-if="history.length">
      清楚历史记录
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    history: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .removehistory{
    text-align: center;
    color: red;
    font-size: 30px;
  }
</style>
